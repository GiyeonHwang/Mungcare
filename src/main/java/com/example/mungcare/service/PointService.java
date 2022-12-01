package com.example.mungcare.service;

import com.example.mungcare.dto.PointDTO;
import com.example.mungcare.entity.Animal;
import com.example.mungcare.entity.Member;
import com.example.mungcare.entity.Point;
import com.example.mungcare.repository.AnimalId;

import java.util.List;

public interface PointService {
    Integer pointInput(PointDTO dto); //포인트 등록

    List<PointDTO> rankList(); //포인트 랭킹

    List<PointDTO> myPoint(String id); //나의 일주일 포인트 내역

    default Point dtoToEntity(PointDTO dto) {
        Member member = Member.builder().id(dto.getId()).build();

        Point point = Point.builder()
                .id(member)
                .pointDate(dto.getPointDate())
                .walkPoint(dto.getWalkPoint())
                .playPoint(dto.getPlayPoint())
                .totalPoint(dto.getTotalPoint())
                .build();
        return point;
    }

    default PointDTO entityToDTO(Point point) {
        Member member = point.getId();
        PointDTO dto = PointDTO.builder()
                .id(member.getId())
                .pointDate(point.getPointDate())
                .walkPoint(point.getWalkPoint())
                .playPoint(point.getPlayPoint())
                .totalPoint(point.getTotalPoint())
                .animalList(point.getId().getAnimalList())
                .build();
        return dto;
    }

}
