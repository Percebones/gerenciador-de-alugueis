package com.gerenciador_de_alugueis.service;

import com.gerenciador_de_alugueis.dto.ImovelDto;
import com.gerenciador_de_alugueis.model.Imovel;
import com.gerenciador_de_alugueis.repo.ImovelRpo;
import org.springframework.stereotype.Service;

@Service
public class ImovelService {


    private final ImovelRpo imovelRpo;

    public ImovelService(ImovelRpo imovelRpo) {
        this.imovelRpo = imovelRpo;
    }

    public Iterable<Imovel> getAllImoveis() {
        return imovelRpo.findAll();
    }

    public Imovel getImovelById(int id) {
        return imovelRpo.findByIdImovel(id);
    }

    public void delImovel(Imovel imovel) {
    }

    public Imovel cadastroImovel(Imovel imovel) throws Exception {
        if (imovelRpo.existsByCepImovel(imovel.getCepImovel())) {
            throw new Exception(" CEP já cadastrado.");
        }
        try {
            return imovelRpo.save(imovel);
        } catch (Exception e) {
            throw new Exception(" Tipo de dado invalido ou fora de ordem");

        }
    }


    public Imovel atualizarImovel(ImovelDto dto) {

        Imovel imovel = imovelRpo.findById((long) dto.getIdImovel())
                .orElseThrow(() -> new RuntimeException("Imóvel não encontrado"));

        imovel.setNomeImovel(dto.getNomeImovel());
        imovel.setCepImovel(dto.getCepImovel());
        imovel.setRuaImovel(dto.getRuaImovel());
        imovel.setBairroImovel(dto.getBairroImovel());
        imovel.setCidadeImovel(dto.getCidadeImovel());
        imovel.setEstadoImovel(dto.getEstadoImovel());
        imovel.setValorAluguelImovel(dto.getValorAluguelImovel());
        imovel.setValor_imovel(dto.getValor_imovel());
        imovel.setStatusImovel(dto.getStatusImovel());

        return imovelRpo.save(imovel);
    }


    public void deletarPorId(Long id) throws Exception {
        if (!imovelRpo.existsById(id)) {
            throw new Exception("Imóvel não encontrado com ID: " + id);
        }
        imovelRpo.deleteById(id);
    }
}
