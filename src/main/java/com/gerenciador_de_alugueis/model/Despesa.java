package com.gerenciador_de_alugueis.model;

import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;

import java.math.BigInteger;

@Entity
@Table(name = "despesa")
public class Despesa {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id_despesa")
    private int idDespesa;

    @OneToOne(mappedBy = "despesa")
    @JsonIgnore
    private Imovel imovel;

    @Column(name = "iptu_imovel")
    private BigInteger iptuImovel;

    @Column(name = "condominio_imovel")
    private BigInteger condominio;

    public Despesa() {
    }

    public Despesa(Imovel imovel, BigInteger iptuImovel, BigInteger condominio) {
        this.imovel = imovel;
        this.iptuImovel = iptuImovel;
        this.condominio = condominio;
    }

    public int getIdDespesa() {
        return idDespesa;
    }

    public Imovel getImovel() {
        return imovel;
    }

    public void setImovel(Imovel imovel) {
        this.imovel = imovel;
    }

    public BigInteger getIptuImovel() {
        return iptuImovel;
    }

    public void setIptuImovel(BigInteger iptuImovel) {
        this.iptuImovel = iptuImovel;
    }

    public BigInteger getCondominio() {
        return condominio;
    }

    public void setCondominio(BigInteger condominio) {
        this.condominio = condominio;
    }
}
