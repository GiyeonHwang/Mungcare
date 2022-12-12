package com.example.mungcare.repository;

import com.example.mungcare.entity.Hotel;
import org.springframework.data.jpa.repository.JpaRepository;

public interface HotelRepository extends JpaRepository<Hotel, Integer> {
}
