package com.example.mungcare.repository;

import com.example.mungcare.entity.Member;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;

import java.util.Optional;
import java.util.stream.IntStream;

@SpringBootTest
public class MemberRepositoryTests {
    @Autowired
    private MemberRepository memberRepository;

    @Test
    public void insertMembers() {
        IntStream.rangeClosed(1, 3).forEach(i -> {
            Member member = Member.builder()
                    .id("user"+i)
                    .pw("pw"+i)
                    .name("name"+i)
                    .nickname("nickname"+i)
                    .phone("phone"+i)
                    .address("address"+i)
                    .detail_Address("detail"+i)
                    .location_Num(("location")+i)
                    .build();

            memberRepository.save(member);

        });
    }

    @Test
    public void updateMembers() {
        Optional<Member> result = memberRepository.findById("C");
        if(result.isPresent()) {
            Member member = result.get();
            member.setPw("c");
            member.setName("c");
            member.setNickname("c");
            member.setPhone("c");
            member.setAddress("c");
            member.setDetail_Address("c");
            member.setLocation_Num("c");

            memberRepository.save(member);
        }
    }

    @Test
    public void checkMembers() {
        Optional<Member> result = memberRepository.findById("user3");
        if(result.isPresent()) {
            Member member = result.get();

            member.setPw("password");
            memberRepository.save(member);
        }
    }

    @Test
    public void memberInfo() {
        Optional<Member> result = memberRepository.findById("user3");
        System.out.println("info------------------------------"+result.get());
    }

    @Test
    public void memberRemove() {
        try{
            memberRepository.deleteById("user4");
            System.out.println("Success");
        } catch(Exception e) {
            System.out.println("Failed");
        }
    }

}
