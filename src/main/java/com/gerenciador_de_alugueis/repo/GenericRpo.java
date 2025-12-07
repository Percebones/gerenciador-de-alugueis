package com.gerenciador_de_alugueis.repo;


import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.repository.NoRepositoryBean;

@NoRepositoryBean
public interface GenericRpo<Entidade> extends JpaRepository<Entidade, Long> {
}
