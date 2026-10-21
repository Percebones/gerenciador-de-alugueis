package br.com.gerenciadorDeAlugueis.dto;

import br.com.gerenciadorDeAlugueis.enumerators.Status;
import br.com.gerenciadorDeAlugueis.models.Despesa;
import br.com.gerenciadorDeAlugueis.models.Endereco;

import java.math.BigDecimal;
import java.math.BigInteger;
import java.util.List;

public record ImovelDTO(
        Long idImovel,
        String nomeImovel,
        Status statusImovel,
        BigDecimal valorAluguelImovel,
        BigDecimal valor_imovel,
        Endereco endereco,
        List<Despesa> listaDespesas
) {}
