package com.example.mungcare.service;

import com.example.mungcare.dto.BoardDTO;
import com.example.mungcare.dto.PageRequestDTO;
import com.example.mungcare.dto.PageResultDTO;
import com.example.mungcare.entity.Board;
import com.example.mungcare.entity.Member;
import com.querydsl.core.BooleanBuilder;
import org.springframework.data.domain.Page;

import java.util.List;

public interface BoardService {
    Integer boardInput(BoardDTO dto); //글 추가

    //PageResultDTO<BoardDTO, Object[]> boardList(PageRequestDTO pageRequestDTO); //글 목록(페이징 처리O)
    PageResultDTO<BoardDTO, Board> boardList(PageRequestDTO pageRequestDTO); //글 목록(페이징 처리O)
    PageResultDTO<BoardDTO, Board> boardCategoryList(PageRequestDTO pageRequestDTO); //글 카테고리 목록(페이징 처리O)
    //List<BoardDTO> boardList();
    Board read(Integer bNo); //글 상세 보기
    boolean remove(Integer bNo); //글 삭제하기
    Integer modify(BoardDTO dto); //글 수정하기
    void updateView(Integer bNo); //조회수


    //서비스 계층에서는 파라미터를 DTO 타입으로 받기 때문에 이를 JPA로 처리하기 위해서 엔티티 타입의 객체로 변환
    default Board dtoToEntity(BoardDTO dto) {
        Member member = Member.builder().id(dto.getId()).build();

        Board board = Board.builder()
                .bNo(dto.getBNo())
                .bContent(dto.getBContent())
                .bTitle(dto.getBTitle())
                .bType(dto.getBType())
                .bViewCount(dto.getBViewCount())
                .bLike(dto.getBLike())
                .bReply(dto.getBReply())
                .bCreateTime(dto.getBCreateTime())
                .id(member)
                .build();

        return board;
    }

    //엔티티 객체를 DTO 객체로 변환하는 entityToDto()
    default BoardDTO entityToDTO(Board board) {
        Member member = board.getId();
        BoardDTO dto = BoardDTO.builder()
                .bNo(board.getBNo())
                .bContent(board.getBContent())
                .bTitle(board.getBTitle())
                .bType(board.getBType())
                .bViewCount(board.getBViewCount())
                .bLike(board.getBLike())
                .bReply(board.getBReply())
                .bCreateTime(board.getBCreateTime())
                .id(member.getId())
                .build();
        return dto;
    }
}