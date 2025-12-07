package com.gerenciador_de_alugueis.config;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.web.SecurityFilterChain;

@Configuration
public class SecurityConfig {

    @Bean
    public SecurityFilterChain filterChain(HttpSecurity http) throws Exception {
        http
                .csrf(csrf -> csrf.disable())               // desabilita CSRF
                .authorizeHttpRequests(auth -> auth
                        .anyRequest().permitAll()               // libera todos os endpoints
                )
                .httpBasic(httpBasic -> httpBasic.disable()) // desabilita autenticação HTTP básica
                .formLogin(form -> form.disable());         // desabilita formulário de login

        return http.build();
    }
}
