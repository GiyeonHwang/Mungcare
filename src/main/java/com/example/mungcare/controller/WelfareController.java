package com.example.mungcare.controller;

import com.example.mungcare.dto.WelfareDTO;
import com.example.mungcare.service.WelfareService;
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
@RequestMapping("/welfare")
public class WelfareController {
    private final WelfareService welfareService;

    @PostMapping("/list") //장묘업 전체 목록 가져오기
    public List<WelfareDTO> welfareInfo() {
        log.info("list...");
        List<WelfareDTO> wList = welfareService.welfareList();
        return wList;
    }

    @PostMapping("/surrounding") //내 위치 기준(반경 2km) 주변 장묘업 가져오기
    public List<WelfareDTO> welfareRadius(@RequestParam("latitude")Double latitude, @RequestParam("longitude")Double longitude) {
        log.info("surrounding...");
        List<WelfareDTO> wList = welfareService.welfareRadius(latitude, longitude);
        System.out.println("result---------------------------"+wList);
        return wList;
    }
}
