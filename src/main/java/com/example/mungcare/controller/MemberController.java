package com.example.mungcare.controller;

import com.example.mungcare.dto.MemberDTO;
import com.example.mungcare.entity.Member;
import com.example.mungcare.service.KaKaoAPI;
import com.example.mungcare.service.MemberService;
import lombok.RequiredArgsConstructor;
import lombok.extern.log4j.Log4j2;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.bind.annotation.RequestMapping;

@RestController
@Log4j2
@RequiredArgsConstructor
@RequestMapping("/member")
public class MemberController {

    private final MemberService memberService;

    @PostMapping("/register") //회원가입
    public String memberRegister(MemberDTO memberDTO) {
        log.info("login...");
        String id = memberService.memberInput(memberDTO);
        System.out.println("id-----------"+id);
        return id;

    }

    @PostMapping("/login") //로그인
    public String login(MemberDTO memberDTO) {
        log.info("login...");
        log.info(memberDTO.toString());
        String check = memberService.memberCheck(memberDTO.getId(), memberDTO.getPw());
        System.out.println("check: " + check);

        return check;
    }

    @PostMapping("/info") //회원정보
    public Member memberInfo(@RequestParam("id")String id) {
        log.info("memberInfo...");
        //log.info(memberDTO.toString());
        log.info("id..."+id);
        Member info = memberService.memberInfo(id);
        System.out.println("info: " + info);

        return info;
    }

    @PostMapping("/modify") //회원정보 수정
    public Member memberModify(MemberDTO memberDTO) {
        log.info("memberModify...");
        log.info(memberDTO.toString());
        Member result = memberService.memberModify(memberDTO);

        log.info("--------------"+result);
        return result;
    }

    @PostMapping("/remove") //회원정보 삭제
    public boolean memberRemove(@RequestParam("id")String id) {
        log.info("memberRemove...");
        log.info("id..."+id);
        boolean result = memberService.memberRemove(id);
        System.out.println("result: " + result);

        return result;
    }

    @PostMapping("/kakao") //카카오 토큰
    public String kakaoToken(@RequestParam("token") String token) {
        log.info("kakao...");
        log.info("token..."+token);
        String result = KaKaoAPI.getAccessToken(token);
        return result;
    }
}