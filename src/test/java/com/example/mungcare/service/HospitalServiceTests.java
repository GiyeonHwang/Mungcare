package com.example.mungcare.service;

import com.example.mungcare.dto.HospitalDTO;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;

import java.util.List;

@SpringBootTest
public class HospitalServiceTests {
    @Autowired
    private HospitalService hospitalService;

    @Test
    public void testList() {
        List<HospitalDTO> result = hospitalService.hospitalList();
        System.out.println("==========================================================result: "+result);
    }
}
