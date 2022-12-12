package com.example.mungcare.service;

import com.example.mungcare.dto.WelfareDTO;
import com.example.mungcare.entity.Welfare;

import java.util.List;

public interface WelfareService {
    List<WelfareDTO> welfareList(); //장묘업 전체 목록
    List<WelfareDTO> welfareRadius(Double latitude, Double longitude); //내 위치에 가까운 장묘업 목록

    default WelfareDTO entityToDTO(Welfare welfare) {
        WelfareDTO dto = WelfareDTO.builder()
                .wNo(welfare.getWNo())
                .wName(welfare.getWName())
                .address(welfare.getAddress())
                .latitude(welfare.getLatitude())
                .longitude(welfare.getLongitude())
                .tell(welfare.getTell())
                .build();
        return dto;
    }
}
