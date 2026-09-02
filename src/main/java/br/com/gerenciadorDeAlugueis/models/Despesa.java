package br.com.gerenciadorDeAlugueis.models;

import java.math.BigInteger;

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
@Table(name = "despesas")
public class Despesa {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id_despesa")
    private Long idDespesa;

    @ManyToOne(fetch = FetchType.LAZY, optional = false)
    @JoinColumn(name = "id_imovel", nullable = false)
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

    public Long getIdDespesa() {
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
