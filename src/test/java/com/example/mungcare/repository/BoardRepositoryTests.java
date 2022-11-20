package com.example.mungcare.repository;

import com.example.mungcare.dto.BoardDTO;
import com.example.mungcare.entity.Board;
import com.example.mungcare.entity.Member;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.transaction.annotation.Transactional;

import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;
import java.util.Optional;

@SpringBootTest
public class BoardRepositoryTests {
    @Autowired
    private BoardRepository boardRepository;

    @Test
    public void insertBoard() {
        Member member = Member.builder().id("user4").build();

        Board board = Board.builder()
                .bContent("bContent"+5)
                .bTitle("bTItle"+5)
                .bType("bTItle"+5)
                .bViewCount(0)
                .bLike(0)
                .bReply(0)
                .id(member)
                .build();
        boardRepository.save(board);

    }

    @Test
    public void boardList() {
        List<Board> board = boardRepository.findAll();
        List<BoardDTO> boardDtoList = new ArrayList<>();

        for (Board boardEntity : board) {
            BoardDTO boardDTO = BoardDTO.builder()
                    .bNo(boardEntity.getBNo())
                    .bContent(boardEntity.getBContent())
                    .bTitle(boardEntity.getBTitle())
                    .bType(boardEntity.getBType())
                    .bViewCount(boardEntity.getBViewCount())
                    .bLike(boardEntity.getBLike())
                    .bReply(boardEntity.getBReply())
                    .bCreateTime(boardEntity.getBCreateTime())
//                    .id(boardEntity.getId())
                    .build();

            boardDtoList.add(boardDTO);
        }
        for (BoardDTO board1 : boardDtoList) {
            System.out.println("======================================"+board1.getBTitle());
            System.out.println("======================================"+board1.getBNo());
        }
    }

    @Test
    @Transactional
    public void read() {
        updateView(3);
        //엔티티 객체를 가져왔다면, entityToDto()를 이용해 엔티티 객체를 DTO를 변환해서 반환
        Optional<Board> result = boardRepository.findById(3);
        Board board = result.isPresent() ? result.get() : null;//isPresent(): null이 아닐 경우
        System.out.println("ssssssssssssssssssssssssssssssssssssssssssssssss");
        System.out.println(board);
    }

    @Test
    public void updateView(Integer bNo) {
        Board board = boardRepository.findById(bNo).get();
        board.updateViewCount(board.getBViewCount());
        boardRepository.save(board);
    }


    @Test
    public void testReadWithWriter() {
        Object result = boardRepository.getBoardWithWriter(3);
        Object[] arr = (Object[]) result;
        System.out.println("----------------------");
        System.out.println(Arrays.toString(arr));
        //[Board(bNo=3, bContent=bContent1, bTitle=bTItle1, bType=bTItle1, bViewCount=0, bLike=0, bReply=0, bCreateTime=2022-11-16T11:45:55.699205, id=Member(id=Jj, pw=12, name=Jj, nickname=Aa, phone=Aa, address=Aa, detail_Address=Sa, location_Num=Ss)), Member(id=Jj, pw=12, name=Jj, nickname=Aa, phone=Aa, address=Aa, detail_Address=Sa, location_Num=Ss)]
    }

    @Test
    public void testRemove() {
        try{
            boardRepository.deleteById(0);
            System.out.println("*******성공*******");
        } catch(Exception e) {
            System.out.println(e.getMessage());
        }
    }

    @Test
    @Transactional
    public void testModify() {
        System.out.println("=======================================testModify==========================================");
        Optional<Board> result = boardRepository.findById(3);
        if(result.isPresent()) {
            Board board = result.get();
            board.changeTitle("changeTitle");
            board.changeContent("changeContent");

            boardRepository.save(board);
            System.out.println("***board: "+board);
        }
    }
}
