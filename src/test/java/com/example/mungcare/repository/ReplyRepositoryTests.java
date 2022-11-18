package com.example.mungcare.repository;

import com.example.mungcare.entity.Board;
import com.example.mungcare.entity.Member;
import com.example.mungcare.entity.Reply;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;

import java.util.Optional;
import java.util.stream.IntStream;

@SpringBootTest
public class ReplyRepositoryTests {
    @Autowired
    private ReplyRepository replyRepository;

    @Test
    public void insertReply() {
        Board board = Board.builder().bNo(3).build();
        Member member = Member.builder().id("user3").build();

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
