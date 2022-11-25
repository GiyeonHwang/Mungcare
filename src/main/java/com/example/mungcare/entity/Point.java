package com.example.mungcare.entity;

import com.example.mungcare.repository.PointId;
import com.fasterxml.jackson.annotation.JsonIgnore;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.hibernate.annotations.OnDelete;
import org.hibernate.annotations.OnDeleteAction;

import javax.persistence.*;
import java.sql.Date;

@Entity
@Builder
@Data
@AllArgsConstructor //필드 값을 다 넣은 생성자x
@NoArgsConstructor //기본 생성자
@Table(name = "point")
@IdClass(PointId.class) //복합키
public class Point {
    @Id
    @ManyToOne(fetch = FetchType.LAZY) //명시적으로 Lazy 로딩 지정
    @OnDelete(action = OnDeleteAction.CASCADE) //회원 삭제되면 해당 포인트들도 삭제
    @JoinColumn(name ="id")
    @JsonIgnore //저장 성공한 객체를 확인시키기 위한 JSON response에서 figure를 제외하고 보낸다.
    private Member id;

    @Id
    private Date pointDate; //포인트 저장 날짜

    private Integer walkPoint; //산책 포인트
    private Integer playPoint; //놀기 포인트
    private Integer totalPoint; //해당 날짜의 총 포인트

    @PrePersist
    public void prePersist() { //default 0
        this.walkPoint = this.walkPoint == null ? 0 : this.walkPoint;
        this.playPoint = this.playPoint == null ? 0 : this.playPoint;
        this.totalPoint = this.totalPoint == null ? 0 : this.totalPoint;
    }

    public void calcWalk(Integer walkPointRe, Integer walkPoint) { //산책 포인트 누적
        this.walkPoint = walkPointRe+walkPoint;
    }

    public void calcPlay(Integer playPointRe, Integer playPoint) { //놀기 포인트 누적
        this.playPoint = playPointRe + playPoint;
    }

    public void calcTotal(Integer walkPoint, Integer playPoint) { //총 포인트
        this.totalPoint = walkPoint + playPoint;
    }
}