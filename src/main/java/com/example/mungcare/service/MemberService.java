package com.example.mungcare.service;

import com.example.mungcare.dto.MemberDTO;
import com.example.mungcare.entity.Member;

public interface MemberService {
    String memberInput(MemberDTO dto); //회원가입
    String memberCheck(String id, String pw); //로그인
    Member memberInfo(String id); //회원 정보
    Member memberModify(MemberDTO dto); //회원 수정
    boolean memberRemove(String id); //회원 삭제

    //MemberDTO를 Member 엔티티 타입으로 변환할 필요가 있는데,
    // 이에 대한 처리는 MemberService 인터페이스에 dtoToEntity()를 작성해서 처리한다.
    //서비스 계층에서는 파라미터를 DTO 타입으로 받기 때문에 이를 JPA로 처리하기 위해서 엔티티 타입의 객체로 변환
    default Member dtoToEntity(MemberDTO dto) {
        Member member = Member.builder()
                .id(dto.getId())
                .pw(dto.getPw())
                .name(dto.getName())
                .nickname(dto.getNickname())
                .phone(dto.getPhone())
                .address(dto.getAddress())
                .detail_Address(dto.getDetail_Address())
                .location_Num(dto.getLocation_Num())
                .build();

        return member;
    }
}