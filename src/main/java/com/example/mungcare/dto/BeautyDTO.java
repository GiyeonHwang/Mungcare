package com.example.mungcare.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Builder
@NoArgsConstructor
@AllArgsConstructor
@Data
public class BeautyDTO {
    private Integer bNo; //미용실 정보 번호
    private String bName; //미용실 이름
    private String address; //미용실 주소
    private Double latitude; //위도
    private Double longitude; //경도
    private String tell; //전화번호
}
