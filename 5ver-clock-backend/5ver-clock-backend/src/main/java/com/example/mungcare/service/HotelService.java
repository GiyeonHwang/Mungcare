package com.example.mungcare.service;

import com.example.mungcare.dto.HotelDTO;
import com.example.mungcare.entity.Hotel;

import java.util.List;

public interface HotelService {
    List<HotelDTO> hotelList(); //위탁관리업 전체 목록
    List<HotelDTO> hotelRadius(Double latitude, Double longitude); //내 위치에 가까운 위탁관리업 목록

    default HotelDTO entityToDTO(Hotel hotel) {
        HotelDTO dto = HotelDTO.builder()
                .no(hotel.getNo())
                .name(hotel.getName())
                .address(hotel.getAddress())
                .latitude(hotel.getLatitude())
                .longitude(hotel.getLongitude())
                .tell(hotel.getTell())
                .build();
        return dto;
    }
}
