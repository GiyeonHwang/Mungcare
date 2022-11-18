package com.example.mungcare.service;

import com.example.mungcare.dto.ReplyDTO;
import com.example.mungcare.entity.Reply;
import com.example.mungcare.repository.ReplyRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.log4j.Log4j2;
import org.springframework.stereotype.Service;

import javax.transaction.Transactional;
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor //JPA 처리를 위한 의존성 주입
@Log4j2
public class ReplyServiceImpl implements ReplyService{
    private final ReplyRepository replyRepository; //자동 주입 final

    @Override
    public Integer register(ReplyDTO replyDTO) { //댓글 작성
        try{
            validate(dtoToEntity(replyDTO));
            log.info("register...");
            log.info(replyDTO);
            Reply reply = dtoToEntity(replyDTO);
            replyRepository.save(reply);
            return reply.getRNo();
        } catch(Exception e) {
            log.info(e.getMessage());
            return null;
        }
    }

//    @Override
//    public List<ReplyDTO> getList(Integer bNo) {
//        List<Reply> result = replyRepository.getRepliesByBoardOrderByRno(Board.builder().bNo(bNo).build());
//        return result.stream().map(reply -> entityToDTO(reply)).collect(Collectors.toList());
//    }

    @Override
    @Transactional //Lazy loading(지연 로딩)을 했기 때문
    public List<ReplyDTO> getList(Integer bNo) { //특정 게시글의 댓글 목록
        try{
            log.info("getList...");
            List<Reply> entity = replyRepository.findAll();

            List<ReplyDTO> rList = new ArrayList<>();

            for (Reply reply : entity) {
                if(reply.getBNo().equals(bNo)){
                    ReplyDTO dto = entityToDTO(reply);
                    rList.add(dto);
                }
            }
            //만약 빈 리스트일 경우 []로 return
            return rList;
        } catch(Exception e) {
            log.info(e.getMessage());
            return null;
        }

    }

    @Override
    public Reply modify(ReplyDTO replyDTO) { //댓글 수정
        Optional<Reply> result = replyRepository.findById(replyDTO.getRNo());
        if(result.isPresent()) {
            Reply reply = result.get();
            reply.changeContent(replyDTO.getRContent());

            replyRepository.save(reply);
            return reply;
        }
        return null;
    }

    @Override
    public String remove(Integer rNo) { //댓글 삭제
        try{
            replyRepository.deleteById(rNo);
            return "Success";
        } catch(Exception e) {
            log.info(e.getMessage());
            return "False";
        }
    }

    private void validate(final Reply reply) {
        if(reply == null) {
            log.warn("Entity cannot be null.");
            throw new RuntimeException("Entity cannot be null.");
        }
    }
}
