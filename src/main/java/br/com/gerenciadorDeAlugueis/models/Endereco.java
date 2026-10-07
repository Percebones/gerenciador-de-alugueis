package br.com.gerenciadorDeAlugueis.models;

import br.com.gerenciadorDeAlugueis.dto.EnderecoDto;
import br.com.gerenciadorDeAlugueis.enumerators.Estados;
import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
@Entity
@Table(name = "enderecos")
public class Endereco {

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

    public Endereco(EnderecoDto enderecoDto) {
        this.cepImovel = enderecoDto.getCepImovel();
        this.ruaImovel = enderecoDto.getRuaImovel();
        this.bairroImovel = enderecoDto.getBairroImovel();
        this.cidadeImovel = enderecoDto.getCidadeImovel();
        this.estadoImovel = enderecoDto.getEstadoImovel();
    }
}