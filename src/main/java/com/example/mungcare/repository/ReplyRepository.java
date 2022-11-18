package com.example.mungcare.repository;

import com.example.mungcare.entity.Reply;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.querydsl.QuerydslPredicateExecutor;

import java.util.List;

public interface ReplyRepository extends JpaRepository<Reply, Integer>, QuerydslPredicateExecutor<Reply> {
    //Board 삭제시 댓글들 삭제
//    @Modifying
//    @Query("delete from Reply r where r.bNo.bNo =:bno")
//    void deleteByBno(Integer bNo);
    //게시물로 댓글 목록 가져오기
//    List<Reply> getRepliesByBoardOrderByRno(Board bNo);
}
