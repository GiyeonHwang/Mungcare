package com.example.mungcare.controller;

import com.example.mungcare.dto.AnimalDTO;
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

    @PostMapping("/register") //캘린더 등록
    public Integer calendarRegister(MyCalendarDTO calendarDTO) {
        log.info("register...");
        Integer cNo = calendarService.calendarInput(calendarDTO);
        System.out.println("cNo-----------"+cNo);
        return cNo;
    }

    @PostMapping("/allList") //회원에 대한 전체 산책 현황
    public List<MyCalendarDTO> calendarAll(@RequestParam("id")String id) {
        log.info("calendarAll");
        List<MyCalendarDTO> cList = calendarService.allCalendar(id);
        return cList;
    }

    @PostMapping("/dayList") //회원에 대한 전체 산책 현황
    public List<MyCalendarDTO> calendarDay(@RequestParam("id")String id, @RequestParam("cWalkDate") Date cWalkDate) {
        log.info("calendarDay");
        List<MyCalendarDTO> cList = calendarService.dayCalendar(id, cWalkDate);
        return cList;
    }
}
