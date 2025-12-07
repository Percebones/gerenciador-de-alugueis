package com.gerenciador_de_alugueis.service;

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

    public void deletarPorId(Long id) throws Exception {
        if (!imovelRpo.existsById(id)) {
            throw new Exception("Imóvel não encontrado com ID: " + id);
        }
        imovelRpo.deleteById(id);
    }
}
