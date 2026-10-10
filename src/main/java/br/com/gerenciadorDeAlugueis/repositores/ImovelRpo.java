package br.com.gerenciadorDeAlugueis.repositores;

import br.com.gerenciadorDeAlugueis.models.Imovel;
import org.springframework.data.jpa.repository.EntityGraph;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface ImovelRPO extends GenericRPO<Imovel> {

    @Override
    @EntityGraph(attributePaths = {"endereco", "listaDespesas"})
    List<Imovel> findAll();

    @Override
    @EntityGraph(attributePaths = {"endereco", "listaDespesas"})
    Optional<Imovel> findById(Long id);
}
