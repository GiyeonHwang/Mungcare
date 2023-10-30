package com.example.mungcare.config;

import org.springframework.context.annotation.Configuration;
import org.springframework.messaging.simp.config.MessageBrokerRegistry;
import org.springframework.web.socket.config.annotation.EnableWebSocketMessageBroker;
import org.springframework.web.socket.config.annotation.StompEndpointRegistry;
import org.springframework.web.socket.config.annotation.WebSocketMessageBrokerConfigurer;


@Configuration
@EnableWebSocketMessageBroker
public class SocketConfig implements WebSocketMessageBrokerConfigurer {
    @Override
    public void configureMessageBroker(MessageBrokerRegistry registry){ // 메시지 브로커가 메시지를 받을 때 인식하는 메서드
        registry.setApplicationDestinationPrefixes("/app"); // 처음 경로를 잡아준다 //app
        registry.enableSimpleBroker("/chatroom","/user"); // 전체에게서 받아오는지 특정유저에게서 받아오는지 정해준다.
        registry.setUserDestinationPrefix("/user"); // 유저에게서 받아오면 /user 경로를 인식해준다.
    }
    @Override
    public void registerStompEndpoints(StompEndpointRegistry registry){ //Stomp가 받아오는걸 인식하는 메서드
        registry.addEndpoint("/ws").setAllowedOriginPatterns("*").withSockJS(); // 마지막 경로가 /ws인 곳에서 받아온다 모든주소로 부터 SockJS를
        System.out.println("-----------------------------------------------ws----------------------------------------------------");
    }
}