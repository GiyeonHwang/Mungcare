package com.example.mungcare.service;

import com.example.mungcare.dto.HospitalDTO;
import com.example.mungcare.entity.Hospital;

import java.util.List;

public interface HospitalService {
    List<HospitalDTO> hospitalList(); //병원 전체 목록
    List<HospitalDTO> hospitalRadius(Double latitude, Double longitude); //내 위치에 가까운 병원 목록

    default HospitalDTO entityToDTO(Hospital hospital) {
        HospitalDTO dto = HospitalDTO.builder()
                .hNo(hospital.getHNo())
                .hName(hospital.getHName())
                .address(hospital.getAddress())
                .latitude(hospital.getLatitude())
                .longitude(hospital.getLongitude())
                .build();
        return dto;
    }
}
