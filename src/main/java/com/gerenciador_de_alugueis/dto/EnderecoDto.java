package com.gerenciador_de_alugueis.dto;

import com.gerenciador_de_alugueis.enumerators.Estados;
import com.gerenciador_de_alugueis.model.Imovel;

public class EnderecoDto {

    private int idEndereco;

    private Imovel imovel;

    private String cepImovel;

    private String ruaImovel;

    private String bairroImovel;

    private String cidadeImovel;

    private Estados estadoImovel;

    public EnderecoDto(Imovel imovel, String cepImovel, String ruaImovel, String bairroImovel, String cidadeImovel, Estados estadoImovel) {
        this.imovel = imovel;
        this.cepImovel = cepImovel;
        this.ruaImovel = ruaImovel;
        this.bairroImovel = bairroImovel;
        this.cidadeImovel = cidadeImovel;
        this.estadoImovel = estadoImovel;
    }

    public int getIdEndereco() {
        return idEndereco;
    }

    public Imovel getImovel() {
        return imovel;
    }

    public void setImovel(Imovel imovel) {
        this.imovel = imovel;
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
}
