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
    private Integer bNo; //게시글 번호
    private String bContent; //게시글 내용
    private String bTitle; //게시글 제목
    private String bType; //게시글 카테고리
    private Integer bViewCount; //게시글 조회수
    private Integer bLike; //게시글 좋아요수
    private Integer bReply; //게시글 댓글 수
    private LocalDateTime bCreateTime; //게시글 작성 시간
    private String id; //게시글 작성자 닉네임
    private String bPhoto; //사진
}
