package com.example.mungcare.service;

import com.example.mungcare.dto.HospitalDTO;
import com.example.mungcare.entity.Hospital;
import com.example.mungcare.repository.HospitalRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.log4j.Log4j2;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

@Service
@RequiredArgsConstructor
@Log4j2
public class HospitalServiceImpl implements HospitalService{
    private final HospitalRepository hospitalRepository;
    
    @Override
    public List<HospitalDTO> hospitalList() { //병원 전체 목록
        try{
            log.info("hospitalList-------------------");
            List<Hospital> entity = hospitalRepository.findAll();
            List<HospitalDTO> hList = new ArrayList<>();

            for(Hospital hospital : entity) {
                HospitalDTO dto = entityToDTO(hospital);
                hList.add(dto);
            }
            return hList;
        } catch(Exception e) {
            log.info(e.getMessage());
            return null;
        }
    }
}
