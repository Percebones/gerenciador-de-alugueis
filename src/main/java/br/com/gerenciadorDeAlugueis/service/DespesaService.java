package br.com.gerenciadorDeAlugueis.service;

import org.springframework.stereotype.Service;

import br.com.gerenciadorDeAlugueis.repositores.DespesaRpo;

@Service
public class DespesaService {
	
	private final DespesaRpo despesaRpo;

	public DespesaService(DespesaRpo despesaRpo) {
		this.despesaRpo = despesaRpo;
	}
	
	
	
}
