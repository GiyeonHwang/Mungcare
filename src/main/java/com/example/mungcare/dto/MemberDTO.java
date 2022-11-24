package com.example.mungcare.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Builder
@NoArgsConstructor
@AllArgsConstructor
@Data
public class MemberDTO {
    private String id; //아이디
    private String pw; //패스워드
    private String name; //이름
    private String nickname; //닉네임
    private String phone; //전화번호
    private String address; //주소
    private String detail_Address; //상세 주소
    private String location_Num; //우편번호
    private Integer accurePoint; //총 누적 포인트
}
