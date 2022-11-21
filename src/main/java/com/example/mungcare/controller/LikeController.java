package com.example.mungcare.controller;

import com.example.mungcare.dto.BoardDTO;
import com.example.mungcare.dto.MemberDTO;
import com.example.mungcare.entity.Member;
import com.example.mungcare.service.LikeService;
import lombok.RequiredArgsConstructor;
import lombok.extern.log4j.Log4j2;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@Log4j2
@RequiredArgsConstructor
@RequestMapping("/like")
public class LikeController {
    private LikeService likeService;

    @PostMapping("/check") //좋아요 기능
    public boolean like(MemberDTO memberDTO, BoardDTO boardDTO) {
        log.info("like...");
        log.info("boardDTO: "+boardDTO);
        log.info("memberDTO: "+memberDTO);
        boolean result = likeService.addLike(memberDTO.getId(), boardDTO.getBNo());
        return result; //1이면 좋아요 추가, 0이면 좋아요 삭제
    }
}
