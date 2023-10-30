package com.example.mungcare.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.stereotype.Service;

import java.util.ArrayList;

@Service
public class MailService {

    @Autowired
    private JavaMailSender javaMailSender;

    public void sendMail(String email, String pw, String name){

        //수신 대상을 담을 ArrayList 생성
        ArrayList<String> toUserList = new ArrayList<>();

        //수신 대상 추가
        toUserList.add(email);

        // 수신 대상 개수
        int toUserSize = toUserList.size();

        // SimpleMailMessage (단순 텍스트 구성 메일 메시지 생성할 때 이용)
        SimpleMailMessage simpleMailMessage = new SimpleMailMessage();

        //수신자 설정
        simpleMailMessage.setTo((String[]) toUserList.toArray(new String[toUserSize]));

        //메일 제목
        simpleMailMessage.setSubject(name + "님 mungcare 임시 비밀번호 발급입니다.");

        //메일 내용
        simpleMailMessage.setText("귀하의 비밀번호는 : "+ pw + "입니다.");

        //메일 발송
        javaMailSender.send(simpleMailMessage);

    }
}
