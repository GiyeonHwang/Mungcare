package com.example.mungcare.entity;

import com.example.mungcare.repository.LikeId;
import com.fasterxml.jackson.annotation.JsonIgnore;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.hibernate.annotations.OnDelete;
import org.hibernate.annotations.OnDeleteAction;

import javax.persistence.*;

@Entity
@Builder
@Data
@AllArgsConstructor //필드 값을 다 넣은 생성자x
@NoArgsConstructor //기본 생성자
@Table(name = "checkLike")
@IdClass(LikeId.class) //복합키
public class Like {
    @Id
    @ManyToOne(fetch = FetchType.LAZY) //명시적으로 Lazy 로딩 지정
    @JoinColumn(name ="id")
    @JsonIgnore //저장 성공한 객체를 확인시키기 위한 JSON response에서 figure를 제외하고 보낸다.
    private Member id;

    @Id
    @ManyToOne(fetch = FetchType.LAZY) //명시적으로 Lazy 로딩 지정
    @OnDelete(action = OnDeleteAction.CASCADE) //게시글 삭제되면 해당 댓글들도 삭제
    @JoinColumn(name ="bNo")
    @JsonIgnore //저장 성공한 객체를 확인시키기 위한 JSON response에서 figure를 제외하고 보낸다.
    private Board bNo;

    private boolean cLike; //좋아요 체크 확인

    public void addLike() {
        cLike = true;
    }

    public void delLike() {
        cLike = false;
    }

    public boolean likeAddDel(boolean ch) {
        if(!ch) { //좋아요 안했을 경우
            this.cLike = true;
            return true; //좋아요 눌르기
        } else { //좋아요 했을 경우
            this.cLike = false;
            return false; //좋아요 삭제하기
        }

    }

}
