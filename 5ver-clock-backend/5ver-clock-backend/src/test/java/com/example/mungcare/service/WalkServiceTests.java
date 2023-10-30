package com.example.mungcare.service;

import com.example.mungcare.dto.WalkDTO;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@SpringBootTest
public class WalkServiceTests {
    @Autowired
    private WalkService walkService;

    @Test
    public void testRegister() {
        WalkDTO dto = WalkDTO.builder()
                .id("user")
                .latitude(36.7987612)
                .longitude(127.0757714)
                .build();
        boolean result = walkService.register(dto);
        System.out.println("-------------------"+result);
    }

    @Test
    public void testCheck() {
        boolean result = walkService.walkCheck("Jj");
        System.out.println("-------------------"+result);
    }

    @Test
    @Transactional
    public void testList() {
        WalkDTO dto = WalkDTO.builder()
                .latitude(36.7987612)
                .longitude(127.0757714)
                .build();
        List<WalkDTO> result = walkService.walkRadius(dto);
        System.out.println("------------------------"+result);

    }
}
