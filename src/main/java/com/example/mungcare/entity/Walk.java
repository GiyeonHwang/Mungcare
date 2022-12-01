package com.example.mungcare.entity;

import com.fasterxml.jackson.annotation.JsonIgnore;
import lombok.*;

import javax.persistence.*;
import java.sql.Time;

@Entity
@Builder
@Data
@AllArgsConstructor //필드 값을 다 넣은 생성자x
@NoArgsConstructor //기본 생성자
@Table(name = "walk")
@ToString(exclude={"id"}) //연관관계가 있는 엔티티 클래스의 경우 exclude 속성 사용하기. 해당 속성값은 제외
public class Walk {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer wNo; //같이 산책하기 번호

    @ManyToOne(fetch = FetchType.LAZY) //명시적으로 Lazy 로딩 지정
    @JoinColumn(name ="id")
    @JsonIgnore //저장 성공한 객체를 확인시키기 위한 JSON response에서 figure를 제외하고 보낸다.
    private Member id; //사용자

    @Column(length = 45, nullable = false)
    private Double latitude; //사용자 위도

    @Column(length = 45, nullable = false)
    private Double longitude; //사용자 경도

    private Time wTime; //공지사항 - 모일 날짜

    public void changeLat(Double latitude) { //사용자 위도 수정
        this.latitude = latitude;
    }

    public void changeLon(Double longitude) { //사용자 경도 수정
        this.longitude = longitude;
    }
}
