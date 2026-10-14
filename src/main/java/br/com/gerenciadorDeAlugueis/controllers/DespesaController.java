package br.com.gerenciadorDeAlugueis.controllers;


import br.com.gerenciadorDeAlugueis.dto.DespesaDTO;
import br.com.gerenciadorDeAlugueis.models.Despesa;
import br.com.gerenciadorDeAlugueis.service.DespesaService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping(path = "/api/v1/despesa")
public class DespesaController {

    private final DespesaService despesaService;

    public DespesaController(DespesaService despesaService) {
        this.despesaService = despesaService;
    }

    @PostMapping
    public ResponseEntity<String> cadDespesa(@RequestBody DespesaDTO despesaDTO) {
        Despesa despesa = new Despesa();
        try {
            despesa.setImovel(despesaDTO.imovel());
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
