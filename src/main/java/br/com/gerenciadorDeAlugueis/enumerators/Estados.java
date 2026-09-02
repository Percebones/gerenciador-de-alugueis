package br.com.gerenciadorDeAlugueis.enumerators;

public enum Estados {
    Parana("PR"), SaoPaulo("SP");
    private final String codigo;

    Estados(String sigla) {
        this.codigo = sigla;
    }

    public String getEstado() {
        return codigo;
    }
}
