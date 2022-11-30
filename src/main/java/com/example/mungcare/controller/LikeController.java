package com.example.mungcare.controller;

import com.example.mungcare.dto.BoardDTO;
import com.example.mungcare.dto.MemberDTO;
import com.example.mungcare.entity.Member;
import com.example.mungcare.service.LikeService;
import lombok.RequiredArgsConstructor;
import lombok.extern.log4j.Log4j2;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

@RestController
@Log4j2
@RequiredArgsConstructor
@RequestMapping("/like")
public class LikeController {
    private final LikeService likeService;

    @PostMapping("/likeAction") //좋아요 기능
    public boolean like(@RequestParam("id")String id, @RequestParam("bNo")Integer bNo) {
        log.info("like...");
        log.info("boardDTO: "+id);
        log.info("memberDTO: "+bNo);
        boolean result = likeService.addLike(id, bNo);
        System.out.println("------"+result);
        return result; //1이면 좋아요 추가, 0이면 좋아요 삭제
    }

    @PostMapping("/check") //좋아요 했는지 체크
    public boolean checkLike(@RequestParam("id")String id, @RequestParam("bNo")Integer bNo) {
        log.info("checkLike...");
        boolean result = likeService.check(id, bNo);
        System.out.println("------"+result);
        return result; //1이면 좋아요 추가, 0이면 좋아요 삭제
    }
}
