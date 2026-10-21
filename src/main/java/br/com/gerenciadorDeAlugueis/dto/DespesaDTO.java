package br.com.gerenciadorDeAlugueis.dto;

import br.com.gerenciadorDeAlugueis.models.Imovel;

import java.math.BigDecimal;
import java.math.BigInteger;

public record DespesaDTO(

        Long idDespesa,
        Long idImovel,
        String nomeDespesa,
        BigDecimal valorDespesa
        ) {


}
