package com.gerenciador_de_alugueis.repo;

import com.gerenciador_de_alugueis.model.Endereco;
import org.springframework.stereotype.Repository;

@Repository
public interface EnderecoRpo extends GenericRpo<Endereco>{

    boolean existsByCepImovel(String cep);

}
