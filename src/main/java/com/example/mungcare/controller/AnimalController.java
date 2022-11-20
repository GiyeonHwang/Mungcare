package com.example.mungcare.controller;

import com.example.mungcare.dto.AnimalDTO;
import com.example.mungcare.entity.Animal;
import com.example.mungcare.service.AnimalService;
import lombok.RequiredArgsConstructor;
import lombok.extern.log4j.Log4j2;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@Log4j2
@RequiredArgsConstructor
@RequestMapping("/animal")
public class AnimalController {
    private final AnimalService animalService;

    @PostMapping("/write") //반려동물 등록
    public String animalRgister(AnimalDTO animalDTO) {
        log.info("write...");
        String aName = animalService.animalInput(animalDTO);
        System.out.println("aName-----------"+aName);
        return aName;
    }

    @GetMapping("/list") //반려동물 목록
    public List<AnimalDTO> animalList() {
        log.info("animalList");
        List<AnimalDTO> anList = animalService.animalList();
        for (AnimalDTO animal : anList) {
            System.out.println("======================================"+animal.getAName());
        }
        return anList;
    }

    @GetMapping("/detailView") //반려동물 상세보기
    public Animal animalDetail(String id, String aName) {
        log.info("detailView...");
        Animal detail = animalService.animalInfo(id, aName);
        return detail;
    }

    @PostMapping("/remove") //글 삭제하기
    public String animalRemove(String id, String aName) {
        log.info("remove...");
        String result = animalService.animalRemove(id, aName);
        return result;
    }

    @PostMapping("/modify") //글 수정하기
    public String animalModify(AnimalDTO dto) {
        log.info("modify...");
        log.info("dto: "+dto);

        String result = animalService.animalModify(dto);

        return result;
    }
}
