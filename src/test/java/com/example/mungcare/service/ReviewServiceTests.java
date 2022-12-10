package com.example.mungcare.service;

import com.example.mungcare.dto.ReviewDTO;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;

@SpringBootTest
public class ReviewServiceTests {
    @Autowired
    private ReviewService reviewService;

    @Test
    public void testRegister() {
        ReviewDTO dto = ReviewDTO.builder()
                .id("user")
                .vContent("산책하기 너무 좋아요")
                .latitude(36.12345)
                .longitude(127.12345)
                .star(3)
                .vPhoto("h")
                .vDate(java.sql.Date.valueOf("2022-12-10"))
                .build();
        Integer result = reviewService.register(dto);
        System.out.println("---------------------------------"+result);
    }
}
