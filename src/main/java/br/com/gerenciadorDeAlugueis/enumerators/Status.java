package br.com.gerenciadorDeAlugueis.enumerators;

import lombok.Getter;

@Getter
public enum Status {

    ALUGADO("ALUGADO"),
    VAGO("VAGO");

    private final String status;

    Status(String status) {
        this.status = status;
    }

}

