package com.example.mungcare.service;

import com.example.mungcare.dto.ReplyDTO;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;

import java.util.List;

@SpringBootTest
public class ReplyServiceTests {
    @Autowired
    private ReplyService replyService;

//    @Test
//    public void testGetList() {
//        Integer bNo = 1;
//        List<ReplyDTO> replyDTOList = replyService.getList(bNo);
//        replyDTOList.forEach(replyDTO -> System.out.println(replyDTO));
//    }
}
