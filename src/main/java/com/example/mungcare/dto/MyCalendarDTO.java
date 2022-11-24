package com.example.mungcare.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.sql.Date;
import java.sql.Time;

@Builder
@NoArgsConstructor
@AllArgsConstructor
@Data
public class MyCalendarDTO {
    private Integer cNo; //캘린더 번호
    private String id; //작성자
    private Time cStartTime; //시작시간
    private Time cEndTime; //끝나는 시간
    private Date cWalkDate; //날짜
    private Double cKm; //산책 거리
}
