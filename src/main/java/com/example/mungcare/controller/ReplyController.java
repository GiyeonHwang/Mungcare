package com.example.mungcare.controller;

import com.example.mungcare.dto.BoardDTO;
import com.example.mungcare.dto.ReplyDTO;
import com.example.mungcare.entity.Reply;
import com.example.mungcare.service.ReplyService;
import lombok.RequiredArgsConstructor;
import lombok.extern.log4j.Log4j2;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@Log4j2
@RequiredArgsConstructor
@RequestMapping("/reply")
public class ReplyController {
    private final ReplyService replyService; //자동 주입을 위한 final

    @PostMapping("/write") //댓글 작성
    public Integer register(ReplyDTO replyDTO) {
        log.info("write...");
        Integer bNo = replyService.register(replyDTO);
        System.out.println("id-----------"+bNo);
        return bNo;
    }

    @PostMapping("/rList") //특정 게시물의 댓글 목록
    public List<ReplyDTO> rList(@RequestParam("bNo")Integer bNo) {
        log.info("rList..."+bNo);
        List<ReplyDTO> result = replyService.getList(bNo);

        return result;
    }

    @PostMapping("/rRemove") //특정 게시물의 댓글 삭제
    public void remove(@RequestParam("rNo") Integer rNo) {
        log.info("rRemove..."+rNo);
        replyService.remove(rNo);
    }

    @PostMapping("/rModify") //특정 게시물의 댓글 수정
    public void modfiy(ReplyDTO replyDTO) {
        log.info("rModify...");
        replyService.modify(replyDTO);
    }

}
