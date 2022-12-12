package com.example.mungcare.controller;

import com.example.mungcare.dto.BeautyDTO;
import com.example.mungcare.service.BeautyService;
import lombok.RequiredArgsConstructor;
import lombok.extern.log4j.Log4j2;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@Log4j2
@RequiredArgsConstructor
@RequestMapping("/beauty")
public class BeautyController {
    private final BeautyService beautyService;

    @PostMapping("/list") //미용실 전체 목록 가져오기
    public List<BeautyDTO> beautyInfo() {
        log.info("list...");
        List<BeautyDTO> bList = beautyService.beautyList();
        return bList;
    }

    @PostMapping("/surrounding") //내 위치 기준(반경 2km) 주변 미용실 가져오기
    public List<BeautyDTO> beautyRadius(@RequestParam("latitude")Double latitude, @RequestParam("longitude")Double longitude) {
        log.info("surrounding...");
        List<BeautyDTO> bList = beautyService.beautyRadius(latitude, longitude);
        System.out.println("result---------------------------"+bList);
        return bList;
    }
}
