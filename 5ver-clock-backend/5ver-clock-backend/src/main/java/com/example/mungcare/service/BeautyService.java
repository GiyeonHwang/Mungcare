package com.example.mungcare.service;

import com.example.mungcare.dto.BeautyDTO;
import com.example.mungcare.entity.Beauty;

import java.util.List;

public interface BeautyService {
    List<BeautyDTO> beautyList(); //미용실 전체 목록
    List<BeautyDTO> beautyRadius(Double latitude, Double longitude); //내 위치에 가까운 미용실 목록

    default BeautyDTO entityToDTO(Beauty beauty) {
        BeautyDTO dto = BeautyDTO.builder()
                .no(beauty.getNo())
                .name(beauty.getName())
                .address(beauty.getAddress())
                .latitude(beauty.getLatitude())
                .longitude(beauty.getLongitude())
                .tell(beauty.getTell())
                .build();
        return dto;
    }
}
