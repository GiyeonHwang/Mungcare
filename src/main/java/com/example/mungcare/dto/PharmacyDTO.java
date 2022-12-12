package com.example.mungcare.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Builder
@NoArgsConstructor
@AllArgsConstructor
@Data
public class PharmacyDTO {
    private Integer pNo; //약국 정보 번호
    private String pName; //약국 이름
    private String address; //약국 주소
    private Double latitude; //위도
    private Double longitude; //경도
    private String tell; //전화번호
}
