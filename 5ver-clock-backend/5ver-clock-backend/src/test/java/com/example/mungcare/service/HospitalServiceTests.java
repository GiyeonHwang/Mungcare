package com.example.mungcare.service;

import com.example.mungcare.dto.HospitalDTO;
import com.example.mungcare.dto.WalkDTO;
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
        System.out.println("=======result: "+result);
        System.out.println("==========================================================result: "+result.get(1));
    }

    @Test
    public void testRadius() {
        List<HospitalDTO> result = hospitalService.hospitalRadius(36.7987612, 127.0757714);
        System.out.println("------------------------"+result);

    }
}
