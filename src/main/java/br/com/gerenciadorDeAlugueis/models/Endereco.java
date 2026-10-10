package br.com.gerenciadorDeAlugueis.models;

import br.com.gerenciadorDeAlugueis.dto.EnderecoDTO;
import br.com.gerenciadorDeAlugueis.enumerators.Estados;
import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.io.Serializable;

@Getter
@Setter
@NoArgsConstructor
@Entity
@Table(name = "enderecos")
public class Endereco implements Serializable {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id_endereco", nullable = false)
    private Long idEndereco;

    @JsonIgnore
    @OneToOne(mappedBy = "endereco")
    private Imovel imovel;

    @Column(name = "cep_imovel", nullable = false)
    private String cepImovel;

    @Column(name = "rua_imovel", nullable = false)
    private String ruaImovel;

    @Column(name = "bairro_imovel", nullable = false)
    private String bairroImovel;

    @Column(name = "cidade_imovel", nullable = false)
    private String cidadeImovel;

    @Enumerated(EnumType.STRING)
    @Column(name = "estado_imovel", nullable = false)
    private Estados estadoImovel;

    public Endereco(EnderecoDTO enderecoDto) {
        this.cepImovel = enderecoDto.cepImovel();
        this.ruaImovel = enderecoDto.ruaImovel();
        this.bairroImovel = enderecoDto.bairroImovel();
        this.cidadeImovel = enderecoDto.cidadeImovel();
        this.estadoImovel = enderecoDto.estadoImovel();
    }
}