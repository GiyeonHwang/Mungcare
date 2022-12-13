package com.example.mungcare.service;

import com.example.mungcare.dto.ReviewDTO;
import com.example.mungcare.entity.Review;
import com.example.mungcare.repository.ReviewRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.log4j.Log4j2;
import org.springframework.stereotype.Service;

import java.io.BufferedReader;
import java.io.InputStreamReader;
import java.net.HttpURLConnection;
import java.net.URL;
import java.nio.charset.Charset;
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@Service
@RequiredArgsConstructor
@Log4j2
public class ReviewServiceImpl implements ReviewService{
    private static String GEOCODE_URL="https://dapi.kakao.com/v2/local/geo/coord2address.json?"; //카카오 api
    private static String GEOCODE_USER_INFO="KakaoAK {REST API KEY}"; //rest api

    private final ReviewRepository reviewRepository;

    @Override
    public Integer register(ReviewDTO reviewDTO) { //리뷰 등록
        try {
            validate(dtoToEntity(reviewDTO));
            log.info("register...");
            log.info(reviewDTO);
            Review review = dtoToEntity(reviewDTO);
            //위도, 경도를 주소로 변환하여 저장
            review.changeAddress(getAddress(reviewDTO.getLatitude(), reviewDTO.getLongitude()));
            reviewRepository.save(review);
            return review.getVNo();
        } catch(Exception e) {
            log.info(e.getMessage());
            return null;
        }
    }

    @Override
    public List<ReviewDTO> reviewList() { //산책 리뷰 전체 목록
        try{
            log.info("reviewList-------------------");
            List<Review> entity = reviewRepository.findAll();
            List<ReviewDTO> rList = new ArrayList<>();

            for(Review review : entity) {
                ReviewDTO dto = entityToDTO(review);
                rList.add(dto);
            }
            return rList;
        } catch(Exception e) {
            log.info("오류");
            return null;
        }
    }

    @Override
    public List<ReviewDTO> reviewRadius(Double latitude, Double longitude) { //내 위치 가까운 리뷰 목록
        List<Review> entity = reviewRepository.findAll();
        List<ReviewDTO> vList = new ArrayList<>();

        for(Review review : entity) {
            double distance = getDistance(latitude, longitude, review.getLatitude(), review.getLongitude());

            if(distance<5) {
                System.out.println("------------------------"+review+"\n==="+distance);
                ReviewDTO dto = entityToDTO(review);
                vList.add(dto);
            }
        }
        return vList.isEmpty() ? null : vList;
    }

    @Override
    public boolean modify(ReviewDTO reviewDTO) { //리뷰 수정
        try {
            Optional<Review> result = reviewRepository.findById(reviewDTO.getVNo());
            if(result.isPresent()) {
                Review review = result.get();
                review.changeContent(reviewDTO.getVContent());
                review.changeLatitude(reviewDTO.getLatitude());
                review.changeLongitude(reviewDTO.getLongitude());
                //위도, 경도를 주소로 변환하여 저장
                review.changeAddress(getAddress(reviewDTO.getLatitude(), reviewDTO.getLongitude()));
                review.changeStar(reviewDTO.getStar());
                review.changePhoto(reviewDTO.getVPhoto());
                reviewRepository.save(review);
                return true;
            }
            return false;
        } catch(Exception e) {
            log.info(e.getMessage());
            return false;
        }
    }

    @Override
    public boolean remove(Integer vNo) { //리뷰 삭제
        try {
            reviewRepository.deleteById(vNo);
            return true;
        } catch(Exception e) {
            log.info(e.getMessage());
            return false;
        }
    }

    @Override
    public List<ReviewDTO> reviewSearch(String search) { //산책 리뷰 장소 검색
        try {
            List<Review> entity = reviewRepository.findAll();
            List<ReviewDTO> vList = new ArrayList<>();

            for(Review review : entity) {
                if(review.getAddress() != null && review.getAddress().contains(search)) {
                    ReviewDTO dto = entityToDTO(review);
                    vList.add(dto);
                }
            }
            return vList.isEmpty() ? null : vList;
        } catch(Exception e) {
            log.info(e.getMessage());
            return null;
        }

    }

    private void validate(final Review review) {
        if(review == null) {
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

    private String getAddress(Double latitude, Double longitude) {
        URL obj;
        try {
            String x = longitude.toString(); //경도
            String y = latitude.toString(); //위도
            String coordinatesystem = "WGS84"; //x, y로 입력되는 값에 대한 좌표계

            obj = new URL(GEOCODE_URL + "x=" + x + "&y=" + y + "&input_coord=" + coordinatesystem);

            HttpURLConnection con = (HttpURLConnection) obj.openConnection();
            con.setRequestMethod("GET");
            con.setRequestProperty("Authorization", GEOCODE_USER_INFO);
            con.setRequestProperty("content-type", "application/json");
            con.setDoOutput(true);
            con.setUseCaches(false);

            Charset charset = Charset.forName("UTF-8");
            BufferedReader in = new BufferedReader(new InputStreamReader(con.getInputStream(), charset));
            String inputLine;
            StringBuffer response = new StringBuffer();

            while ((inputLine = in .readLine()) != null) {
                response.append(inputLine);
            }

            String result = response.toString();
            String str1 = "\"address_name\":\"";
            String str2 = "\",";

            String address = "";
            if(result.contains(str1))
                address = result.split(str1)[1].split(str2)[0];

            System.out.println(address);
            return address;

        } catch (Exception e) {
            // TODO Auto-generated catch block
            e.printStackTrace();
            return null;
        }
    }
}

