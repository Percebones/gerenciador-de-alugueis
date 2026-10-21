package br.com.gerenciadorDeAlugueis.models;

import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.io.Serializable;
import java.math.BigDecimal;

@Getter
@Setter
@NoArgsConstructor
@Entity
@Table(name = "despesas")
public class Despesa implements Serializable {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id_despesa")
    private Long idDespesa;

    @JsonIgnore
    @ManyToOne(fetch = FetchType.LAZY, optional = false)
    @JoinColumn(name = "id_imovel", nullable = false)
    private Imovel imovel;

    @Column(name = "nome_despesa", nullable = false)
    private String nomeDespesa;

    @Column(name = "valor_despesa", nullable = false)
    private BigDecimal valorDespesa;

    public Despesa(
            Imovel imovel,
            String nomeDespesa,
            BigDecimal valorDespesa
    ) {
        this.imovel = imovel;
        this.nomeDespesa = nomeDespesa;
        this.valorDespesa = valorDespesa;
    }
}