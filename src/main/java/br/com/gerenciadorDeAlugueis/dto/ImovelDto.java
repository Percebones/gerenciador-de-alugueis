package br.com.gerenciadorDeAlugueis.dto;

import br.com.gerenciadorDeAlugueis.enumerators.Status;
import br.com.gerenciadorDeAlugueis.models.Despesa;
import br.com.gerenciadorDeAlugueis.models.Endereco;

import java.math.BigInteger;
import java.util.List;

public record ImovelDto(
        Long idImovel,
        String nomeImovel,
        Status statusImovel,
        BigInteger valorAluguelImovel,
        BigInteger valor_imovel,
        Endereco endereco,
        List<Despesa> listaDespesas
) {}
