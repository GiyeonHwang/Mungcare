package com.example.mungcare.service;

import com.example.mungcare.dto.MyCalendarDTO;
import com.example.mungcare.entity.MyCalendar;
import com.example.mungcare.entity.Member;

import java.sql.Date;
import java.util.List;

public interface MyCalendarService {
    Integer calendarInput1(MyCalendarDTO dto); //산책 시작 or 놀기 인증 완료
    boolean calendarInput2(MyCalendarDTO dto); //산책 종료
    List<MyCalendarDTO> allCalendar(String id); //회원에 대한 전체 일정
    List<MyCalendarDTO> dayCalendar(String id, Date cWalkDate); //회원과 날짜에 대한 일정
    boolean calendarCheck(MyCalendarDTO dto); //산책 중인지 체크

    default MyCalendar dtoToEntity(MyCalendarDTO dto) {
        Member member = Member.builder().id(dto.getId()).build();

        MyCalendar calendar = MyCalendar.builder()
                .cNo(dto.getCNo())
                .cStartTime(dto.getCStartTime())
                .cEndTime(dto.getCEndTime())
                .cDate(dto.getCDate())
                .cType(dto.getCType())
                .cPhoto(dto.getCPhoto())
                .cWalkTime(dto.getCWalkTime())
                .memo(dto.getMemo())
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
                .cDate(calendar.getCDate())
                .cType(calendar.getCType())
                .cPhoto(calendar.getCPhoto())
                .cWalkTime(calendar.getCWalkTime())
                .memo(calendar.getMemo())
                .id(member.getId())
                .build();
        return dto;
    }

}
