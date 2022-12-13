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
    private Date cDate; //날짜
    private String cPhoto; //사진
    private String cType; //산책인지 놀기인지 체크하기
    private Integer cWalkTime; //총 산책 시간
    private String memo; //메모
}
