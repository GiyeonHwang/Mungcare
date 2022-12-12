package com.example.mungcare.controller;

import com.example.mungcare.dto.PharmacyDTO;
import com.example.mungcare.service.PharmacyService;
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
@RequestMapping("/pharmacy")
public class PharmacyController {
    private final PharmacyService pharmacyService;

    @PostMapping("/list") //약국 전체 목록 가져오기
    public List<PharmacyDTO> pharmacyInfo() {
        log.info("list...");
        List<PharmacyDTO> pList = pharmacyService.pharmacyList();
        return pList;
    }

    @PostMapping("/surrounding") //내 위치 기준(반경 2km) 주변 약국 가져오기
    public List<PharmacyDTO> pharmacyRadius(@RequestParam("latitude")Double latitude, @RequestParam("longitude")Double longitude) {
        log.info("surrounding...");
        List<PharmacyDTO> pList = pharmacyService.pharmacyRadius(latitude, longitude);
        System.out.println("result---------------------------"+pList);
        return pList;
    }
}
