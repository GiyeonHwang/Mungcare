package com.example.mungcare.controller;

import com.example.mungcare.dto.ReviewDTO;
import com.example.mungcare.service.ReviewService;
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
@RequestMapping("/review")
public class ReviewController {
    private final ReviewService reviewService; //자동 주입을 위한 final

    @PostMapping("/register") //산책 장소 리뷰 작성
    public Integer reviewRegister(ReviewDTO reviewDTO) {
        log.info("write...");
        Integer vNo = reviewService.register(reviewDTO);
        System.out.println("vNo--------------"+vNo);
        return vNo;
    }

    @PostMapping("/surrounding") //내 위치 기준(반경 3km) 주변 리뷰 목록 가져오기
    public List<ReviewDTO> reviewRadius(@RequestParam("latitude")Double latitude, @RequestParam("longitude")Double longitude) {
        log.info("surrounding...");
        List<ReviewDTO> vList = reviewService.reviewRadius(latitude, longitude);
        System.out.println("result---------------------------"+vList);
        return vList;
    }

    @PostMapping("/modify") //리뷰 수정
    public boolean reviewModify(ReviewDTO reviewDTO) {
        log.info("modify...");
        boolean result = reviewService.modify(reviewDTO);
        return result;
    }

    @PostMapping("/remove") //리뷰 삭제
    public boolean reviewRemove(@RequestParam("vNo")Integer vNo) {
        log.info("remove...");
        boolean result = reviewService.remove(vNo);
        return result;
    }

}
