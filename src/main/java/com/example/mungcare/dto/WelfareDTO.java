package com.example.mungcare.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Builder
@NoArgsConstructor
@AllArgsConstructor
@Data
public class WelfareDTO {
    private Integer no; //장묘업 정보 번호
    private String name; //장묘업 이름
    private String address; //장묘업 주소
    private Double latitude; //위도
    private Double longitude; //경도
    private String tell; //전화번호
}
