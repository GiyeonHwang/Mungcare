package com.example.mungcare.entity;

import com.fasterxml.jackson.annotation.JsonIgnore;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.persistence.*;
import java.util.List;

@Entity
@Builder
@Data
@AllArgsConstructor //필드 값을 다 넣은 생성자
@NoArgsConstructor //기본 생성자
@Table(name = "member")
public class Member {
    @Id
    private String id; //아이디

    @OneToMany(mappedBy = "id", fetch = FetchType.LAZY)
    private List<Animal> animalList;
    private String pw; //패스워드

    private String name; //이름

    private String nickname; //닉네임

    private String phone; //전화번호

    private String address; //주소

    private String detail_Address; //상세 주소

    private String location_Num; //우편번호

    private Integer accurePoint; //총 누적 포인트

    @PrePersist
    public void prePersist() { //default 0
        this.accurePoint = this.accurePoint == null ? 0 : this.accurePoint;
    }

    public void changePw(String pw) { //비밀번호 수정
        this.pw = pw;
    }

    public void changeName(String name) { //이름 수정
        this.name = name;
    }

    public void changeNickname(String nickname) { //닉네임 수정
        this.nickname = nickname;
    }

    public void changePhone(String phone) { //전화번호 수정
        this.phone = phone;
    }

    public void changeAddress(String address) { //주소 수정
        this.phone = address;
    }

    public void changeDetail_Address(String detail_Address) { //상세주소 수정
        this.detail_Address = detail_Address;
    }

    public void changeLocation_Num(String location_Num) { //우편번호 수정
        this.location_Num = location_Num;
    }

    public void changeAccurePoint(Integer accurePoint) { //나의 총 누적 포인트 현황
        this.accurePoint = accurePoint;
    }
}