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

    @Column(name = "nome_imovel",nullable = false)
    private String nomeImovel;

    @Column(name = "cep_imovel",nullable = false)
    private String cepImovel;

    @Column(name = "rua_imovel",nullable = false)
    private String ruaImovel;

    @Column(name = "bairro_imovel")
    private String bairroImovel;

    @Column(name = "cidade_imovel")
    private String cidadeImovel;

    @Column(name = "estado_imovel", nullable = false)
    @Enumerated(EnumType.STRING)
    private Estados estadoImovel;

    @Column(name = "status_imovel", nullable = false)
    @Enumerated(EnumType.STRING)
    private Status statusImovel;

    @Column(name = "valor_aluguel")
    private BigInteger valorAluguelImovel;

    @Column(name = "valor_imovel")
    private BigInteger valor_imovel;

    public Imovel(){
    }

    public Imovel(ImovelDto imovelDto) {
        this.nomeImovel = imovelDto.getNomeImovel();
        this.cepImovel = imovelDto.getCepImovel();
        this.ruaImovel = imovelDto.getRuaImovel();
        this.bairroImovel = imovelDto.getBairroImovel();
        this.cidadeImovel = imovelDto.getCidadeImovel();
        this.estadoImovel = imovelDto.getEstadoImovel();
        this.statusImovel = imovelDto.getStatusImovel();
        this.valorAluguelImovel = imovelDto.getValorAluguelImovel();
        this.valor_imovel = imovelDto.getValor_imovel();
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

    public String getCepImovel() {
        return cepImovel;
    }

    public void setCepImovel(String cepImovel) {
        this.cepImovel = cepImovel;
    }

    public String getRuaImovel() {
        return ruaImovel;
    }

    public void setRuaImovel(String ruaImovel) {
        this.ruaImovel = ruaImovel;
    }

    public String getBairroImovel() {
        return bairroImovel;
    }

    public void setBairroImovel(String bairroImovel) {
        this.bairroImovel = bairroImovel;
    }

    public String getCidadeImovel() {
        return cidadeImovel;
    }

    public void setCidadeImovel(String cidadeImovel) {
        this.cidadeImovel = cidadeImovel;
    }

    public Estados getEstadoImovel() {
        return estadoImovel;
    }

    public void setEstadoImovel(Estados estadoImovel) {
        this.estadoImovel = estadoImovel;
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
}
