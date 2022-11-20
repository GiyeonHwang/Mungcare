package com.example.mungcare.repository;

import com.example.mungcare.dto.AnimalDTO;
import com.example.mungcare.entity.Animal;
import com.example.mungcare.entity.Board;
import com.example.mungcare.entity.Member;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.transaction.annotation.Transactional;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@SpringBootTest
public class AnimalRepositoryTests {
    @Autowired
    private AnimalRepository animalRepository;

    @Test
    public void insertAnimal() {
        Member member = Member.builder().id("user3").build();
        System.out.println(member);
        Animal animal = Animal.builder()
                .id(member)
                .aName("코코")
                .aSex("남자")
                .aBirth(java.sql.Date.valueOf("2020-09-03"))
                .aBreed("요크셔테리어")
                .aNeut(true)
                .build();
        animalRepository.save(animal);
    }

    @Test
    public void animalList() {
        List<Animal> animal = animalRepository.findAll();
        List<AnimalDTO> animalList = new ArrayList<>();

        for(Animal animalEntity : animal) {
            Member member = animalEntity.getId();
            AnimalDTO animalDTO = AnimalDTO.builder()
                    .id(member.getId())
                    .aName(animalEntity.getAName())
                    .aSex(animalEntity.getASex())
                    .aBirth(animalEntity.getABirth())
                    .aBreed(animalEntity.getABreed())
                    .aNeut(animalEntity.isANeut())
                    .build();
            animalList.add(animalDTO);
        }
        for(AnimalDTO animal1 : animalList) {
            System.out.println("======================================"+animal1);
        }
    }

    @Test
    @Transactional
    public void read() {
        AnimalId ld = new AnimalId("user", "코코"); //복합키
        Optional<Animal> result = animalRepository.findById(ld);

        Animal animal = result.isPresent() ? result.get() : null;//isPresent(): null이 아닐 경우
        System.out.println("-------------------------------------------"+animal);
    }

    @Test
    @Transactional
    public void testModify() {
        System.out.println("=======================================testModify==========================================");
        AnimalId ld = new AnimalId("user3", "코코");
        Optional<Animal> result = animalRepository.findById(ld);
        if(result.isPresent()) {
            Animal animal = result.get();
            animal.setABreed("푸틀");

            animalRepository.save(animal);
            System.out.println("***animal: "+animal);
        }
    }

    @Test
    public void testRemove() {
        try{
            AnimalId ld = new AnimalId("user3", "코코"); //복합키
            animalRepository.deleteById(ld);
            System.out.println("*******성공*******");
        } catch(Exception e) {
            System.out.println(e.getMessage());
        }
    }
}
