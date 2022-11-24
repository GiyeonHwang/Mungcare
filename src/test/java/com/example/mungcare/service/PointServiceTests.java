package com.example.mungcare.service;

import com.example.mungcare.dto.AnimalDTO;
import com.example.mungcare.dto.PointDTO;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;

import java.text.SimpleDateFormat;
import java.util.Date;
import java.util.List;

@SpringBootTest
public class PointServiceTests {
    @Autowired
    private PointService pointService;

    @Test
    public void testRegister() {
        SimpleDateFormat format = new SimpleDateFormat("yyyy-MM-dd"); //날짜 형식 yyyy-MM-dd
        Date now = new Date();
        String now_dt = format.format(now); //오늘 날짜

        PointDTO dto = PointDTO.builder()
                .id("user")
//                .pointDate(java.sql.Date.valueOf(now_dt))
                .pointDate(java.sql.Date.valueOf("2022-11-15"))
                .walkPoint(20)
                .playPoint(15)
                .build();
        Integer point = pointService.pointInput(dto);
        System.out.println(point);
    }

    @Test
    public void testRank() {
        List<PointDTO> result = pointService.rankList();
        System.out.println("==========================================================result: "+result);
    }

    @Test
    public void testMypoint() {
        List<PointDTO> result = pointService.myPoint("user");
        System.out.println("==========================================================result: "+result);
    }
}
