package com.example.mungcare.service;

import com.example.mungcare.dto.ReviewDTO;
import com.example.mungcare.entity.Member;
import com.example.mungcare.entity.Review;

import java.util.List;

public interface ReviewService {
    Integer register(ReviewDTO reviewDTO); //리뷰 등록
    List<ReviewDTO> reviewRadius(Double latitude, Double longitude); //내 위치 가까운 리뷰 목록
    boolean modify(ReviewDTO reviewDTO); //리뷰 수정
    boolean remove(Integer vNo); //리뷰 삭제

    default Review dtoToEntity(ReviewDTO dto) {
        Member member = Member.builder().id(dto.getId()).build();

        Review review = Review.builder()
                .id(member)
                .vNo(dto.getVNo())
                .vContent(dto.getVContent())
                .latitude(dto.getLatitude())
                .longitude(dto.getLongitude())
                .address(dto.getAddress())
                .star(dto.getStar())
                .vPhoto(dto.getVPhoto())
                .vDate(dto.getVDate())
                .build();
        return review;
    }

    default ReviewDTO entityToDTO(Review review) {
        Member member = review.getId();

        ReviewDTO dto = ReviewDTO.builder()
                .id(member.getId())
                .vNo(review.getVNo())
                .vContent(review.getVContent())
                .latitude(review.getLatitude())
                .longitude(review.getLongitude())
                .address(review.getAddress())
                .star(review.getStar())
                .vPhoto(review.getVPhoto())
                .vDate(review.getVDate())
                .build();
        return dto;
    }
}
