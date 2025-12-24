package com.gerenciador_de_alugueis.model;

import com.gerenciador_de_alugueis.dto.ImovelDto;
import com.gerenciador_de_alugueis.enumerators.Estados;
import com.gerenciador_de_alugueis.enumerators.Status;
import jakarta.persistence.*;

import java.math.BigInteger;

@Entity
@Table(name = "imovel")
public class Imovel {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id_imovel")
    private int idImovel;

    @Column(name = "nome_imovel", nullable = false)
    private String nomeImovel;

    @Column(name = "status_imovel", nullable = false)
    @Enumerated(EnumType.STRING)
    private Status statusImovel;

    @Column(name = "valor_aluguel")
    private BigInteger valorAluguelImovel;

    @Column(name = "valor_imovel")
    private BigInteger valor_imovel;

    @OneToOne(cascade = CascadeType.ALL)
    @JoinColumn(name = "id_endereco")
    private Endereco endereco;

    @OneToOne(cascade = CascadeType.ALL)
    @JoinColumn(name = "id_despesa")
    private Despesa despesa;

    public Imovel() {
    }

    public Imovel(ImovelDto imovelDto) {
        this.nomeImovel = imovelDto.getNomeImovel();
        this.statusImovel = imovelDto.getStatusImovel();
        this.valorAluguelImovel = imovelDto.getValorAluguelImovel();
        this.valor_imovel = imovelDto.getValor_imovel();
        this.endereco = imovelDto.getEndereco();
    }

    public int getIdImovel() {
        return idImovel;
    }

    public String getNomeImovel() {
        return nomeImovel;
    }

    public void setNomeImovel(String nomeImovel) {
        this.nomeImovel = nomeImovel;
    }

    public Status getStatusImovel() {
        return statusImovel;
    }

    public void setStatusImovel(Status statusImovel) {
        this.statusImovel = statusImovel;
    }

    public BigInteger getValorAluguelImovel() {
        return valorAluguelImovel;
    }

    public void setValorAluguelImovel(BigInteger valorAluguelImovel) {
        this.valorAluguelImovel = valorAluguelImovel;
    }

    public BigInteger getValor_imovel() {
        return valor_imovel;
    }

    public void setValor_imovel(BigInteger valor_imovel) {
        this.valor_imovel = valor_imovel;
    }

    public Endereco getEndereco() {
        return endereco;
    }

    public void setEndereco(Endereco endereco) {
        this.endereco = endereco;
    }

    public Despesa getDespesa() {
        return despesa;
    }

    public void setDespesa(Despesa despesa) {
        this.despesa = despesa;
    }
}

