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
public class AnimalDTO {
    private String id; //회원 아이디
    private String aName; //반려견 이름
    private String aSex; //성별
    private Date aBirth; //생일
    private String aBreed; //종류
    private boolean aNeut; //중성화 여부
}
