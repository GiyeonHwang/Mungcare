package com.example.mungcare.service;

import com.example.mungcare.dto.MyCalendarDTO;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;

import java.util.List;

@SpringBootTest
public class MyCalendarServiceTests {
    @Autowired
    private MyCalendarService myCalendarService;

    @Test
    public void testRegister() {
        MyCalendarDTO dto = MyCalendarDTO.builder()
                .id("user4")
                .cStartTime(java.sql.Time.valueOf("10:25:31"))
                .cDate(java.sql.Date.valueOf("2022-11-24"))
                .build();
        Integer cNo = myCalendarService.calendarInput1(dto);
        System.out.println("-------------------"+cNo);
    }

    @Test
    public void testCheck() {
        MyCalendarDTO dto = MyCalendarDTO.builder()
                .id("user5")
                .cStartTime(java.sql.Time.valueOf("10:25:31"))
                .cDate(java.sql.Date.valueOf("2022-11-24"))
                .build();
        boolean cNo = myCalendarService.calendarCheck(dto);
        System.out.println("-------------------"+cNo);
    }

    @Test
    public void testRegister2() {
        MyCalendarDTO dto = MyCalendarDTO.builder()
                .cNo(7)
                .id("user4")
                .cEndTime(java.sql.Time.valueOf("10:50:46"))
                .cDate(java.sql.Date.valueOf("2022-11-24"))
                .cPhoto("hihi")
                .build();
        boolean cNo = myCalendarService.calendarInput2(dto);
        System.out.println("-------------------"+cNo);
    }

    @Test
    public void testallCalendar() {
        List<MyCalendarDTO> result = myCalendarService.allCalendar("user");
        System.out.println("==========================================================result: "+result);
    }

    @Test
    public void testdayCalendar() {
        List<MyCalendarDTO> result = myCalendarService.dayCalendar("user", java.sql.Date.valueOf("2022-11-23"));
        System.out.println("==========================================================result: "+result);
    }
}
