package com.gerenciador_de_alugueis.dto;

import com.gerenciador_de_alugueis.model.Imovel;


import java.math.BigInteger;

public class PagamentoDto {

    private int idPagamento;

    private Imovel imovel;

    private String mesPagamento;

    private BigInteger valorPagamento;


    public PagamentoDto(Imovel imovel, String mesPagamento, BigInteger valorPagamento) {
        this.imovel = imovel;
        this.mesPagamento = mesPagamento;
        this.valorPagamento = valorPagamento;
    }

    public int getIdPagamento() {
        return idPagamento;
    }

    public String getMesPagamento() {
        return mesPagamento;
    }

    public void setMesPagamento(String mesPagamento) {
        this.mesPagamento = mesPagamento;
    }

    public Imovel getImovel() {
        return imovel;
    }

    public void setImovel(Imovel imovel) {
        this.imovel = imovel;
    }

    public BigInteger getValorPagamento() {
        return valorPagamento;
    }

    public void setValorPagamento(BigInteger valorPagamento) {
        this.valorPagamento = valorPagamento;
    }
}
