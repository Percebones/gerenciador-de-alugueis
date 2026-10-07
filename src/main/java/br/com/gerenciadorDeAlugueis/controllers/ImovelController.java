package br.com.gerenciadorDeAlugueis.controllers;


import br.com.gerenciadorDeAlugueis.dto.ImovelDto;
import br.com.gerenciadorDeAlugueis.models.Imovel;
import br.com.gerenciadorDeAlugueis.service.ImovelService;
import com.google.gson.Gson;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.lang.NonNull;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping(path = "/api/v1/imovel")
public class ImovelController {

    private final ImovelService imovelService;

    @Autowired
    private final Gson gson = new Gson();

    ImovelController(ImovelService imovelService) {
        this.imovelService = imovelService;
    }

    @GetMapping
    public String respostaPadrao() {
        return "Endpoint de imóveis funcionando!";
    }

    @PostMapping(path = "/cria")
    public ResponseEntity<String> CadImovel(@RequestBody ImovelDto imovelDto) throws Exception {
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
            return new ResponseEntity<>("Imovel cadastrado com sucesso", HttpStatus.CREATED);
        } catch (Exception e) {
            return new ResponseEntity<>(e.getMessage(), HttpStatus.BAD_REQUEST);
        }
    }

    @PostMapping(path = "/update")
    public ResponseEntity<?> UpdateImovel(@RequestBody @NonNull ImovelDto imovelDto) throws Exception {
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
        } catch (Exception e) {
            return new ResponseEntity<>("Erro ao atualizar Imovel" + e.getMessage(), HttpStatus.BAD_REQUEST);
        }
    }

    @DeleteMapping("/del/{id}")
    public ResponseEntity<Void> deletarImovel(@PathVariable Long id) {
        try {
            imovelService.deleteById(id);
            return ResponseEntity.noContent().build(); // 204
        } catch (Exception e) {
            return ResponseEntity.badRequest().build();
        }
    }

    @GetMapping(path = "/busca")
    public ResponseEntity<String> getAllImoveis() {
        List<Imovel> imoveis = imovelService.findAll();
        return new ResponseEntity<>(gson.toJson(imoveis), HttpStatus.OK);
    }

    @GetMapping(path = "/porID/{id}")
    public ResponseEntity<String> getImoveisById(@PathVariable Long id) {
        Imovel imovel = imovelService.getById(id);
        return new ResponseEntity<>(gson.toJson(imovel), HttpStatus.OK);
    }


}
