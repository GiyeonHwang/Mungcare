package com.example.mungcare.entity;

import lombok.*;
import org.springframework.data.annotation.CreatedDate;
import org.springframework.data.jpa.domain.support.AuditingEntityListener;

import javax.persistence.*;
import java.time.LocalDateTime;

@Entity
@Builder
@Data
@AllArgsConstructor //필드 값을 다 넣은 생성자x
@NoArgsConstructor //기본 생성자
@EntityListeners(AuditingEntityListener.class) //LocalData 쓰기 위한 어노테이션
@ToString(exclude={"id"}) //연관관계가 있는 엔티티 클래스의 경우 exclude 속성 사용하기. 해당 속성값은 제외
@Table(name = "board")
public class Board{
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer bNo;

    @Column(length = 1500, nullable = false)
    private String bContent;

    @Column(length = 100, nullable = false)
    private String bTitle;

    @Column(length = 100, nullable = false)
    private String bType;

    private Integer bViewCount;

    private Integer bLike;

    private Integer bReply;

    @Column(updatable = false, nullable = false)
    @CreatedDate //Entity가 생성되어 저장될 때 시간이 자동 저장된다.
    private LocalDateTime bCreateTime;

    //Eager loading(즉시 로딩): 특정한 엔티티를 조회할 때 연관관계를 가진 모든 엔티티를 같이 로딩하는 것
    //한 번에 연관관계가 있는 모든 엔티티를 가져온다는 장점이 있지만,
    // 여러 연관관계를 맺고 있거나 연관관계가 복잡할수록 조인으로 인한 성능 저하가 있을 수 있다.
    //Lazy loading(지연 로딩): Eager loading과 반대되는 개념.빠른 속도으 처리 가능
    @ManyToOne(fetch = FetchType.LAZY) //명시적으로 Lazy 로딩 지정
    @JoinColumn(name ="id")
    private Member id;

    public void changeTitle(String title) {
        this.bTitle = title;
    }
    public void changeContent(String content) {
        this.bContent = content;
    }

    public Board updateViewCount(Integer bViewCount) {
        this.bViewCount = bViewCount + 1;
        return this;
    }

    public Board updateLikeCount(Integer bNo) {
        this.bLike = bLike + 1;
        return this;
    }

    public Board deleteLikeCount(Integer bLike) {
        this.bLike = bLike - 1;
        return this;
    }
}
