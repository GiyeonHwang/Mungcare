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
                .id("user")
                .aName("코코")
                .aSex("남자")
                .aBirth(java.sql.Date.valueOf("2020-09-03"))
                .aBreed("요크셔테리어")
                .aNeut(true)
                .build();
        String a = animalService.animalInput(dto);
        System.out.println(a);
    }

    @Test
    public void testModify() {
        AnimalDTO dto = AnimalDTO.builder()
                .aBreed("푸들")
                .build();
        animalService.animalModify(dto);
    }
}
