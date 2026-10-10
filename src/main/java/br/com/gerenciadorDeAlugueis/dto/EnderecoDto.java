package br.com.gerenciadorDeAlugueis.dto;

import br.com.gerenciadorDeAlugueis.enumerators.Estados;
import br.com.gerenciadorDeAlugueis.models.Imovel;

public record EnderecoDTO(
        Long idEndereco,
        Imovel imovel,
        String cepImovel,
        String ruaImovel,
        String bairroImovel,
        String cidadeImovel,
        Estados estadoImovel
) {
}






