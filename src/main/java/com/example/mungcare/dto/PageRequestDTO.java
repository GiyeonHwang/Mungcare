package com.example.mungcare.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;

@Builder
@AllArgsConstructor
@Data
public class PageRequestDTO { //화면에서 전달되는 page라는 파라미터와 size 파라미터를 수집하는 역할을 한다.
    //JPA쪽에서 사용하는 Pageable 타입의 객체를 생성한다.
    private int page;
    private int size;
    private String type; //검색 타입
    private String keyword; //키워드(검새어)

    public PageRequestDTO() { //페이지 번호 등은 기본값이 있는 것이 좋기 때문에 1과 10 값을 이용
        this.page = 1;
        this.size = 10;
    }

    public Pageable getPageable(Sort sort) {
        return PageRequest.of(page -1, size, sort);
    }
}
