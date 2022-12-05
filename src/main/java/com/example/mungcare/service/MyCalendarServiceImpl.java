package com.example.mungcare.service;

import com.example.mungcare.dto.MyCalendarDTO;
import com.example.mungcare.dto.PointDTO;
import com.example.mungcare.entity.MyCalendar;
import com.example.mungcare.repository.MyCalendarRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.log4j.Log4j2;
import org.springframework.stereotype.Service;

import java.sql.Date;
import java.time.Duration;
import java.time.LocalTime;
import java.util.ArrayList;
import java.util.List;

@Service
@RequiredArgsConstructor
@Log4j2
public class MyCalendarServiceImpl implements MyCalendarService{
    private final MyCalendarRepository myCalendarRepository;
    private final PointService pointService;

    @Override
    public Integer calendarInput1(MyCalendarDTO dto) { //산책 시작 or 놀기 인증 완료
        try {
            validate(dtoToEntity(dto));
            log.info("calendarInput-------------------");
            log.info(dto);
            MyCalendar calendar = dtoToEntity(dto);

            if(calendar.getCType().equals("play")) { //놀기일 경우, 포인트 등록
                calendar.changeCPhoto(dto.getCPhoto());
                PointDTO pointDTO = PointDTO.builder()
                        .id(dto.getId())
                        .pointDate(dto.getCDate())
                        .walkPoint(0)
                        .playPoint(5)
                        .build();
                pointService.pointInput(pointDTO);
            }

            myCalendarRepository.save(calendar);
            return calendar.getCNo();
        } catch(Exception e) {
            log.info(e.getMessage());
            return null;
        }
    }

    @Override
    public boolean calendarCheck(MyCalendarDTO dto) { //산책 중인지 체크
        try {
            List<MyCalendar> entity = myCalendarRepository.findAll();
            for (MyCalendar myCalendar : entity) {
                //산책 시작되어있다. //앱을 중간에 나갔다 다시 들어올 때,
                if(myCalendar.getCEndTime() == null && myCalendar.getCType().equals("walk")
                        && dto.getId().equals(myCalendar.getId().getId()) && dto.getCDate().equals(myCalendar.getCDate())) {
                    return false;
                }
            }
            return true; //처음 산책 시작하면 바로 DB 저장
        } catch(Exception e) {
            log.info(e.getMessage());
            return false;
        }

    }

    @Override
    public boolean calendarInput2(MyCalendarDTO dto) { //산책 종료
        try {
            List<MyCalendar> entity = myCalendarRepository.findAll();
            System.out.println(dto);
            for (MyCalendar myCalendar : entity) {
                if(myCalendar.getCEndTime() == null && myCalendar.getCType().equals("walk")
                        && dto.getId().equals(myCalendar.getId().getId()) && dto.getCDate().equals(myCalendar.getCDate())) {
                    myCalendar.changeCPhoto(dto.getCPhoto());
                    myCalendar.changeCEndTime(dto.getCEndTime());
                    System.out.println("myCalendar: "+myCalendar);


                    //시간 차이 계산
                    Duration duration = Duration.between(myCalendar.getCStartTime().toLocalTime(), myCalendar.getCEndTime().toLocalTime());
                    Long walkTime = duration.getSeconds()/60; //초로 받아 분으로 출력하기

                    myCalendar.changeCWalktTime(walkTime.intValue());
                    myCalendarRepository.save(myCalendar);

                    //시간에 따른 포인트 계산
                    Integer walkPointResult = walkPointResult(walkTime);
                    System.out.println("walkPointResult: " + walkPointResult);

                    //산책 시간에 따른 포인트 등록
                    PointDTO pointDTO = PointDTO.builder()
                            .id(dto.getId())
                            .pointDate(dto.getCDate())
                            .walkPoint(walkPointResult)
                            .playPoint(0)
                            .build();
                    pointService.pointInput(pointDTO);
                    return true;
                }
            }
            return false;
        } catch(Exception e) {
            log.info(e.getMessage());
            return false;
        }
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

    private Integer walkPointResult(Long walkTime) { //산책 시간에 따른 포인트 부여
        System.out.println("walkTime: "+walkTime);

        if(walkTime <= 0) //0분 이하
            return 0;
        else if(walkTime <= 10) //1분 이상 10분 이하
            return 10;
        else if(walkTime <= 20) //11분 이상 20분 이하
            return 20;
        else if(walkTime <= 29) //21분 이상 29분 이하
            return 30;
        else //30분 이상: 30point + 20point
            return 50;
    }
}
