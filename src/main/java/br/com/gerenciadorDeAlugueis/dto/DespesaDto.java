package br.com.gerenciadorDeAlugueis.dto;

import br.com.gerenciadorDeAlugueis.models.Imovel;

import java.math.BigInteger;

public record DespesaDTO(

        Long idDespesa,
        Imovel imovel,
        String nomeDespesa,
        BigInteger valorDespesa
        ) {


}
