package com.example.mungcare.service;

import com.example.mungcare.dto.LikeDTO;
import com.example.mungcare.entity.Board;
import com.example.mungcare.entity.Like;
import com.example.mungcare.entity.Member;

public interface LikeService {
    boolean addLike(String id, Integer bNo); //좋아요 등록/삭제
    boolean check(String id, Integer bNo); //좋아요 했는지 체크

    default Like dtoToEntity(LikeDTO dto) {
        Member member = Member.builder().id(dto.getId()).build();
        Board board = Board.builder().bNo(dto.getBNo()).build();

        Like like = Like.builder()
                .id(member)
                .bNo(board)
                .cLike(dto.isCLike())
                .build();

        return like;
    }
}
