package br.com.gerenciadorDeAlugueis.service;

import br.com.gerenciadorDeAlugueis.models.Imovel;
import br.com.gerenciadorDeAlugueis.repositores.ImovelRPO;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.Optional;

@Service
public class ImovelService {
    private final ImovelRPO imovelRPO;

    public ImovelService(ImovelRPO imovelRPO) {
        this.imovelRPO = imovelRPO;
    }

    public void save(Imovel imovel) {
        imovelRPO.save(imovel);
    }

    public void deleteById(Long id) {
        imovelRPO.deleteById(id);
    }

    public Optional<Imovel> findById(Long id) {
        return imovelRPO.findById(id);
    }

    @Transactional(readOnly = true)
    public List<Imovel> findAll() {
        return imovelRPO.findAll();
    }
}
