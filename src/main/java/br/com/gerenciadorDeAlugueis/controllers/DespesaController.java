package br.com.gerenciadorDeAlugueis.controllers;


import br.com.gerenciadorDeAlugueis.dto.DespesaDTO;
import br.com.gerenciadorDeAlugueis.exceptions.GerenciadorException;
import br.com.gerenciadorDeAlugueis.models.Despesa;
import br.com.gerenciadorDeAlugueis.models.Imovel;
import br.com.gerenciadorDeAlugueis.service.DespesaService;
import br.com.gerenciadorDeAlugueis.service.ImovelService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Optional;

@RestController
@RequestMapping(path = "/api/v1/despesa")
public class DespesaController {

    private final DespesaService despesaService;
    private final ImovelService imovelService;
    public DespesaController(DespesaService despesaService, ImovelService imovelService) {
        this.despesaService = despesaService;
        this.imovelService = imovelService;
    }

    @PostMapping(path = "/cadastroDespesa")
    public ResponseEntity<String> cadDespesa(@RequestBody DespesaDTO despesaDTO) {
        try {
            Imovel imovel = imovelService
                    .findById(despesaDTO.idImovel())
                    .orElseThrow(() -> new GerenciadorException("Imóvel não encontrado."));

            Despesa despesa = new Despesa();
            despesa.setImovel(imovel);
            despesa.setNomeDespesa(despesaDTO.nomeDespesa());
            despesa.setValorDespesa(despesaDTO.valorDespesa());
            despesaService.cadDespesa(despesa);
            return new ResponseEntity<>("Despesa criada com sucesso", HttpStatus.CREATED);
        } catch (Exception e) {
            return new ResponseEntity<>(e.getMessage(), HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @DeleteMapping
    public ResponseEntity<String> deleteDespesa(@PathVariable Long idDespesa) {
        try {
            despesaService.deleteDespesa(idDespesa);
            return new ResponseEntity<>("Despesa deletada com sucesso", HttpStatus.OK);
        } catch (Exception e) {
            return new ResponseEntity<>(e.getMessage(), HttpStatus.INTERNAL_SERVER_ERROR);
        }

    }

}
