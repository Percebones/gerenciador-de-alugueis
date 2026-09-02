package br.com.gerenciadorDeAlugueis.repositores;

import br.com.gerenciadorDeAlugueis.models.Endereco;

public interface EnderecoRpo extends GenericRpo<Endereco> {

    boolean existsByCepImovel(String cep);

}
