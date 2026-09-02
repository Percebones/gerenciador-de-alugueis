package br.com.gerenciadorDeAlugueis.controllers;


import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import br.com.gerenciadorDeAlugueis.dto.ImovelDto;
import br.com.gerenciadorDeAlugueis.models.Imovel;
import br.com.gerenciadorDeAlugueis.service.ImovelService;

@RestController
@RequestMapping(path = "/api/imoveis")
public class ImovelController {

    private final ImovelService imovelService;

    ImovelController(ImovelService imovelService) {
        this.imovelService = imovelService;
    }

    @PostMapping(path = "/cria")
    public ResponseEntity<?> CadImovel(@RequestBody ImovelDto imovelDto) throws Exception {
        try {
            Imovel imovel = new Imovel(imovelDto);
            imovelService.cadastroImovel(imovel);
            return new ResponseEntity<>("Imovel cadastrado com sucesso", HttpStatus.CREATED);
        } catch (Exception e) {
            return new ResponseEntity<>(e.getMessage(), HttpStatus.BAD_REQUEST);
        }
    }

    @PostMapping(path = "/update")
    public ResponseEntity<?> UpdateImovel(@RequestBody ImovelDto imovelDto) throws Exception {
        try {
            imovelService.atualizarImovel(imovelDto);
            return new ResponseEntity<>("Imovel atualizado com sucesso", HttpStatus.CREATED);
        } catch (Exception e) {
            return new ResponseEntity<>("Erro ao atualizar Imovel" + e.getMessage(), HttpStatus.BAD_REQUEST);
        }
    }

    @DeleteMapping("/del/{id}")
    public ResponseEntity<Void> deletarImovel(@PathVariable Long id) {
        try {
            imovelService.deletarPorId(id);
            return ResponseEntity.noContent().build(); // 204
        } catch (Exception e) {
            return ResponseEntity.badRequest().build();
        }
    }

    @GetMapping(path = "/busca")
    public ResponseEntity<Iterable<Imovel>> getAllImoveis() {
        Iterable<Imovel> imoveis = imovelService.getAllImoveis();
        return new ResponseEntity<>(imoveis, HttpStatus.OK);
    }

    @GetMapping(path = "/porID/{id}")
    public ResponseEntity<Imovel> getImoveisById(@PathVariable int id) {
        Imovel imovel = imovelService.getImovelById(id);
        return new ResponseEntity<>(imovel, HttpStatus.OK);
    }


}
