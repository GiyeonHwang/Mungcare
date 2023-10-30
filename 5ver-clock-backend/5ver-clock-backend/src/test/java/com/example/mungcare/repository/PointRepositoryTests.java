package com.example.mungcare.repository;

import com.example.mungcare.entity.Member;
import com.example.mungcare.entity.Point;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;

@SpringBootTest
public class PointRepositoryTests {
    @Autowired
    private PointRepository pointRepository;

    @Test
    public void insertPoint() {
        Member member = Member.builder().id("user").build();
        System.out.println(member);

        Point point = Point.builder()
                .id(member)
                .walkPoint(20)
                .playPoint(10)
                .build();
        System.out.println("==============================================="+point.getWalkPoint());
        System.out.println("==============================================="+point.getPlayPoint());
        point.calcTotal(point.getWalkPoint(), point.getPlayPoint());
//        point.calcPlay(point.getPlayPoint());
//        point.calcWalk(point.getWalkPoint());
        pointRepository.save(point);
    }
}
