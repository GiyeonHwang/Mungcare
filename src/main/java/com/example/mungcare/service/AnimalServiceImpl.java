package com.example.mungcare.service;

import com.example.mungcare.dto.AnimalDTO;
import com.example.mungcare.entity.Animal;
import com.example.mungcare.entity.Member;
import com.example.mungcare.repository.AnimalId;
import com.example.mungcare.repository.AnimalRepository;
import com.example.mungcare.repository.MemberRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.log4j.Log4j2;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@Service
@RequiredArgsConstructor //JPA 처리를 위한 의존성 주입
@Log4j2
public class AnimalServiceImpl implements AnimalService{
    private final AnimalRepository animalRepository;
    private final MemberRepository memberRepository;
    private final JdbcTemplate jdbcTemplate;

    @Override
    public String animalInput(AnimalDTO dto) { //반려동물 등록
        try{
            validate(dtoToEntity(dto));
            log.info("animalInput-------------------");
            log.info(dto);
            Animal animal = dtoToEntity(dto);
            animalRepository.save(animal);
            return animal.getAName();
        } catch(Exception e) {
            log.info(e.getMessage());
            return null;
        }
    }

    @Override
    public boolean checkAnimalName(String id, String aName) { //반려동물 이름 중복 체크
        AnimalId ld = new AnimalId(id, aName); //복합키
        Optional<Animal> result = animalRepository.findById(ld);
        //null일 경우, 이름이 중복되지 않기 때문에 true
        //null이 아닐 경우, 이름이 중복되기 때문에 false
        return result.isPresent() ? false : true;//isPresent(): null이 아닐 경우
    }

    @Override
    public List<AnimalDTO> animalList(String id) { //반려동물 목록
        try{
            log.info("animalList-------------------");
            List<Animal> entity = animalRepository.findAll();

            List<AnimalDTO> aList = new ArrayList<>();

            for (Animal animal : entity) {
                if(id.equals(animal.getId().getId())) {
                    AnimalDTO dto = entityToDTO(animal);
                    aList.add(dto);
                }
            }
            //만약 빈 리스트일 경우 []로 return
            return aList;
        } catch(Exception e) {
            log.info(e.getMessage());
            return null;
        }

    }

    @Override
    @Transactional //Lazy loading(지연 로딩)을 했기 때문
    public AnimalDTO animalInfo(String id, String aName) { //반려동물 정보 보기
        AnimalId ld = new AnimalId(id, aName); //복합키
        Optional<Animal> result = animalRepository.findById(ld);

        return result.isPresent() ? entityToDTO(result.get()) : null;//isPresent(): null이 아닐 경우
    }

    @Transactional
    @Override
    public boolean animalRemove(String id, String aName) { //반려동물 삭제
        try {
            Member member = memberRepository.findById(id).get();
            AnimalId ld = new AnimalId(id, aName); //복합키
            animalRepository.deleteById(ld);
            return true;
        } catch(Exception e) {
            log.info(e.getMessage());
            return false;
        }
    }

    @Override
    public boolean animalModify(String name, AnimalDTO dto) { //반려동물 정보 수정
        //기본키 값을 수정하기 위해 jdbcTemplate 사용
        //jpa는 기본키 값을 수정할 수 없다.
        try {
            String sql = "update mung.animal set a_name = ?, a_birth = ?, a_breed = ?, a_neut = ?, a_sex = ?"
                    + " where id= ? and a_name= ?";
            jdbcTemplate.update(sql, dto.getAName(), dto.getABirth(), dto.getABreed(), dto.isANeut(), dto.getASex(), dto.getId(), name);
            return true;
        } catch(Exception e) {
            log.info(e.getMessage());
            return false;
        }
    }

    private void validate(final Animal animal) {
        if(animal == null) {
            log.warn("Entity cannot be null.");
            throw new RuntimeException("Entity cannot be null.");
        }
    }
}
