package com.example.mungcare.controller;


import com.example.mungcare.model.Message;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.messaging.handler.annotation.Payload;
import org.springframework.messaging.handler.annotation.SendTo;
import org.springframework.messaging.simp.SimpMessagingTemplate;
import org.springframework.stereotype.Controller;

@Controller
public class WebSocketController {

    @Autowired
    private SimpMessagingTemplate simpMessagingTemplate; // 이게 특정 유저한테 받을 때 사용하는 객체인거 같다.

    @MessageMapping("/message") // /app/message
    @SendTo("/chatroom/public") // SendTo 형태이면 모두에게 뿌리는거 같다. * 실 사용은 이걸로 할것.
    private Message receivePublicMessage(@Payload Message message){
        System.out.println("-----------------------"+message);
        return message;
    } // 페이로드를 Class Message 형태로 받아온다. 그걸 다시 리턴

    @MessageMapping("/private-message")
    public Message receivePrivateMessage(@Payload Message message){

        simpMessagingTemplate.convertAndSendToUser(message.getReceiverName(),"/private",message); // /user/David/private
        System.out.println(message.toString());
        return message;
    }
}