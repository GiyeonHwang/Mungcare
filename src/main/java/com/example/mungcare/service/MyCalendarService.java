package com.example.mungcare.service;

import com.example.mungcare.dto.MyCalendarDTO;
import com.example.mungcare.entity.MyCalendar;
import com.example.mungcare.entity.Member;

import java.sql.Date;
import java.util.List;

public interface MyCalendarService {
    Integer calendarInput(MyCalendarDTO dto); //캘린더 일정 추가
    List<MyCalendarDTO> allCalendar(String id); //회원에 대한 전체 일정
    List<MyCalendarDTO> dayCalendar(String id, Date cWalkDate); //회원과 날짜에 대한 일정

    default MyCalendar dtoToEntity(MyCalendarDTO dto) {
        Member member = Member.builder().id(dto.getId()).build();

        MyCalendar calendar = MyCalendar.builder()
                .cNo(dto.getCNo())
                .cStartTime(dto.getCStartTime())
                .cEndTime(dto.getCEndTime())
                .cKm(dto.getCKm())
                .cWalkDate(dto.getCWalkDate())
                .id(member)
                .build();
        return calendar;
    }

    default MyCalendarDTO entityToDTO(MyCalendar calendar) {
        Member member = calendar.getId();
        MyCalendarDTO dto = MyCalendarDTO.builder()
                .cNo(calendar.getCNo())
                .cStartTime(calendar.getCStartTime())
                .cEndTime(calendar.getCEndTime())
                .cKm(calendar.getCKm())
                .cWalkDate(calendar.getCWalkDate())
                .id(member.getId())
                .build();
        return dto;
    }

}
