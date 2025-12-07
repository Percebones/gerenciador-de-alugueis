package com.gerenciador_de_alugueis.dto;

import com.gerenciador_de_alugueis.enumerators.Estados;
import com.gerenciador_de_alugueis.enumerators.Status;

import java.math.BigInteger;

public class ImovelDto {
    private String nomeImovel;
    private String cepImovel;
    private String ruaImovel;
    private String bairroImovel;
    private String cidadeImovel;
    private Estados estadoImovel;
    private Status statusImovel;
    private BigInteger valorAluguelImovel;
    private BigInteger valor_imovel;



    public ImovelDto(String nomeImovel, String cepImovel, String ruaImovel, String bairroImovel, String cidadeImovel, Estados estadoImovel, Status statusImovel,BigInteger valorAluguelImovel,BigInteger valor_imovel) {
        this.nomeImovel = nomeImovel;
        this.cepImovel = cepImovel;
        this.ruaImovel = ruaImovel;
        this.bairroImovel = bairroImovel;
        this.cidadeImovel = cidadeImovel;
        this.estadoImovel = estadoImovel;
        this.statusImovel = statusImovel;
        this.valorAluguelImovel = valorAluguelImovel;
        this.valor_imovel = valor_imovel;
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
