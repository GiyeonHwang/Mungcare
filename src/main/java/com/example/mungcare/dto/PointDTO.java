package com.example.mungcare.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.sql.Date;

@Builder
@NoArgsConstructor
@AllArgsConstructor
@Data
public class PointDTO {
    private String id; //회원 아이디
    private Date pointDate; //포인트 쌓인 요일
    private Integer walkPoint; //산책 포인트
    private Integer playPoint; //놀기 포인트
    private Integer totalPoint; //해당 날짜의 총 포인트
}
