package com.example.mungcare.entity;

import com.example.mungcare.repository.LikeId;
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
@Table(name = "checkLike")
@IdClass(LikeId.class) //복합키
public class Like {
    @Id
    @ManyToOne(fetch = FetchType.LAZY) //명시적으로 Lazy 로딩 지정
    @JoinColumn(name ="id")
    private Member id;

    @Id
    @ManyToOne(fetch = FetchType.LAZY) //명시적으로 Lazy 로딩 지정
    @JoinColumn(name ="bNo")
    private Board bNo;

    private int cLike; //좋아요 체크 확인

    public void addLike() {
        cLike = 1;
    }

    public void delLike() {
        cLike = 0;
    }

    public Integer likeAddDel(Integer ch) {
        if(ch==0) { //좋아요 안했을 경우
            this.cLike = 1;
            return 1; //좋아요 눌르기
        }
        else { //좋아요 했을 경우
            this.cLike = 0; 
            return 0; //좋아요 삭제하기
        }

    }

}
