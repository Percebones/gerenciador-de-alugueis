package br.com.gerenciadorDeAlugueis.models;

import br.com.gerenciadorDeAlugueis.dto.PagamentoDTO;
import jakarta.persistence.*;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.io.Serializable;
import java.math.BigInteger;

@Getter
@Setter
@NoArgsConstructor
@Entity
@Table(name = "pagamentos")
public class Pagamento implements Serializable {

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

    public Pagamento(PagamentoDTO pagamentoDto) {
        this.imovel = pagamentoDto.imovel();
        this.mesPagamento = pagamentoDto.mesPagamento();
        this.valorPagamento = pagamentoDto.valorPagamento();
    }
}