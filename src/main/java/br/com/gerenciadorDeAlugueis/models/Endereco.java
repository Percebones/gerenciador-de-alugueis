package br.com.gerenciadorDeAlugueis.models;

import com.fasterxml.jackson.annotation.JsonIgnore;

import br.com.gerenciadorDeAlugueis.dto.EnderecoDto;
import br.com.gerenciadorDeAlugueis.enumerators.Estados;
import jakarta.persistence.*;

@Entity
@Table(name = "endereco")
public class Endereco {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id_endereco")
    private Long idEndereco;

    @OneToOne(mappedBy = "endereco")
    @JsonIgnore
    private Imovel imovel;

    @Column(name = "cep_imovel", nullable = false)
    private String cepImovel;

    @Column(name = "rua_imovel", nullable = false)
    private String ruaImovel;

    @Column(name = "bairro_imovel")
    private String bairroImovel;

    @Column(name = "cidade_imovel")
    private String cidadeImovel;

    @Column(name = "estado_imovel", nullable = false)
    @Enumerated(EnumType.STRING)
    private Estados estadoImovel;

    public Endereco() {
    }

    public Endereco(EnderecoDto enderecoDto) {
        this.cepImovel = enderecoDto.getCepImovel();
        this.ruaImovel = enderecoDto.getRuaImovel();
        this.bairroImovel = enderecoDto.getBairroImovel();
        this.cidadeImovel = enderecoDto.getCidadeImovel();
        this.estadoImovel = enderecoDto.getEstadoImovel();
    }

    public Long getIdEndereco() {
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
