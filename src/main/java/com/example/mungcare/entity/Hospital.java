package com.example.mungcare.entity;

import lombok.*;

import javax.persistence.*;

@Entity
@Builder
@Data
@AllArgsConstructor //필드 값을 다 넣은 생성자x
@NoArgsConstructor //기본 생성자
@Table(name = "hospital")
public class Hospital {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer hNo; //병원 정보 번호

    @Column(length = 100)
    private String hName; //병원 이름

    @Column(length = 1500)
    private String address; //병원 주소
    
    @Column(length = 45)
    private String latitude; //위도
    
    @Column(length = 45)
    private String longitude; //경도
}
