package br.com.gerenciadorDeAlugueis;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

@SpringBootApplication(scanBasePackages = "br.com")
public class GerenciadorDeAlugueisApplication {

    public static void main(String[] args) {
        SpringApplication.run(GerenciadorDeAlugueisApplication.class, args);
    }

}
