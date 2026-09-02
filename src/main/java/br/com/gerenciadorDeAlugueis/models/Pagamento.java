package br.com.gerenciadorDeAlugueis.models;

import java.math.BigInteger;

import br.com.gerenciadorDeAlugueis.dto.PagamentoDto;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.FetchType;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.Table;

@Entity
@Table(name = "pagamentos")
public class Pagamento {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id_pagamento")
    private Long idPagamento;
   
    @ManyToOne(fetch = FetchType.LAZY, optional = false)
    @JoinColumn(name = "id_imovel", nullable = false)
    private Imovel imovel;

    @Column(name = "mes_pagamento", nullable = false)
    private String mesPagamento;

    @Column(name = "valor_pagamento")
    private BigInteger valorPagamento;

    public Pagamento() {
    }

    public Pagamento(PagamentoDto pagamentoDto) {
        this.imovel = pagamentoDto.getImovel();
        this.mesPagamento = pagamentoDto.getMesPagamento();
        this.valorPagamento = pagamentoDto.getValorPagamento();
    }

    public Long getIdPagamento() {
        return idPagamento;
    }

    public Imovel getImovel() {
        return imovel;
    }

    public void setImovel(Imovel imovel) {
        this.imovel = imovel;
    }

    public String getMesPagamento() {
        return mesPagamento;
    }

    public void setMesPagamento(String mesPagamento) {
        this.mesPagamento = mesPagamento;
    }

    public BigInteger getValorPagamento() {
        return valorPagamento;
    }

    public void setValorPagamento(BigInteger valorPagamento) {
        this.valorPagamento = valorPagamento;
    }
}
