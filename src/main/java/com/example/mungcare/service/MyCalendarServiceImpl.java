package com.example.mungcare.service;

import com.example.mungcare.dto.MyCalendarDTO;
import com.example.mungcare.dto.PointDTO;
import com.example.mungcare.entity.MyCalendar;
import com.example.mungcare.repository.MyCalendarRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.log4j.Log4j2;
import org.springframework.stereotype.Service;

import java.sql.Date;
import java.util.ArrayList;
import java.util.List;

@Service
@RequiredArgsConstructor
@Log4j2
public class MyCalendarServiceImpl implements MyCalendarService{
    private final MyCalendarRepository myCalendarRepository;
//    private final PointService pointService;

    @Override
    public Integer calendarInput1(MyCalendarDTO dto) { //산책 시작 or 놀기 인증 완료
        try {
            validate(dtoToEntity(dto));
            log.info("calendarInput-------------------");
            log.info(dto);
            MyCalendar calendar = dtoToEntity(dto);

//            if(calendar.getCType().equals("play")) {
//                PointDTO pointDTO = new PointDTO(dto.getId(), dto.getCDate(), 0, 5);
//                pointService.pointInput(pointDTO);
//            }

            myCalendarRepository.save(calendar);
            return calendar.getCNo();
        } catch(Exception e) {
            log.info(e.getMessage());
            return null;
        }
    }

    @Override
    public boolean calendarCheck(MyCalendarDTO dto) { //산책 중인지 체크
        List<MyCalendar> entity = myCalendarRepository.findAll();
        for (MyCalendar myCalendar : entity) {
            //산책 시작되어있다. //앱을 중간에 나갔다 다시 들어올 때,
            if(myCalendar.getCEndTime() == null && myCalendar.getCType().equals("walk")
                    && dto.getId().equals(myCalendar.getId().getId()) && dto.getCDate().equals(myCalendar.getCDate())) {
                return false;
            }
        }
        return true; //처음 산책 시작하면 바로 DB 저장
    }

    @Override
    public boolean calendarInput2(MyCalendarDTO dto) { //산책 종료
        List<MyCalendar> entity = myCalendarRepository.findAll();

        for (MyCalendar myCalendar : entity) {
            if(myCalendar.getCEndTime() == null && myCalendar.getCType().equals("walk")
                    && dto.getId().equals(myCalendar.getId().getId()) && dto.getCDate().equals(myCalendar.getCDate())) {
                MyCalendar calendar = myCalendar;
                calendar.changecPhoto(dto.getCPhoto());
                calendar.changeCEndTime(dto.getCEndTime());
                myCalendarRepository.save(calendar);

//                PointDTO pointDTO = new PointDTO(dto.getId(), dto.getCDate(), 0, 5);
//                pointService.pointInput(pointDTO);
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
                if(id.equals(calendar.getId().getId()) && cWalkDate.equals(calendar.getCDate())) {
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
