package com.example.mungcare.controller;

import com.example.mungcare.dto.HotelDTO;
import com.example.mungcare.service.HotelService;
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
@RequestMapping("/hotel")
public class HotelController {
    private final HotelService hotelService;

    @PostMapping("/list") //미용실 전체 목록 가져오기
    public List<HotelDTO> hotelInfo() {
        log.info("list...");
        List<HotelDTO> hList = hotelService.hotelList();
        return hList;
    }

    @PostMapping("/surrounding") //내 위치 기준(반경 2km) 주변 미용실 가져오기
    public List<HotelDTO> hotelRadius(@RequestParam("latitude")Double latitude, @RequestParam("longitude")Double longitude) {
        log.info("surrounding...");
        List<HotelDTO> hList = hotelService.hotelRadius(latitude, longitude);
        System.out.println("result---------------------------"+hList);
        return hList;
    }
}
