package com.example.mungcare.dto;

import com.example.mungcare.entity.Animal;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.sql.Time;
import java.util.List;

@Builder
@NoArgsConstructor
@AllArgsConstructor
@Data
public class WalkDTO {
    private String id; //사용자
    private Double latitude; //사용자 위도
    private Double longitude; //사용자 경도
    private Time wTime; //공지사항 - 모일 날짜
    private List<Animal> animalList; //사용자의 반려동물 정보 목록
}
