package com.example.mungcare.controller;

import com.example.mungcare.dto.AnimalDTO;
import com.example.mungcare.service.AnimalService;
import lombok.RequiredArgsConstructor;
import lombok.extern.log4j.Log4j2;
import org.springframework.web.bind.annotation.*;

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

    @PostMapping("/check") //반려동물 이름 중복 체크
    public boolean animalCheck(@RequestParam("id")String id, @RequestParam("aName")String aName) {
        log.info("check...");
        boolean result = animalService.checkAnimalName(id, aName);
        System.out.println("check---- "+result);
        return result;
    }

    @PostMapping("/list") //반려동물 목록
    public List<AnimalDTO> animalList1(@RequestParam("id")String id) {
        log.info("animalList");
        List<AnimalDTO> anList = animalService.animalList(id);
        for (AnimalDTO animal : anList) {
            System.out.println("======================================"+animal.getAName());
        }
        return anList;
    }

    @PostMapping("/detailView") //반려동물 상세보기
    public AnimalDTO animalDetail(@RequestParam("id")String id, @RequestParam("aName")String aName) {
        log.info("detailView...");
        AnimalDTO detail = animalService.animalInfo(id, aName);
        return detail;
    }

    @PostMapping("/remove") //글 삭제하기
    public boolean animalRemove(@RequestParam("id")String id, @RequestParam("aName")String aName) {
        log.info("remove...");
        boolean result = animalService.animalRemove(id, aName);
        return result;
    }

    @PostMapping("/modify") //글 수정하기
    public boolean animalModify(@RequestParam("name")String name, AnimalDTO dto) {
        log.info("modify...");
        log.info("dto: "+dto);

        boolean result = animalService.animalModify(name, dto);

        return result;
    }
}
