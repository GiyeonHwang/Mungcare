package com.example.mungcare.entity;

import lombok.*;
import org.hibernate.annotations.OnDelete;
import org.hibernate.annotations.OnDeleteAction;
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
@ToString(exclude={"id", "bNo"}) //연관관계가 있는 엔티티 클래스의 경우 exclude 속성 사용하기. 해당 속성값은 제외
@Table(name = "reply")
public class Reply {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer rNo; //게시판 번호

    @Column(length = 1500, nullable = false)
    private String rContent; //게시판 글

    @ManyToOne(fetch = FetchType.LAZY) //명시적으로 Lazy 로딩 지정
    @JoinColumn(name ="id")
    private Member id; //글 작성자

    @ManyToOne(fetch = FetchType.LAZY) //명시적으로 Lazy 로딩 지정
    @OnDelete(action = OnDeleteAction.CASCADE) //게시글 삭제되면 해당 댓글들도 삭제
    @JoinColumn(name ="bNo")
    private Board bNo; //게시글 번호

    @Column(updatable = false, nullable = false)
    @CreatedDate //Entity가 생성되어 저장될 때 시간이 자동 저장된다.
    private LocalDateTime rCreateTime; //만든 시간

    public void changeContent(String content) { //댓글 내용 수정
        this.rContent = content;
    }
}
