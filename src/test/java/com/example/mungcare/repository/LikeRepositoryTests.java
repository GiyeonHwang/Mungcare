package com.example.mungcare.repository;

import com.example.mungcare.entity.Board;
import com.example.mungcare.entity.Like;
import com.example.mungcare.entity.Member;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.transaction.annotation.Transactional;

import java.util.Optional;

@SpringBootTest
public class LikeRepositoryTests {
    @Autowired
    private LikeRepository likeRepository;
    @Autowired
    private BoardRepository boardRepository;
    @Autowired
    private MemberRepository memberRepository;

    @Test
    public void testLikeCheck() {
        Member member = memberRepository.findById("user3").get();
        Board board = boardRepository.findById(3).get();
        LikeId ld = new LikeId("user3", 3);
        Optional<Like> result = likeRepository.findById(ld);
        if(result.isPresent()) { //null이 아니면
            Like like = result.get();
            boolean addOrDel = like.isCLike(); //좋아요 했는지, 안했는지
            System.out.println("--------------------------check: "+addOrDel);
            boolean re = like.likeAddDel(addOrDel); //좋아요 여부에 따라 삭제 또는 좋아요

            //likeRepository.save(like);
        }
        else { //null일때
            Like like = new Like(member, board, true);
            likeRepository.save(like);
            board.updateLikeCount(3);
            boardRepository.save(board);
            System.out.println("***********************************");
        }
        System.out.println("============================");
        //System.out.println("============================"+likeRepository.findById(ld));
    }

//    private boolean checkLike(String id, Integer bNo) {
//        return likeRepository.findByBoardBNoAndMemberId(id, bNo).isPresent();
//    }
}
