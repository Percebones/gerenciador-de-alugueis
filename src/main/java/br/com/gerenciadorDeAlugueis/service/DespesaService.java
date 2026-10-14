package br.com.gerenciadorDeAlugueis.service;

import br.com.gerenciadorDeAlugueis.models.Despesa;
import br.com.gerenciadorDeAlugueis.repositores.DespesaRPO;
import org.springframework.stereotype.Service;

@Service
public class DespesaService {
    private final DespesaRPO despesaRPO;

    public DespesaService(DespesaRPO despesaRPO) {
        this.despesaRPO = despesaRPO;
    }

    public void cadDespesa(Despesa despesa) {
        despesaRPO.save(despesa);
    }

    public void deleteDespesa(Long idDespesa) {
        despesaRPO.deleteById(idDespesa);
    }
}
