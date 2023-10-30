package com.example.mungcare.service;

import com.example.mungcare.dto.MemberDTO;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;

@SpringBootTest
public class MemberServiceTests {
    @Autowired
    private MemberService memberService;

    @Test
    public void testRegister() {
        MemberDTO dto = MemberDTO.builder()
                .id("user4")
                .pw("pw4")
                .name("name4")
                .nickname("nickname4")
                .phone("phone4")
                .address("address4")
                .detail_Address("detail4")
                .location_Num("location4")
                .build();

        String bno = memberService.memberInput(dto);
    }
}