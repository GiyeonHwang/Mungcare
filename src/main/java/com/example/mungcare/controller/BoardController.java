package com.example.mungcare.controller;

import com.example.mungcare.dto.BoardDTO;
import com.example.mungcare.dto.PageRequestDTO;
import com.example.mungcare.dto.PageResultDTO;
import com.example.mungcare.entity.Board;
import com.example.mungcare.service.BoardService;
import lombok.RequiredArgsConstructor;
import lombok.extern.log4j.Log4j2;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@Log4j2
@RequiredArgsConstructor
@RequestMapping("/board")
public class BoardController {
    private final BoardService boardService;

    @PostMapping("/write") //글 작성
    public Integer register(BoardDTO boardDTO) {
        log.info("write...");
        Integer bNo = boardService.boardInput(boardDTO);
        System.out.println("id-----------"+bNo);
        return bNo;
    }

    @PostMapping("/list") //글 목록
    public PageResultDTO<BoardDTO, Board> bList(PageRequestDTO pageRequestDTO) {
        log.info("list..."+pageRequestDTO);
//        List<BoardDTO> boardList = boardService.boardList();
//        for (BoardDTO board1 : boardList) {
//            System.out.println("======================================"+board1.getBTitle());
//            System.out.println("======================================"+board1.getBNo());
//        }
        PageResultDTO<BoardDTO, Board> result = boardService.boardList(pageRequestDTO);
        System.out.println("-----------"+result);
        return result;
    }

//    @PostMapping("/detailView") //글 상세보기
//    public BoardDTO detail(Integer bNo) {
//        log.info("detailView...");
//        BoardDTO detail = boardService.read(bNo);
//        return detail;
//    }

    @PostMapping("/remove") //글 삭제하기
    public String remove(Integer bNo) {
        log.info("remove...");
        String result = boardService.remove(bNo);
        return result;
    }

    @PostMapping("/modify") //글 수정하기
    public Integer modify(BoardDTO dto) {
        log.info("modify...");
        log.info("dto: "+dto);

        Integer result = boardService.modify(dto);

        return result;
    }
}