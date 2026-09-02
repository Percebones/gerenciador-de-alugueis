package br.com.gerenciadorDeAlugueis.repositores;

import br.com.gerenciadorDeAlugueis.models.Imovel;

import java.util.Optional;

public interface ImovelRpo extends GenericRpo<Imovel> {

    boolean existsByNomeImovel(String nome);

    Optional<Imovel> findAllByIdImovel(int id);

    Imovel findByIdImovel(int id);
}
