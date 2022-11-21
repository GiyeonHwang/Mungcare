package com.example.mungcare.repository;

import com.example.mungcare.entity.Board;
//import com.example.mungcare.repository.search.SearchBoardRepository;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.querydsl.QuerydslPredicateExecutor;
import org.springframework.data.repository.query.Param;

public interface BoardRepository extends JpaRepository<Board, Integer>, QuerydslPredicateExecutor<Board>{
    //한개의 로우(Object) 내에 Object[]로 나옴
    @Query("select b, w from Board b left join b.id w where b.bNo =:bNo")
    Object getBoardWithWriter(@Param("bNo") Integer bNo);

//    @Query("SELECT b, w, count(r)"+
//    "FROM Board b LEFT JOIN b.id w" +
//    "WHERE b.bNo = :bNo")
//    Page<Object[]> getBoardWithReplyCount(@Param("bNo") Integer bNo);
}
