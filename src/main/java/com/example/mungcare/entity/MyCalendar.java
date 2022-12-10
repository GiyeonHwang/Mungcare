package com.example.mungcare.entity;

import com.fasterxml.jackson.annotation.JsonIgnore;
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
    @JsonIgnore //저장 성공한 객체를 확인시키기 위한 JSON response에서 figure를 제외하고 보낸다.
    private Member id; //작성자

    private Time cStartTime; //시작시간
    private Time cEndTime; //끝나는 시간

    @Column(nullable = false)
    private Date cDate; //날짜
    @Column(length = 1500)
    private String cPhoto; //사진

    private String cType; //산책인지 놀기인지 체크하기
    private Integer cWalkTime; //총 산책 시간

    public void changeCEndTime(Time cEndTime) { //끝나는 시간 수정
        this.cEndTime = cEndTime;
    }
    public void changeCPhoto(String cPhoto) { //인증 사진 수정
        this.cPhoto = cPhoto;
    }
    public void changeCWalktTime(Integer cWalkTime) {
        this.cWalkTime = cWalkTime;
    }
}
