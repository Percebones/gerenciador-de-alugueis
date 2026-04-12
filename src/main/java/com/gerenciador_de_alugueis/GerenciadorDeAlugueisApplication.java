package com.gerenciador_de_alugueis;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
//import org.springframework.boot.persistence.autoconfigure.EntityScan;
import org.springframework.data.jpa.repository.config.EnableJpaRepositories;

@SpringBootApplication
//@EntityScan("com.gerenciador_de_alugueis.model")
@EnableJpaRepositories("com.gerenciador_de_alugueis.repo")
public class GerenciadorDeAlugueisApplication {

    public static void main(String[] args) {
        SpringApplication.run(GerenciadorDeAlugueisApplication.class, args);
    }

}
