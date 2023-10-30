package com.example.mungcare;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.data.jpa.repository.config.EnableJpaAuditing;

@SpringBootApplication
@EnableJpaAuditing //AuditingEntityListener를 활성화시키기 위해서는 프로젝트에 이 어노테이션을 추가해야 한다.
public class MungcareApplication {

    public static void main(String[] args) {
        SpringApplication.run(MungcareApplication.class, args);
    }

}
