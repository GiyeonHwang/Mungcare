package com.example.mungcare.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Builder
@NoArgsConstructor
@AllArgsConstructor
@Data
public class HospitalDTO {
    private Integer no; //병원 정보 번호
    private String name; //병원 이름
    private String address; //병원 주소
    private Double latitude; //위도
    private Double longitude; //경도
    private String tell; //전화번호
}
