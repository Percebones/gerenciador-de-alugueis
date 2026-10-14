package br.com.gerenciadorDeAlugueis.service;

import br.com.gerenciadorDeAlugueis.repositores.EnderecoRPO;
import org.springframework.stereotype.Service;

@Service
public class EnderecoService {
    private final EnderecoRPO enderecoRPO;

    public EnderecoService(EnderecoRPO enderecoRPO) {
        this.enderecoRPO = enderecoRPO;
    }

}
