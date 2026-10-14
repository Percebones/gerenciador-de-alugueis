package br.com.gerenciadorDeAlugueis.controllers;


import br.com.gerenciadorDeAlugueis.service.EnderecoService;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping(path = "/api/v1/endereco")
public class EnderecoController {

    private final EnderecoService enderecoService ;

    public EnderecoController(EnderecoService enderecoService) {
        this.enderecoService = enderecoService;
    }
}
