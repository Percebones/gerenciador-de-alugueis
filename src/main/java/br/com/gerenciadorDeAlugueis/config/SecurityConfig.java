package br.com.gerenciadorDeAlugueis.config;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configurers.AbstractHttpConfigurer;
import org.springframework.security.web.SecurityFilterChain;

@Configuration
public class SecurityConfig {

    @Bean
    public SecurityFilterChain filterChain(HttpSecurity http) throws Exception {
        http
                .csrf(AbstractHttpConfigurer::disable)               // desabilita CSRF
                .authorizeHttpRequests(auth -> auth
                        .anyRequest().permitAll()               // libera todos os endpoints
                )
                .httpBasic(AbstractHttpConfigurer::disable) // desabilita autenticação HTTP básica
                .formLogin(AbstractHttpConfigurer::disable);         // desabilita formulário de login

        return http.build();
    }
}
