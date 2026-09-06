package br.com.gerenciadorDeAlugueis.models;

import com.fasterxml.jackson.annotation.JsonIgnore;

import br.com.gerenciadorDeAlugueis.dto.EnderecoDto;
import br.com.gerenciadorDeAlugueis.enumerators.Estados;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.EnumType;
import jakarta.persistence.Enumerated;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.OneToOne;
import jakarta.persistence.Table;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@Entity
@Table(name = "enderecos")
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

	public Endereco(EnderecoDto enderecoDto) {
		this.cepImovel = enderecoDto.getCepImovel();
		this.ruaImovel = enderecoDto.getRuaImovel();
		this.bairroImovel = enderecoDto.getBairroImovel();
		this.cidadeImovel = enderecoDto.getCidadeImovel();
		this.estadoImovel = enderecoDto.getEstadoImovel();
	}

}
