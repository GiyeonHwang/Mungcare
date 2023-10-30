package com.example.mungcare.entity;

import com.fasterxml.jackson.annotation.JsonIgnore;
import lombok.*;
import javax.persistence.*;
import java.sql.Date;

@Entity
@Builder
@Data
@AllArgsConstructor //필드 값을 다 넣은 생성자
@NoArgsConstructor //기본 생성자
@ToString(exclude={"id"}) //연관관계가 있는 엔티티 클래스의 경우 exclude 속성 사용하기. 해당 속성값은 제외
@Table(name = "review")
public class Review {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer vNo; //리뷰 번호

    @ManyToOne(fetch = FetchType.LAZY) //명시적으로 Lazy 로딩 지정
    @JoinColumn(name ="id")
    @JsonIgnore //저장 성공한 객체를 확인시키기 위한 JSON response에서 figure를 제외하고 보낸다.
    private Member id; //아이디

    @Column(length = 1500)
    private String vContent; //리뷰 내용

    private Double latitude; //위도

    private Double longitude; //경도

    @Column(length = 150)
    private String address; //주소

    private Double star; //별점

    @Column(length = 1500)
    private String vPhoto; //리뷰 사진

    private Date vDate; //날짜

    public void changeContent(String vContent) { //댓글 내용 수정
        this.vContent = vContent;
    }

    public void changeLatitude(Double latitude) { //위도 수정
        this.latitude = latitude;
    }

    public void changeLongitude(Double longitude) { //경도 수정
        this.longitude = longitude;
    }

    public void changeAddress(String address) { //주소 수정
        this.address = address;
    }

    public void changeStar(Double star) { //별점 수정
        this.star = star;
    }

    public void changePhoto(String vPhoto) { //사진 수정
        this.vPhoto = vPhoto;
    }
}