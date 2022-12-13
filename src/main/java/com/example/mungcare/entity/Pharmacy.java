package com.example.mungcare.entity;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.persistence.*;

@Entity
@Builder
@Data
@AllArgsConstructor //필드 값을 다 넣은 생성자x
@NoArgsConstructor //기본 생성자
@Table(name = "pharmacy")
public class Pharmacy {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer no; //약국 정보 번호

    @Column(length = 100)
    private String name; //약국 이름

    @Column(length = 1500)
    private String address; //약국 주소

    private Double latitude; //위도

    private Double longitude; //경도

    @Column(length = 100)
    private String tell; //전화번호
}
