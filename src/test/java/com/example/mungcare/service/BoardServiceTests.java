package com.example.mungcare.service;

import com.example.mungcare.dto.BoardDTO;
import com.example.mungcare.dto.PageRequestDTO;
import com.example.mungcare.dto.PageResultDTO;
import com.example.mungcare.entity.Board;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;

import javax.transaction.Transactional;
import java.util.Optional;

import static org.apache.catalina.security.SecurityUtil.remove;

@SpringBootTest
public class BoardServiceTests {
    @Autowired
    private BoardService boardService;

    @Test
    public void testRegister() {
        BoardDTO dto = BoardDTO.builder()
                .bContent("bContent"+3)
                .bTitle("bTItle"+3)
                .bType("bTItle"+3)
                .bViewCount(0)
                .bLike(0)
                .bReply(0)
                .id("Jj")
                .build();

        Integer bno = boardService.boardInput(dto);
        System.out.println(bno);
    }

    @Test
    public void testList() {
        PageRequestDTO pageRequestDTO = PageRequestDTO.builder().page(1).size(10).build();

        PageResultDTO<BoardDTO, Board> resultDTO = boardService.boardList(pageRequestDTO);

        System.out.println("PREV: "+resultDTO.isPrev());
        System.out.println("NEXT: "+resultDTO.isNext());
        System.out.println("TOTAL: "+resultDTO.getTotalPage());

        System.out.println("==============================");
        for(BoardDTO boardDTO : resultDTO.getDtoList()) {
            System.out.println(boardDTO);
        }

        System.out.println("==============================");
        resultDTO.getPageList().forEach(i -> System.out.println(i));

        System.out.println("---------"+resultDTO);
    }

    @Test
    public void testSearch() {
        PageRequestDTO pageRequestDTO = PageRequestDTO.builder()
                .page(1)
                .size(10)
                .type("t")
                .keyword("2")
                .build();

        PageResultDTO<BoardDTO, Board> resultDTO = boardService.boardCategoryList(pageRequestDTO);

        System.out.println("PREV: "+resultDTO.isPrev());
        System.out.println("NEXT: "+resultDTO.isNext());
        System.out.println("TOTAL: "+resultDTO.getTotalPage());

        System.out.println("==============================");
        for(BoardDTO boardDTO : resultDTO.getDtoList()) {
            System.out.println(boardDTO);
        }

        System.out.println("==============================");
        resultDTO.getPageList().forEach(i -> System.out.println(i));

        System.out.println("---------"+resultDTO);


    }

    @Test
    public void testModify() {
        BoardDTO dto = BoardDTO.builder()
                .bNo(3)
                .bTitle("제목 변경1")
                .bContent("내용 변경1")
                .build();

        boardService.modify(dto);
        System.out.println("=============================="+dto);
    }

    @Test
    public void testDetail() {
        Integer bNo = 13;
        BoardDTO board = boardService.read(13);
        System.out.println("---------------------------------------------"+board);
    }

    @Test
    public void testRemove() {
        Integer bNo = 1;
        boardService.remove(bNo);
    }

}