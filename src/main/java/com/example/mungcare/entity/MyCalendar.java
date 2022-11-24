package com.example.mungcare.entity;

import lombok.*;
import javax.persistence.*;
import java.sql.Date;
import java.sql.Time;

@Entity
@Builder
@Data
@AllArgsConstructor //필드 값을 다 넣은 생성자x
@NoArgsConstructor //기본 생성자
@ToString(exclude={"id"}) //연관관계가 있는 엔티티 클래스의 경우 exclude 속성 사용하기. 해당 속성값은 제외
@Table(name = "calendar")
public class MyCalendar {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer cNo; //캘린더 번호

    @ManyToOne(fetch = FetchType.LAZY) //명시적으로 Lazy 로딩 지정
    @JoinColumn(name ="id")
    private Member id; //작성자

    private Time cStartTime; //시작시간
    private Time cEndTime; //끝나는 시간
    private Date cWalkDate; //날짜

    private Double cKm; //산책 거리
}
