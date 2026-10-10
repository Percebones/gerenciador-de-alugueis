package br.com.gerenciadorDeAlugueis.repositores;

import br.com.gerenciadorDeAlugueis.models.Endereco;
import org.springframework.stereotype.Repository;

@Repository
public interface EnderecoRPO extends GenericRPO<Endereco> {

    boolean existsByCepImovel(String cep);

}
