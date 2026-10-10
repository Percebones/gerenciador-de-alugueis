package br.com.gerenciadorDeAlugueis.dto;

import br.com.gerenciadorDeAlugueis.models.Imovel;

import java.math.BigInteger;

public record PagamentoDTO(

        Long idPagamento,
        Imovel imovel,
        String mesPagamento,
        BigInteger valorPagamento
) { }
