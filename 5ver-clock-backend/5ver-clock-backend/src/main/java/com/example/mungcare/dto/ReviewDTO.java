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
public class ReviewDTO {
    private Integer vNo; //리뷰 번호
    private String id; //아이디
    private String vContent; //리뷰 내용
    private Double latitude; //위도
    private Double longitude; //경도
    private String address; //주소
    private Double star; //별점
    private String vPhoto; //리뷰 사진
    private Date vDate; //날짜
}