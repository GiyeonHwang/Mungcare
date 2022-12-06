package com.example.mungcare.model;

import lombok.*;

import java.util.List;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@ToString
public class Message {
    private String senderName; //보낸 사람
    private List<String> receiverName; //받는 사람
    private String message; //메시지 내용 - 공지사항
    private Double latitude; //모임 위치 - 위도
    private Double longitude; //모임 위치 - 경도
    private Status status; //메시지 상태
}