package com.example.mungcare.repository;

import com.example.mungcare.entity.Welfare;
import org.springframework.data.jpa.repository.JpaRepository;

public interface WelfareRepository extends JpaRepository<Welfare, Integer> {
}
