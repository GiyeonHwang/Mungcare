package com.example.mungcare.controller;

import com.example.mungcare.dto.PointDTO;
import com.example.mungcare.service.PointService;
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
@RequestMapping("/point")
public class PointController {
    private final PointService pointService;

    @PostMapping("/register") //포인트 등록
    public Integer pointRgister(PointDTO pointDTO) {
        log.info("register...");
        Integer totalPoint = pointService.pointInput(pointDTO);
        System.out.println("totalPoint-----------"+totalPoint);
        return totalPoint;
    }

    @PostMapping("/ranking") //하루 전날의 포인트 랭킹
    public List<PointDTO> pointRank() {
        log.info("pointRank...");
        List<PointDTO> rankResult = pointService.rankList();
        System.out.println("rankResult-----------"+rankResult);
        return rankResult;
    }
    @PostMapping("/weekPoint") //나의 일주일 포인트 내역
    public List<PointDTO> myPoint(@RequestParam("id") String id) {
        log.info("myPoint...");
        List<PointDTO> myPointRes = pointService.myPoint(id);
        System.out.println("myPointResult-----------"+myPointRes);
        return myPointRes;
    }

    @PostMapping("/totalPoint") //나의 총 누적 포인트 점수
    public Integer totalMyPoint(@RequestParam("id") String id) {
        log.info("totalPoint...");
        Integer myTotal = pointService.totalMyPoint(id);
        System.out.println("myTotal----"+myTotal);
        return myTotal;
    }
}
