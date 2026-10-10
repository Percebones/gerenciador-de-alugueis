package br.com.gerenciadorDeAlugueis.service;

import br.com.gerenciadorDeAlugueis.repositores.DespesaRPO;
import org.springframework.stereotype.Service;

@Service
public class DespesaService {
    private final DespesaRPO despesaRPO;

    public DespesaService(DespesaRPO despesaRPO) {
        this.despesaRPO = despesaRPO;
    }

}
