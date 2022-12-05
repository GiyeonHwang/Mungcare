package com.example.mungcare.model;

import lombok.*;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@ToString
public class Message {
    private String senderName; //보낸 사람
    private String receiverName; //받는 사람
    private String message; //메시지 내용 - 공지사항
    private Status status; //메시지 상태
}