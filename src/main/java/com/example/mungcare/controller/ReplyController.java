package com.example.mungcare.controller;

import com.example.mungcare.dto.ReplyDTO;
import com.example.mungcare.entity.Reply;
import com.example.mungcare.service.ReplyService;
import lombok.RequiredArgsConstructor;
import lombok.extern.log4j.Log4j2;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@Log4j2
@RequiredArgsConstructor
@RequestMapping("/reply")
public class ReplyController {
    private final ReplyService replyService; //자동 주입을 위한 final

    @PostMapping("/write") //댓글 작성
    public Integer replyRegister(ReplyDTO replyDTO) {
        log.info("write...");
        Integer bNo = replyService.register(replyDTO);
        System.out.println("id-----------"+bNo);
        return bNo;
    }

    @PostMapping("/list") //특정 게시물의 댓글 목록
    public List<ReplyDTO> replyList(@RequestParam("bNo")Integer bNo) {
        log.info("rList..."+bNo);
        List<ReplyDTO> result = replyService.getList(bNo);
        System.out.println("--------------------"+result);
        return result;
    }

    @PostMapping("/remove") //특정 게시물의 댓글 삭제
    public boolean replyRemove(@RequestParam("rNo") Integer rNo, @RequestParam("bNo") Integer bNo) {
        log.info("rRemove..."+rNo);
        boolean result = replyService.remove(rNo, bNo);
        return result;
    }

    @PostMapping("/modify") //특정 게시물의 댓글 수정 폼
    public ReplyDTO replyModfiy(Integer rNo) {
        log.info("rModify...");
        ReplyDTO result = replyService.modify(rNo);
        return result;
    }

    @PostMapping("/modifyAction") //특정 게시물의 댓글 수정 액션
    public boolean replyModfiyAction(ReplyDTO replyDTO) {
        log.info("rmodifyAction...");
        boolean result = replyService.modifyAction(replyDTO);
        return result;
    }

}
