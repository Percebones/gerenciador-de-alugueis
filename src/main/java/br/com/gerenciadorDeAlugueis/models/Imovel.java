package br.com.gerenciadorDeAlugueis.models;

import br.com.gerenciadorDeAlugueis.dto.ImovelDto;
import br.com.gerenciadorDeAlugueis.enumerators.Status;
import jakarta.persistence.*;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.math.BigInteger;
import java.util.ArrayList;
import java.util.List;

@Data
@NoArgsConstructor
@Entity
@Table(name = "imoveis")
public class Imovel {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id_imovel")
    private Long idImovel;

    @Column(name = "nome_imovel", nullable = false)
    private String nomeImovel;

    @Enumerated(EnumType.STRING)
    @Column(name = "status_imovel", nullable = false)
    private Status statusImovel;

    @Column(name = "valor_aluguel")
    private BigInteger valorAluguelImovel;

    @Column(name = "valor_imovel")
    private BigInteger valor_imovel;

    @OneToOne(cascade = CascadeType.ALL)
    @JoinColumn(
            name = "id_endereco",
            referencedColumnName = "id_endereco",
            unique = true
    )
    private Endereco endereco;

    @OneToMany(
            mappedBy = "imovel",
            cascade = CascadeType.ALL
    )
    private List<Despesa> listaDespesas = new ArrayList<>();

    public Imovel(ImovelDto imovelDto) {
        this.nomeImovel = imovelDto.nomeImovel();
        this.statusImovel = imovelDto.statusImovel();
        this.valorAluguelImovel = imovelDto.valorAluguelImovel();
        this.valor_imovel = imovelDto.valor_imovel();

        if (imovelDto.listaDespesas() != null) {
            this.listaDespesas = imovelDto.listaDespesas();
        }

        if (imovelDto.endereco() != null) {
            this.endereco = imovelDto.endereco();
        }
    }

}