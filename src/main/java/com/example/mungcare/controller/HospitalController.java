package com.example.mungcare.controller;

import com.example.mungcare.dto.HospitalDTO;
import com.example.mungcare.service.HospitalService;
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
@RequestMapping("/hospital")
public class HospitalController {
    private final HospitalService hospitalService;

    @PostMapping("/list") //병원 전체 목록 가져오기
    public List<HospitalDTO> hospitalInfo() {
        log.info("list...");
        List<HospitalDTO> hList = hospitalService.hospitalList();
        return hList;
    }

    @PostMapping("/surrounding") //내 위치 기준(반경 2km) 주변 병원 가져오기
    public List<HospitalDTO> hospitalRadius(@RequestParam("latitude")Double latitude, @RequestParam("longitude")Double longitude) {
        log.info("surrounding...");
        List<HospitalDTO> hList = hospitalService.hospitalRadius(latitude, longitude);
        System.out.println("result---------------------------"+hList);
        return hList;
    }
}
