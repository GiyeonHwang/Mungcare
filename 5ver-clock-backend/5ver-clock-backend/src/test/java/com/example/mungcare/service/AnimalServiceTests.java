package com.example.mungcare.service;

import com.example.mungcare.dto.AnimalDTO;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;

@SpringBootTest
public class AnimalServiceTests {
    @Autowired
    private AnimalService animalService;

    @Test
    public void testRegister() {
        AnimalDTO dto = AnimalDTO.builder()
                .id("C")
                .aName("안나")
                .aSex("여자")
                .aBirth("2019-01-25")
                .aBreed("비숑")
                .aNeut(true)
                .build();
        String a = animalService.animalInput(dto);
        System.out.println(a);
    }

//    @Test
//    public void testModify() {
//        AnimalDTO dto = AnimalDTO.builder()
//                .aBreed("푸들")
//                .build();
//        animalService.animalModify(dto);
//    }
}
