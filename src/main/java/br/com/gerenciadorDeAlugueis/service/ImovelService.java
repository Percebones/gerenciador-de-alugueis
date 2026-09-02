package br.com.gerenciadorDeAlugueis.service;

import org.springframework.lang.NonNull;
import org.springframework.stereotype.Service;

import br.com.gerenciadorDeAlugueis.dto.ImovelDto;
import br.com.gerenciadorDeAlugueis.models.Imovel;
import br.com.gerenciadorDeAlugueis.repositores.DespesaRpo;
import br.com.gerenciadorDeAlugueis.repositores.EnderecoRpo;
import br.com.gerenciadorDeAlugueis.repositores.ImovelRpo;

@Service
public class ImovelService {

	private final ImovelRpo imovelRpo;
	private final EnderecoRpo enderecoRpo;

	public ImovelService(ImovelRpo imovelRpo, EnderecoRpo enderecoRpo, DespesaRpo despesaRpo) {
		this.imovelRpo = imovelRpo;
		this.enderecoRpo = enderecoRpo;
	}

	public Iterable<Imovel> getAllImoveis() {
		return imovelRpo.findAll();
	}

	public Imovel getImovelById(int id) {
		return imovelRpo.findByIdImovel(id);
	}

	public Imovel cadastroImovel(@NonNull Imovel imovel) throws Exception {
		try {
			if (enderecoRpo.existsByCepImovel(imovel.getEndereco().getCepImovel())) {
				throw new Exception(" CEP já cadastrado.");
			}
			return imovelRpo.save(imovel);
		} catch (Exception e) {
			e.printStackTrace();
			throw new Exception(e.getMessage());
		}
	}

	public Imovel atualizarImovel(@NonNull ImovelDto dto) throws Exception {
		try {
			Imovel imovel = imovelRpo.findById((long) dto.getIdImovel())
					.orElseThrow(() -> new RuntimeException("Imóvel não encontrado"));

			imovel.setNomeImovel(dto.getNomeImovel());
			imovel.getEndereco().setCepImovel(dto.getEndereco().getCepImovel());
			imovel.getEndereco().setRuaImovel(dto.getEndereco().getRuaImovel());
			imovel.getEndereco().setBairroImovel(dto.getEndereco().getBairroImovel());
			imovel.getEndereco().setCidadeImovel(dto.getEndereco().getCidadeImovel());
			imovel.getEndereco().setEstadoImovel(dto.getEndereco().getEstadoImovel());
			imovel.setValorAluguelImovel(dto.getValorAluguelImovel());
			imovel.setValor_imovel(dto.getValor_imovel());
			imovel.setStatusImovel(dto.getStatusImovel());

			return imovelRpo.save(imovel);
		} catch (Exception e) {
			throw new Exception("Falha ao Atulizar Imovel");
		}

	}

	public void deletarPorId(@NonNull Long id) throws Exception {
		try {
			if (!imovelRpo.existsById(id)) {
				throw new Exception("Imóvel não encontrado com ID: " + id);
			}
			imovelRpo.deleteById(id);
		} catch (Exception e) {
			throw new Exception(e.getMessage());
		}

	}
}
