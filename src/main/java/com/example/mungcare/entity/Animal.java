package com.example.mungcare.entity;

import com.example.mungcare.repository.AnimalId;
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
@Table(name = "animal")
@IdClass(AnimalId.class) //복합키
public class Animal {
    @Id
    @ManyToOne(fetch = FetchType.LAZY) //명시적으로 Lazy 로딩 지정
    @OnDelete(action = OnDeleteAction.CASCADE) //회원 삭제되면 해당 반려동물들도 삭제
    @JoinColumn(name ="id")
    @JsonIgnore //저장 성공한 객체를 확인시키기 위한 JSON response에서 figure를 제외하고 보낸다.
    private Member id;

    @Id
    @Column(length = 100, nullable = false)
    private String aName; //반려견 이름

    @Column(length = 20, nullable = false)
    private String aSex; //성별

    @Column(nullable = false)
    private Date aBirth; //생일

    @Column(length = 100, nullable = false)
    private String aBreed; //종류

    @Column(nullable = false)
    private boolean aNeut; //중성화 여부

    @Column(length = 1500)
    private String aPhoto; //사진

    public void changeBirth(Date aBirth) { //생일 수정
        this.aBirth = aBirth;
    } //생일 수정

    public void changeBreed(String aBreed) { //종류 수정
        this.aBreed = aBreed;
    } //종류 수정

    public void changeNeut(boolean aNeut) { //중성화 여부 수정
        this.aNeut = aNeut;
    } //중성화 여부 수정
}
