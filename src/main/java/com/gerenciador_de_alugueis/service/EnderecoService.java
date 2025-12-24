package com.gerenciador_de_alugueis.service;

import com.gerenciador_de_alugueis.model.Endereco;
import com.gerenciador_de_alugueis.model.Imovel;
import com.gerenciador_de_alugueis.repo.EnderecoRpo;

public class EnderecoService {

    private final EnderecoRpo enderecoRpo;

    public EnderecoService(EnderecoRpo enderecoRpo) {
        this.enderecoRpo = enderecoRpo;
    }


    public Endereco cadastroEndereco(Endereco endereco) throws Exception {
        try {
            return enderecoRpo.save(endereco);
        } catch (Exception e) {
            e.printStackTrace();
            throw new Exception(" Tipo de dado invalido ou fora de ordem");

        }
    }
}
