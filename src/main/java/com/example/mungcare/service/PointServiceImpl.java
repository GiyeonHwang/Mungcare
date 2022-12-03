package com.example.mungcare.service;

import com.example.mungcare.dto.PointDTO;
import com.example.mungcare.entity.Point;
import com.example.mungcare.repository.MemberRepository;
import com.example.mungcare.repository.PointId;
import com.example.mungcare.repository.PointRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.log4j.Log4j2;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.text.SimpleDateFormat;
import java.util.*;

@Service
@RequiredArgsConstructor //JPA 처리를 위한 의존성 주입
@Log4j2
public class PointServiceImpl implements PointService{
    private final PointRepository pointRepository; //자동 주입 final
    private final MemberRepository memberRepository; //자동 주입 final

    @Override
    public Integer pointInput(PointDTO dto) { //포인트 등록
        try {
            validate(dtoToEntity(dto));
            log.info("pointInput-------------------");
            log.info(dto);

            PointId pl = new PointId(dto.getId(), dto.getPointDate()); //복합키
            Optional<Point> result = pointRepository.findById(pl); //기존에 데이터가 있는지 확인하기 위해서, 해당 데이터가 있는지 확인
            Point point = dtoToEntity(dto);

            //walk와 play point 값을 null값을 안보내준다는 가정;; 그렇지 않을 경우, if문 처리 추가 필요
            if(result.isPresent()) { //null이 아니면
                point.calcWalk(result.get().getWalkPoint(), point.getWalkPoint()); //walk point 계산
                point.calcPlay(result.get().getPlayPoint(), point.getPlayPoint()); //play point 계산

            } else{ //null 이면
                //기존 값을 가져와서 더하면 당연히 오류
                //기존 값이 없기 때문에 0을 넣어서 계산.
                point.calcWalk(0, point.getWalkPoint()); //walk point 계산
                point.calcPlay(0, point.getPlayPoint()); //play point 계산
            }

            point.calcTotal(point.getWalkPoint(), point.getPlayPoint()); //total point 계산

            pointRepository.save(point);

            return point.getTotalPoint();
        } catch(Exception e) {
            log.info(e.getMessage());
            return null;
        }
    }

    @Override
    @Transactional
    public List<PointDTO> rankList() { //랭킹 목록
        try {
            log.info("rankList-------------------");
            List<Point> entity = pointRepository.findAll(Sort.by(Sort.Direction.DESC, "totalPoint"));
            List<PointDTO> pList = new ArrayList<>();

            SimpleDateFormat format = new SimpleDateFormat("yyyy-MM-dd"); //날짜 형식 yyyy-MM-dd
//            Date now = new Date();
//            String now_dt = format.format(now); //오늘 날짜
            Calendar cal = new GregorianCalendar(Locale.KOREA);
            cal.add(Calendar.DATE,-1);
            String yesterday = format.format(cal.getTime()); //하루 전
            System.out.println("Yesterday..."+yesterday);
            for(Point point : entity) {
                if(yesterday.equals(format.format(point.getPointDate()))) { //하루 전날의 totalpoint를 가져와서, 랭킹을 나타낸다.
                    PointDTO dto = entityToDTO(point);
                    pList.add(dto);
                }
            }
            return pList;
        } catch(Exception e) {
            log.info(e.getMessage());
            return null;
        }
    }

    @Override
    @Transactional //명시적으로 Lazy 로딩 지정했기 때문에
    public List<PointDTO> myPoint(String id) { //나의 일주일 포인트 내역
        try {
            log.info("myPoint-------------------");
            List<Point> entity = pointRepository.findAll(Sort.by(Sort.Direction.DESC, "pointDate"));
            List<PointDTO> pList = new ArrayList<>();
            
            Calendar cal = new GregorianCalendar(Locale.KOREA);
            cal.add(Calendar.DATE,-7); //일주일 전
            for(Point point : entity) {
                //cal.getTime()은 point.getPointDate()보다 이전이다.
                //id가 같고, 일주일 전부터 현재까지의 포인트 내역만 보여주기
                //=> cal.getTime() 하루 뒤부터 현재 날짜까지의 포인트 내역
                if (id.equals(point.getId().getId()) && cal.getTime().before(point.getPointDate())) {
                    PointDTO dto = entityToDTO(point);
                    pList.add(dto);
                }
            }
            return pList;
        } catch(Exception e) {
            log.info(e.getMessage());
            return null;
        }
    }

    private void validate(final Point point) {
        if(point == null) {
            log.warn("Entity cannot be null.");
            throw new RuntimeException("Entity cannot be null.");
        }
    }

}
