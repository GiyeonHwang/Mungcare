package com.example.mungcare.service;

import com.example.mungcare.dto.WalkDTO;
import com.example.mungcare.entity.Walk;
import com.example.mungcare.repository.WalkRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.log4j.Log4j2;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.ArrayList;
import java.util.List;

@Service
@RequiredArgsConstructor //JPA 처리를 위한 의존성 주입
@Log4j2
public class WalkServiceImpl implements WalkService{
    private final WalkRepository walkRepository; //자동 주입 final

    @Override
    public boolean register(WalkDTO dto) { //같이 산책하기 등록, 위치 계속 업데이트
        try {
            validate(dtoToEntity(dto));
            log.info("register-------------------");
            log.info(dto);
            Walk walk = dtoToEntity(dto);

            List<Walk> entity = walkRepository.findAll();
            for(Walk walk1 : entity) {
                if(dto.getId().equals(walk1.getId().getId())) {
                    walk1.changeLat(dto.getLatitude());
                    walk1.changeLon(dto.getLongitude());
                    walkRepository.save(walk1);
                    return true;
                }
            }
            walkRepository.save(walk);
            return true;
        } catch(Exception e) {
            log.info(e.getMessage());
            return false;
        }
    }

    @Override
    public boolean walkCheck(WalkDTO dto) { //같이 산책 중인지 체크
        List<Walk> entity = walkRepository.findAll();
        for(Walk walk : entity) {
            if(dto.getId().equals(walk.getId().getId()))
                return true;
        }
        return false;
    }

    @Override
    @Transactional
    public List<WalkDTO> walkRadius(WalkDTO dto) { //내 위치 반경 1km 안에 있는 사람 목록
        List<Walk> entity = walkRepository.findAll();
        List<WalkDTO> wList = new ArrayList<>();

        for(Walk walk : entity) {
            double distance = getDistance(dto.getLatitude(), dto.getLongitude(), walk.getLatitude(), walk.getLongitude());
            System.out.println("------------------------"+walk+"==="+distance);
            if(distance<=1) {
                System.out.println("true=====");
                WalkDTO result = entityToDTO(walk);
                wList.add(result);
            }
        }
        return wList.isEmpty() ? null : wList;
    }
    private void validate(final Walk walk) {
        if(walk == null) {
            log.warn("Entity cannot be null.");
            throw new RuntimeException("Entity cannot be null.");
        }
    }

    //두 지점 간의 거리 계산
    private double getDistance(double lat1, double lon1, double lat2, double lon2) { //첫번째 좌표 위도 및 경도, 두번째 좌표 위도 및 경도
        double theta = lon1 - lon2;
        double dist = Math.sin(deg2rad(lat1))* Math.sin(deg2rad(lat2)) + Math.cos(deg2rad(lat1))*Math.cos(deg2rad(lat2))*Math.cos(deg2rad(theta));
        dist = Math.acos(dist);
        dist = rad2deg(dist);
        dist = dist * 60*1.1515*1609.344;
        System.out.println("distance-------------------------"+dist);
        return dist / 1000; //단위 km
    }

    //10진수를 radian(라디안)으로 변환
    private double deg2rad(double deg){
        return (deg * Math.PI/180.0);
    }
    //radian(라디안)을 10진수로 변환
    private double rad2deg(double rad){
        return (rad * 180 / Math.PI);
    }

}
