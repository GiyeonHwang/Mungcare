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
public class ReplyDTO {
    private Integer rNo; //게시판 번호

    private String rContent; //게시판 글

    private String id; //글 작성자

    private Integer bNo; //게시글 번호

    private LocalDateTime rCreateTime; //만든 시간
}
