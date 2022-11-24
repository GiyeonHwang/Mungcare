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
                .id("user")
                .cStartTime(java.sql.Time.valueOf("10:25:31"))
                .cEndTime(java.sql.Time.valueOf("10:50:46"))
                .cKm(2.1)
                .cWalkDate(java.sql.Date.valueOf("2022-11-24"))
                .build();
        Integer cNo = myCalendarService.calendarInput(dto);
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
