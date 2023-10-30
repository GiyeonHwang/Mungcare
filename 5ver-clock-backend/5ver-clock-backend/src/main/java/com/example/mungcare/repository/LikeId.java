package com.example.mungcare.repository;

import com.example.mungcare.entity.Board;
import com.example.mungcare.entity.Member;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.io.Serializable;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class LikeId implements Serializable {
    private String id;
    private Integer bNo;
}
