package com.gerenciador_de_alugueis.controller;


import com.gerenciador_de_alugueis.dto.ImovelDto;
import com.gerenciador_de_alugueis.model.Imovel;
import com.gerenciador_de_alugueis.service.ImovelService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping(path = "/api/imoveis")
//@CrossOrigin(origins = "*")
public class ImovelController {

    @Autowired
    private ImovelService imovelService;

    @PostMapping(path = "/cria")
    public ResponseEntity<?> CadImovel(@RequestBody ImovelDto imovelDto) throws Exception{
        try {
            Imovel imovel = new Imovel(imovelDto);
            imovelService.cadastroImovel(imovel);
            return new ResponseEntity<>("Imovel cadastrado com sucesso", HttpStatus.CREATED);
        } catch (Exception e) {
            return new ResponseEntity<>("Erro: 400 " + e.getMessage(), HttpStatus.BAD_REQUEST);
        }
    }

    @PostMapping(path = "/update")
    public ResponseEntity<?> UpdateImovel(@RequestBody ImovelDto imovelDto) throws Exception{
        try {
            Imovel imovel = new Imovel(imovelDto);
            return new ResponseEntity<>("Imovel atualizado com sucesso", HttpStatus.CREATED);
        } catch (Exception e) {
            return new ResponseEntity<>("Erro ao atualizar Imovel" + e.getMessage(), HttpStatus.BAD_REQUEST);
        }
    }

    @DeleteMapping("/{id}")
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


}
