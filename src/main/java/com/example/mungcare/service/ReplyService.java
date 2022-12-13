package com.example.mungcare.service;

import com.example.mungcare.dto.ReplyDTO;
import com.example.mungcare.entity.Board;
import com.example.mungcare.entity.Member;
import com.example.mungcare.entity.Reply;

import java.util.List;

public interface ReplyService {
    Integer register(ReplyDTO replyDTO); //댓글 작성
    List<ReplyDTO> getList(Integer bNo); //특정 게시물의 댓글 목록
    boolean modifyAction(ReplyDTO replyDTO); //댓글 수정
    boolean remove(Integer rNo, Integer bNo); //댓글 삭제

    //ReplyDTO를 Reply 객체로 변환 Board 객체의 처리가 수반됨.
    default Reply dtoToEntity(ReplyDTO replyDTO) {
        Board board = Board.builder().bNo(replyDTO.getBNo()).build();
        Member member = Member.builder().id(replyDTO.getId()).build();

        Reply reply = Reply.builder()
                .rNo(replyDTO.getRNo())
                .rContent(replyDTO.getRContent())
                .id(member)
                .bNo(board)
                .build();
        return reply;
    }

    //Reply 객체를 ReplyDTO로 변환 Board 객체가 필요하지 않으므로 게시물 번호만
    default ReplyDTO entityToDTO(Reply reply) {
        Member member = reply.getId();
        Board board = reply.getBNo();
        ReplyDTO dto = ReplyDTO.builder()
                .rNo(reply.getRNo())
                .rContent(reply.getRContent())
                .id(member.getId())
                .bNo(board.getBNo())
                .rCreateTime(reply.getRCreateTime())
                .nickname(member.getNickname())
                .build();
        return dto;
    }
}
