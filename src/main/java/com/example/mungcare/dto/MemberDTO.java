package com.example.mungcare.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Builder
@NoArgsConstructor
@AllArgsConstructor
@Data
public class MemberDTO {

    private String id;
    private String pw;
    private String name;
    private String nickname;
    private String phone;
    private String address;
    private String detail_Address;
    private String location_Num;
}
