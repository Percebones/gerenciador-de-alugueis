package br.com.gerenciadorDeAlugueis.controllers;


import br.com.gerenciadorDeAlugueis.dto.ImovelDTO;
import br.com.gerenciadorDeAlugueis.exceptions.GerenciadorException;
import br.com.gerenciadorDeAlugueis.models.Imovel;
import br.com.gerenciadorDeAlugueis.service.ImovelService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.lang.NonNull;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping(path = "/api/v1/imovel")
public class ImovelController {

    private final ImovelService imovelService;

    public ImovelController(ImovelService imovelService) {
        this.imovelService = imovelService;
    }

    @GetMapping
    public String respostaPadrao() {
        return "Endpoint de imóveis funcionando!";
    }

    @PostMapping(path = "/cadastroImovel")
    public ResponseEntity<String> CadImovel(@RequestBody ImovelDTO imovelDto) {
        try {
            Imovel imovel = new Imovel();
            imovel.setNomeImovel(imovelDto.nomeImovel());
            imovel.setValorAluguelImovel(imovelDto.valorAluguelImovel());
            imovel.setStatusImovel(imovelDto.statusImovel());
            imovel.setValor_imovel(imovelDto.valor_imovel());
            imovel.setEndereco(imovelDto.endereco());
            imovel.setListaDespesas(imovelDto.listaDespesas());

            imovelService.save(imovel);
            return new ResponseEntity<>("Imovel cadastrado com sucesso", HttpStatus.CREATED);
        } catch (GerenciadorException e) {
            return new ResponseEntity<>(e.getMessage(), HttpStatus.BAD_REQUEST);
        } catch (Exception e) {
            return new ResponseEntity<>(e.getMessage(), HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @PostMapping(path = "/updateImovel")
    public ResponseEntity<String> UpdateImovel(@RequestBody @NonNull ImovelDTO imovelDto) {
        try {
            Imovel imovel = new Imovel();
            imovel.setIdImovel(imovelDto.idImovel());
            imovel.setNomeImovel(imovelDto.nomeImovel());
            imovel.setValorAluguelImovel(imovelDto.valorAluguelImovel());
            imovel.setStatusImovel(imovelDto.statusImovel());
            imovel.setValor_imovel(imovelDto.valor_imovel());
            imovel.setEndereco(imovelDto.endereco());
            imovel.setListaDespesas(imovelDto.listaDespesas());
            imovelService.save(imovel);
            return new ResponseEntity<>("Imovel atualizado com sucesso", HttpStatus.CREATED);
        } catch (GerenciadorException e) {
            return new ResponseEntity<>(e.getMessage(), HttpStatus.BAD_REQUEST);
        } catch (Exception e) {
            return new ResponseEntity<>("Erro inesperado ao atualizar Imovel" + e.getMessage(), HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @DeleteMapping("/deleteImovel/{id}")
    public ResponseEntity<String> deletarImovel(@PathVariable Long id) {
        try {
            imovelService.deleteById(id);
            return new ResponseEntity<>("Imovel excluido com sucesso", HttpStatus.OK);
        } catch (GerenciadorException e) {
            return new ResponseEntity<>(e.getMessage(), HttpStatus.BAD_REQUEST);
        } catch (Exception e) {
            return new ResponseEntity<>("Erro inesperado ao deletar Imoveis" + e.getMessage(), HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @GetMapping(path = "/buscaImovel")
    public ResponseEntity<?> getAllImoveis() {
        try {
            List<Imovel> imoveis = imovelService.findAll();
            if (imoveis.isEmpty()) throw new GerenciadorException("Nenhum imovel encontrado");

            return new ResponseEntity<>(imoveis, HttpStatus.OK);
        } catch (GerenciadorException e) {
            return new ResponseEntity<>(e.getMessage(), HttpStatus.BAD_REQUEST);
        } catch (Exception e) {
            return new ResponseEntity<>(e.getMessage(), HttpStatus.INTERNAL_SERVER_ERROR);
        }

    }

    @GetMapping(path = "/buscaByIdImovel/{id}")
    public ResponseEntity<?> getImoveisById(@PathVariable Long id) {
        try {
            Optional<Imovel> imovel = imovelService.findById(id);
            return new ResponseEntity<>(imovel, HttpStatus.OK);
        } catch (GerenciadorException e) {
            return new ResponseEntity<>(e.getMessage(), HttpStatus.BAD_REQUEST);
        } catch (Exception e) {
            return new ResponseEntity<>(e.getMessage(), HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

}
