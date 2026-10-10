package br.com.gerenciadorDeAlugueis.repositores;


import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.repository.NoRepositoryBean;

@NoRepositoryBean
public interface GenericRPO<Entidade> extends JpaRepository<Entidade, Long> {
}
