package com.example.mungcare.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;

@Builder
@NoArgsConstructor
@AllArgsConstructor
@Data
public class BoardDTO {
    //DTO 구성 기준: 화면에 전달하는 데이터 or 화면 쪽에서 전달되는 데이터
    private Integer bNo;
    private String bContent;
    private String bTitle;
    private String bType;
    private Integer bViewCount;
    private Integer bLike;
    private Integer bReply;
    private LocalDateTime bCreateTime;
    private String id;
}
