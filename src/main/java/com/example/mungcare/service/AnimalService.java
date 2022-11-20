package com.example.mungcare.service;

import com.example.mungcare.dto.AnimalDTO;
import com.example.mungcare.entity.Animal;
import com.example.mungcare.entity.Like;
import com.example.mungcare.entity.Member;

import java.util.List;

public interface AnimalService {
    String animalInput(AnimalDTO dto); //반려견 등록
    List<AnimalDTO> animalList(); //반려동물 목록
    Animal animalInfo(String id, String aName); //반려동물 정보 보기
    String animalModify(AnimalDTO dto); //반려동물 정보 수정
    String animalRemove(String id, String aName); //반려동물 정보 삭제

    default Animal dtoToEntity(AnimalDTO dto) {
        Member member = Member.builder().id(dto.getId()).build();

        Animal animal = Animal.builder()
                .id(member)
                .aName(dto.getAName())
                .aSex(dto.getASex())
                .aBirth(dto.getABirth())
                .aBreed(dto.getABreed())
                .aNeut(dto.isANeut())
                .build();

        return animal;
    }

    default AnimalDTO entityToDTO(Animal animal) {
        Member member = animal.getId();
        AnimalDTO dto = AnimalDTO.builder()
                .id(member.getId())
                .aName(animal.getAName())
                .aSex(animal.getASex())
                .aBirth(animal.getABirth())
                .aBreed(animal.getABreed())
                .aNeut(animal.isANeut())
                .build();
        return dto;
    }
}
