package com.example.mungcare.service;

import com.example.mungcare.dto.ReplyDTO;
import com.example.mungcare.entity.Board;
import com.example.mungcare.entity.Reply;
import com.example.mungcare.repository.ReplyRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.log4j.Log4j2;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor //JPA 처리를 위한 의존성 주입
@Log4j2
public class ReplyServiceImpl implements ReplyService{
    private final ReplyRepository replyRepository;

    @Override
    public Integer register(ReplyDTO replyDTO) {
        Reply reply = dtoToEntity(replyDTO);
        replyRepository.save(reply);
        return reply.getRNo();
    }

    @Override
    public List<ReplyDTO> getList(Integer bNo) {
        List<Reply> result = replyRepository.getReplyBoard(Board.builder().bNo(bNo).build());
        return result.stream().map(reply -> entityToDTO(reply)).collect(Collectors.toList());
    }

    @Override
    public void modify(ReplyDTO replyDTO) {
        Reply reply = dtoToEntity(replyDTO);
        replyRepository.save(reply);
    }

    @Override
    public void remove(Integer rNo) {
        replyRepository.deleteById(rNo);
    }
}
