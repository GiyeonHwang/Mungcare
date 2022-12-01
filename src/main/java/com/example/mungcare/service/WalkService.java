package com.example.mungcare.service;

import com.example.mungcare.dto.WalkDTO;
import com.example.mungcare.entity.Member;
import com.example.mungcare.entity.Walk;

import java.util.List;

public interface WalkService {
    boolean register(WalkDTO dto); //같이 산책하기 등록, 위치 계속 업데이트
    boolean walkCheck(WalkDTO dto); //같이 산책 중인지 체크
    List<WalkDTO> walkRadius(WalkDTO dto); //내 위치 반경 1km 안에 있는 사람 목록
//    boolean walkNotice(WalkDTO dto)
 
    default Walk dtoToEntity(WalkDTO dto) {
        Member member = Member.builder().id(dto.getId()).build();

        Walk walk = Walk.builder()
                .id(member)
                .latitude(dto.getLatitude())
                .longitude(dto.getLongitude())
                .wTime(dto.getWTime())
                .build();
        return walk;
    }

    default WalkDTO entityToDTO(Walk walk) {
        Member member = walk.getId();
        WalkDTO dto = WalkDTO.builder()
                .id(member.getId())
                .latitude(walk.getLatitude())
                .longitude(walk.getLongitude())
                .wTime(walk.getWTime())
                .animalList(walk.getId().getAnimalList())
                .build();
        return dto;
    }
}
