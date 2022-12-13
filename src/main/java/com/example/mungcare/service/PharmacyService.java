package com.example.mungcare.service;

import com.example.mungcare.dto.PharmacyDTO;
import com.example.mungcare.entity.Pharmacy;

import java.util.List;

public interface PharmacyService {
    List<PharmacyDTO> pharmacyList(); //약국 전체 목록
    List<PharmacyDTO> pharmacyRadius(Double latitude, Double longitude); //내 위치에 가까운 약국 목록

    default PharmacyDTO entityToDTO(Pharmacy pharmacy) {
        PharmacyDTO dto = PharmacyDTO.builder()
                .no(pharmacy.getNo())
                .name(pharmacy.getName())
                .address(pharmacy.getAddress())
                .latitude(pharmacy.getLatitude())
                .longitude(pharmacy.getLongitude())
                .tell(pharmacy.getTell())
                .build();
        return dto;
    }
}
