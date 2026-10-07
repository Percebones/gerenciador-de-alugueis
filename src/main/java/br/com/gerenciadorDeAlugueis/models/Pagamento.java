package br.com.gerenciadorDeAlugueis.models;

import br.com.gerenciadorDeAlugueis.dto.PagamentoDto;
import jakarta.persistence.*;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.math.BigInteger;

@Getter
@Setter
@NoArgsConstructor
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

    @Column(name = "valor_pagamento", nullable = false)
    private BigInteger valorPagamento;

    public Pagamento(PagamentoDto pagamentoDto) {
        this.imovel = pagamentoDto.getImovel();
        this.mesPagamento = pagamentoDto.getMesPagamento();
        this.valorPagamento = pagamentoDto.getValorPagamento();
    }
}