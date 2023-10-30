package com.example.mungcare.controller;

import com.example.mungcare.dto.MyCalendarDTO;
import com.example.mungcare.service.MyCalendarService;
import lombok.RequiredArgsConstructor;
import lombok.extern.log4j.Log4j2;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import java.sql.Date;
import java.util.List;

@RestController
@Log4j2
@RequiredArgsConstructor
@RequestMapping("/calendar")
public class MyCalendarController {
    private final MyCalendarService calendarService;

    @PostMapping("/start") //산책 시작 or 놀기 인증
    public Integer calendarStart(MyCalendarDTO calendarDTO) {
        log.info("start...");
        System.out.println("-----------------------DTO: "+calendarDTO);
        Integer cNo = calendarService.calendarInput1(calendarDTO);
        System.out.println("cNo-----------"+cNo);
        return cNo;
    }

    @PostMapping("/check") //산책 중인지 체크
    public boolean calendarCheck(MyCalendarDTO calendarDTO) {
        log.info("check...");
        boolean check = calendarService.calendarCheck(calendarDTO);
        System.out.println("check-----------"+check);
        return check;
    }

    @PostMapping("/end") //산책 종료
    public boolean calendarEnd(MyCalendarDTO calendarDTO) {
        log.info("end...");
        boolean result = calendarService.calendarInput2(calendarDTO);
        System.out.println("cNo-----------"+result);
        return result;
    }

    @PostMapping("/allList") //회원에 대한 전체 산책 및 놀기 현황
    public List<MyCalendarDTO> calendarAll(@RequestParam("id")String id) {
        log.info("calendarAll");
        List<MyCalendarDTO> cList = calendarService.allCalendar(id);
        return cList;
    }

    @PostMapping("/dayList") //회원과 날짜에 대한 산책 및 놀기 현황
    public List<MyCalendarDTO> calendarDay(@RequestParam("id")String id, @RequestParam("cWalkDate") Date cWalkDate) {
        log.info("calendarDay");
        List<MyCalendarDTO> cList = calendarService.dayCalendar(id, cWalkDate);
        return cList;
    }
}
