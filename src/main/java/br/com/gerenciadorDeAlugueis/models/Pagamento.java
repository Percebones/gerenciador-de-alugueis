package br.com.gerenciadorDeAlugueis.models;

import com.fasterxml.jackson.annotation.JsonIgnore;

import br.com.gerenciadorDeAlugueis.dto.PagamentoDto;
import jakarta.persistence.*;

import java.math.BigInteger;

@Entity
@Table(name = "pagamento")
public class Pagamento {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id_pagamento")
    private Long idPagamento;

    @OneToOne(cascade = CascadeType.ALL)
    @JsonIgnore
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
