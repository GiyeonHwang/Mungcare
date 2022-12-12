package com.example.mungcare.service;

import com.example.mungcare.dto.HotelDTO;
import com.example.mungcare.entity.Hotel;
import com.example.mungcare.repository.HotelRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.log4j.Log4j2;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

@Service
@RequiredArgsConstructor
@Log4j2
public class HotelServiceImpl implements HotelService{
    private final HotelRepository hotelRepository;

    @Override
    public List<HotelDTO> hotelList() { //위탁관리업 전체 목록
        try{
            log.info("hospitalList-------------------");
            List<Hotel> entity = hotelRepository.findAll();
            List<HotelDTO> hList = new ArrayList<>();

            for(Hotel hotel : entity) {
                HotelDTO dto = entityToDTO(hotel);
                hList.add(dto);
            }
            return hList;
        } catch(Exception e) {
            log.info("오류");
            return null;
        }
    }

    @Override
    public List<HotelDTO> hotelRadius(Double latitude, Double longitude) { //내 위치에 가까운 위탁관리업 목록
        List<Hotel> entity = hotelRepository.findAll();
        List<HotelDTO> hList = new ArrayList<>();

        for(Hotel hotel : entity) {
            double distance = getDistance(latitude, longitude, hotel.getLatitude(), hotel.getLongitude());

            if(distance<5) {
                System.out.println("------------------------"+hotel+"\n==="+distance);
                System.out.println(hotel);
                HotelDTO dto = entityToDTO(hotel);
                hList.add(dto);
            }
        }
        return hList.isEmpty() ? null : hList;
    }

    //두 지점 간의 거리 계산
    private double getDistance(double lat1, double lon1, double lat2, double lon2) { //첫번째 좌표 위도 및 경도, 두번째 좌표 위도 및 경도
        double theta = lon1 - lon2;
        double dist = Math.sin(deg2rad(lat1))* Math.sin(deg2rad(lat2)) + Math.cos(deg2rad(lat1))*Math.cos(deg2rad(lat2))*Math.cos(deg2rad(theta));
        dist = Math.acos(dist);
        dist = rad2deg(dist);
        dist = dist * 60*1.1515*1609.344;
//        System.out.println("distance-------------------------"+dist);
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
