package com.example.mungcare.dto;

import lombok.Data;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

import java.util.List;
import java.util.function.Function;
import java.util.stream.Collectors;
import java.util.stream.IntStream;

//화면에 10개씩 페이지 번호 출력한다고 가정
@Data
public class PageResultDTO<DTO, EN> {
    //DTO 리스트
    private List<DTO> dtoList;

    //총 페이지 번호
    private int totalPage;

    //현재 페이지 번호
    private int page;

    //목록 사이즈
    private int size;

    //시작 페이지 번호, 끝 페이지 버놓
    private int start, end;

    //이전, 다음
    private boolean prev, next;

    //페이지 번호 목록
    private List<Integer> pageList;

    //다양한 곳에서 사용할 수 있도록 제네릭 타입 사용
    //DTO와 EN(Entity) 타입을 지정
    //Function<EN, DTO>는 엔티티 객체들을 DTO로 변환해주는 기능
    //어떤 종류의 Page<E> 타입이 생성되더라도 PageResultDTO 이용해서 처리할 수 있다.
    public PageResultDTO(Page<EN> result, Function<EN, DTO> fn) {
        dtoList = result.stream().map(fn).collect(Collectors.toList());
        totalPage = result.getTotalPages();
        makePageList(result.getPageable());
    }

    private void makePageList(Pageable pageable) {
        this.page = pageable.getPageNumber() + 1; //0부터 시작하므로 1을 추가
        this.size = pageable.getPageSize();

        //끝 번호 먼저 구하기
        //Math.ceil()은 소수점 올림 처리
        //1페이지일 경우: Math.ceil(1.1)*10=20
        int tempEnd = (int)(Math.ceil(page/10.0)) * 10;
        start = tempEnd - 9;
        prev = start > 1;
        end = totalPage > tempEnd ? tempEnd: totalPage;
        next = totalPage > tempEnd;

        pageList = IntStream.rangeClosed(start, end).boxed().collect(Collectors.toList());
    }
}
