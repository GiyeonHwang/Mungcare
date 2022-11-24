package com.example.mungcare.repository;

import com.example.mungcare.entity.MyCalendar;
import org.springframework.data.jpa.repository.JpaRepository;

public interface MyCalendarRepository extends JpaRepository<MyCalendar, Integer> {
}
