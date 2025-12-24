package com.gerenciador_de_alugueis.repo;

import com.gerenciador_de_alugueis.model.Imovel;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface ImovelRpo extends GenericRpo<Imovel> {

    boolean existsByNomeImovel(String nome);

    Optional<Imovel> findAllByIdImovel(int id);

    Imovel findByIdImovel(int id);
}
