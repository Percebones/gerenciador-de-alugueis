package com.gerenciador_de_alugueis.enumerators;

public enum Status {

    Alugado("Alugado"), Vago("Vago");
    private final String status;

    Status(String status) {
        this.status = status;
    }

    public String getStatus() {
        return status;
    }
}

