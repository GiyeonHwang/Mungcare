package com.example.mungcare.service;

import com.example.mungcare.dto.LikeDTO;
import com.example.mungcare.entity.Board;
import com.example.mungcare.entity.Like;
import com.example.mungcare.entity.Member;

public interface LikeService {
    Integer addLike(String id, Integer bNo);

    default Like dtoToEntity(LikeDTO dto) {
        Member member = Member.builder().id(dto.getId()).build();
        Board board = Board.builder().bNo(dto.getBNo()).build();

        Like like = Like.builder()
                .id(member)
                .bNo(board)
                .cLike(dto.getCLike())
                .build();

        return like;
    }
}
