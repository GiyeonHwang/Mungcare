package com.example.mungcare.controller;

import com.example.mungcare.dto.WalkDTO;
import com.example.mungcare.service.WalkService;
import lombok.RequiredArgsConstructor;
import lombok.extern.log4j.Log4j2;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.HashMap;
import java.util.List;

@RestController
@Log4j2
@RequiredArgsConstructor
@RequestMapping("/walk")
public class WalkController {
    private final WalkService walkService;

    @PostMapping("/register") //같이 산책하기 시작 및 내 위치 보내기
    public boolean walkRegister(WalkDTO walkDTO) {
        log.info("register...");
        boolean result = walkService.register(walkDTO);
        System.out.println("result: "+result);
        return result;
    }

    @PostMapping("/check") //같이 산책 중인지 체크
    public boolean walkCheck(WalkDTO walkDTO) {
        log.info("check...");
        boolean check= walkService.walkCheck(walkDTO);
        System.out.println("check: "+check);
        return check;
    }

    @PostMapping("/list") //같이 산책 중인지 체크
    public List<WalkDTO> walkList(WalkDTO walkDTO) {
        log.info("list...");
        List<WalkDTO> wList = walkService.walkRadius(walkDTO);
        System.out.println("wList: "+wList);
        return wList;
    }

//    @PostMapping("/notice") //같이 산책하기 공지 올리기
//    public boolean walktogether(@RequestBody HashMap<String, Object> walkTogether) {
//
//        System.out.println(walkTogether);
//        return true;
//    }
}
