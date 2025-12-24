package com.gerenciador_de_alugueis.dto;

import com.gerenciador_de_alugueis.enumerators.Estados;
import com.gerenciador_de_alugueis.enumerators.Status;
import com.gerenciador_de_alugueis.model.Endereco;

import java.math.BigInteger;

public class ImovelDto {
    private int idImovel;
    private String nomeImovel;
    private Status statusImovel;
    private BigInteger valorAluguelImovel;
    private BigInteger valor_imovel;
    private Endereco endereco;

    public ImovelDto() {
    }

    public ImovelDto(String nomeImovel, String cepImovel, String ruaImovel, String bairroImovel, String cidadeImovel, Estados estadoImovel, Status statusImovel, BigInteger valorAluguelImovel, BigInteger valor_imovel,Endereco endereco) {
        this.nomeImovel = nomeImovel;
        this.statusImovel = statusImovel;
        this.valorAluguelImovel = valorAluguelImovel;
        this.valor_imovel = valor_imovel;
        this.endereco = endereco;
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

    public int getIdImovel() {
        return idImovel;
    }

    public Endereco getEndereco() {
        return endereco;
    }

    public void setEndereco(Endereco endereco) {
        this.endereco = endereco;
    }
}
