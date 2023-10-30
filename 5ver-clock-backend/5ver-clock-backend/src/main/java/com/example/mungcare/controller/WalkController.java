package com.example.mungcare.controller;

import com.example.mungcare.dto.WalkDTO;
import com.example.mungcare.service.WalkService;
import lombok.RequiredArgsConstructor;
import lombok.extern.log4j.Log4j2;
import org.springframework.web.bind.annotation.*;

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
    public boolean walkCheck(@RequestParam("id") String id) {
        log.info("check...");
        boolean check= walkService.walkCheck(id);
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

    @PostMapping("/end") //해당 id 정보(같이 산책-위도,경도) 삭제
    public boolean walkEnd(@RequestParam("id") String id) {
        log.info("end...");
        boolean result = walkService.walkRemove(id);
        System.out.println("result: "+result);
        return result;
    }
}
