package com.example.mungcare.entity;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.Table;

@Entity
@Builder
@Data
@AllArgsConstructor //필드 값을 다 넣은 생성자
@NoArgsConstructor //기본 생성자
@Table(name = "member")
public class Member {

    @Id
    private String id;

    private String pw;

    private String name;

    private String nickname;

    private String phone;

    private String address;

    private String detail_Address;

    private String location_Num;

}