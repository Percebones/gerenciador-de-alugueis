package br.com.gerenciadorDeAlugueis.dto;

import java.math.BigInteger;

import br.com.gerenciadorDeAlugueis.models.Imovel;

public class DespesaDto {

    private int idDespesa;

    private Imovel imovel;

    private BigInteger iptuImovel;

    public DespesaDto() {
    }

    public DespesaDto(Imovel imovel, BigInteger iptuImovel) {
        this.imovel = imovel;
        this.iptuImovel = iptuImovel;
    }

    public Imovel getImovel() {
        return imovel;
    }

    public void setImovel(Imovel imovel) {
        this.imovel = imovel;
    }

    public int getIdDespesa() {
        return idDespesa;
    }

    public BigInteger getIptuImovel() {
        return iptuImovel;
    }

    public void setIptuImovel(BigInteger iptuImovel) {
        this.iptuImovel = iptuImovel;
    }
}
