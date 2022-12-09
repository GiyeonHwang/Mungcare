package com.example.mungcare.service;

import com.example.mungcare.dto.MemberDTO;
import com.example.mungcare.entity.Member;
import com.example.mungcare.repository.MemberRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.log4j.Log4j2;
import org.springframework.stereotype.Service;

import javax.transaction.Transactional;
import java.util.Optional;

@Service
@RequiredArgsConstructor //JPA 처리를 위한 의존성 주입
@Log4j2
public class MemberServiceImpl implements MemberService{
    private final MemberRepository memberRepository; //자동 주입 final
    private final PointService pointService;

    @Override
    public String memberInput(MemberDTO dto) { //회원가입
        try{
            validate(dtoToEntity(dto));
            log.info("memberInput-------------------");
            log.info(dto);
            Member entity = dtoToEntity(dto);
            memberRepository.save(entity);
            return entity.getId();
        } catch(Exception e) {
            log.info(e.getMessage());
            return null;
        }
    }

    @Override
    public String memberCheck(String id, String pw) { //로그인
        log.info("memberCheck-------------------");
        if(id == null)
            return null;
        Optional<Member> result = memberRepository.findById(id);
        if(!result.isPresent()) //null일 경우
            return null;
        log.info("result:" +result);
        log.info("db password = {}, input password = {}", result.get().getPw(), pw);
        log.info("pw Check: "+result.get().getPw().equals(pw));
        if(result.get().getPw().equals(pw)) {
            return id;
        }
        return null;
    }

    @Override
    public MemberDTO memberInfo(String id) { //회원정보 불러오기
        log.info("memberInfo-------------------");
        Optional<Member> result = memberRepository.findById(id);
        if(!result.isPresent())
            return null;
        result.get().changeAccurePoint(pointService.totalMyPoint(id));
        return entityToDTO(result.get());
    }

    @Override
    public boolean memberModify(MemberDTO dto) { //회원정보 수정하기
        log.info("memberModify");
        Optional<Member> result = memberRepository.findById(dto.getId());
        if(result.isPresent()) {
            Member member = result.get();
            member.changePw(dto.getPw());
            member.changeName(dto.getName());
            member.changeNickname(dto.getNickname());
            member.changePhone(dto.getPhone());
            member.changeAddress(dto.getAddress());
            member.changeDetail_Address(dto.getDetail_Address());
            member.changeLocation_Num(dto.getLocation_Num());

            memberRepository.save(member);
            return true;
        }
        return false;
    }

    @Override
    public boolean memberRemove(String id) { //회원 삭제
        try{
            memberRepository.deleteById(id);
            return true;
        } catch(Exception e) {
            log.info(e.getMessage());
            return false;
        }
    }

    private void validate(final Member member) {
        if(member == null) {
            log.warn("Entity cannot be null.");
            throw new RuntimeException("Entity cannot be null.");
        }
    }
}
