package com.example.mungcare.service;

import com.example.mungcare.dto.AnimalDTO;
import com.example.mungcare.dto.MyCalendarDTO;
import com.example.mungcare.entity.Animal;
import com.example.mungcare.entity.MyCalendar;
import com.example.mungcare.repository.MyCalendarRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.log4j.Log4j2;
import org.springframework.stereotype.Service;

import java.sql.Date;
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@Service
@RequiredArgsConstructor
@Log4j2
public class MyCalendarServiceImpl implements MyCalendarService{
    private final MyCalendarRepository myCalendarRepository;

    @Override
    public Integer calendarInput1(MyCalendarDTO dto) { //산책 시작
        try {
            validate(dtoToEntity(dto));
            log.info("calendarInput-------------------");
            log.info(dto);
            MyCalendar calendar = dtoToEntity(dto);
            myCalendarRepository.save(calendar);
            return calendar.getCNo();
        } catch(Exception e) {
            log.info(e.getMessage());
            return null;
        }
    }

    @Override
    public boolean calendarInput2(MyCalendarDTO dto) { //산책 종료
        List<MyCalendar> entity = myCalendarRepository.findAll();

        for (MyCalendar myCalendar : entity) {
            System.out.println(myCalendar.getCEndTime());
            if(myCalendar.getCEndTime() == null && dto.getId().equals(myCalendar.getId().getId()) && dto.getCWalkDate().equals(myCalendar.getCWalkDate())) {
                MyCalendar calendar = myCalendar;
                calendar.changecPhoto(dto.getCPhoto());
                calendar.changeCEndTime(dto.getCEndTime());
                myCalendarRepository.save(calendar);
                return true;
            }
        }
        return false;
    }

    @Override
    public List<MyCalendarDTO> allCalendar(String id) { //전체 일정
        try {
            log.info("allCalendar-------------------");
            List<MyCalendar> entity = myCalendarRepository.findAll();
            List<MyCalendarDTO> cList = new ArrayList<>();

            for(MyCalendar calendar : entity) {
                if(id.equals(calendar.getId().getId())) {
                    MyCalendarDTO dto = entityToDTO(calendar);
                    cList.add(dto);
                }
            }
            return cList;
        } catch(Exception e) {
            log.info(e.getMessage());
            return null;
        }
    }

    @Override
    public List<MyCalendarDTO> dayCalendar(String id, Date cWalkDate) { //하루에 대한 일정
        try {
            log.info("dayCalendar-------------------");
            List<MyCalendar> entity = myCalendarRepository.findAll();
            List<MyCalendarDTO> cList = new ArrayList<>();

            for(MyCalendar calendar : entity) {
                if(id.equals(calendar.getId().getId()) && cWalkDate.equals(calendar.getCWalkDate())) {
                    MyCalendarDTO dto = entityToDTO(calendar);
                    cList.add(dto);
                }
            }
            return cList;
        } catch(Exception e) {
            log.info(e.getMessage());
            return null;
        }
    }

    private void validate(final MyCalendar calendar) {
        if(calendar == null) {
            log.warn("Entity cannot be null.");
            throw new RuntimeException("Entity cannot be null.");
        }
    }
}
