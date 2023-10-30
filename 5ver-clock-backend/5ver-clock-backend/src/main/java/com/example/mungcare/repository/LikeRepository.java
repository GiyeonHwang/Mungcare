package com.example.mungcare.repository;

import com.example.mungcare.entity.Like;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.querydsl.QuerydslPredicateExecutor;

import java.util.Optional;

public interface LikeRepository extends JpaRepository<Like, LikeId> {
//    Optional<Like> findByBoardBNoAndMemberId(String id, Integer bNo);
//    void saveBoardBNoAndMemberId(String id, Integer bNo);
}
