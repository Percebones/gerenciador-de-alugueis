package br.com.gerenciadorDeAlugueis.enumerators;

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

