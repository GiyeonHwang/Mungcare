package com.example.mungcare.repository;

import com.example.mungcare.dto.ReplyDTO;
import com.example.mungcare.entity.Board;
import com.example.mungcare.entity.Member;
import com.example.mungcare.entity.Reply;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;

import javax.transaction.Transactional;
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;
import java.util.stream.IntStream;

@SpringBootTest
public class ReplyRepositoryTests {
    @Autowired
    private ReplyRepository replyRepository;
    @Autowired
    private BoardRepository boardRepository;

    @Test
    public void insertReply1() {
        Board board = Board.builder().bNo(2).build();
        Member member = Member.builder().id("user").build();

        Reply reply = Reply.builder()
                .rContent("Reply...")
                .bNo(board)
                .id(member)
                .build();
        updateReply(2);
        replyRepository.save(reply);
    }

    @Test
    public void updateReply(Integer bNo) { //조회수
        Board board = boardRepository.findById(bNo).get();
        board.updateReplyCount(board.getBReply());
        boardRepository.save(board);
    }

    @Test
    @Transactional
    public void readReply1() {
//        Optional<Reply> result = replyRepository.findById(1);
//        Reply reply = result.get();
//        System.out.println(reply);
//        System.out.println(reply.getBNo());

        List<Reply> entity = replyRepository.findAll();

        List<ReplyDTO> rList = new ArrayList<>();

        for (Reply reply : entity) {
            System.out.println("-------------------------------------------reply.getBNo(): "+reply.getBNo().getBNo());
            System.out.println("-------------------------------------------equals: "+reply.getBNo().getBNo().equals(3));
            if(reply.getBNo().getBNo().equals(3)){
                Member member = Member.builder().id("user3").build();
                Board board = Board.builder().bNo(3).build();
                ReplyDTO dto = ReplyDTO.builder()
                        .rNo(reply.getRNo())
                        .rContent(reply.getRContent())
                        .rCreateTime(reply.getRCreateTime())
                        .id(member.getId())
                        .bNo(board.getBNo())
                        .build();
                rList.add(dto);
            }
        }
        System.out.println("----------------"+rList);
    }

    @Test
    public void insertReply() {
        Board board = Board.builder().bNo(3).build();
        Member member = Member.builder().id("Jj").build();

        Reply reply = Reply.builder()
                .rContent("Reply...")
                .bNo(board)
                .id(member)
                .build();

        replyRepository.save(reply);
    }

    @Test
    public void readReply() {
        Optional<Reply> result = replyRepository.findById(1);
        Reply reply = result.get();
        System.out.println(reply);
        System.out.println(reply.getBNo());
    }
}
