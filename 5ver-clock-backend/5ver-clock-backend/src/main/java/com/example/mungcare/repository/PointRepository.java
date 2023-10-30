package com.example.mungcare.repository;

import com.example.mungcare.entity.Point;
import org.springframework.data.jpa.repository.JpaRepository;

public interface PointRepository extends JpaRepository<Point, PointId> {
}
