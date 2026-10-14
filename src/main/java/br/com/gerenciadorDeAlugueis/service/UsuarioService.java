package br.com.gerenciadorDeAlugueis.service;

import br.com.gerenciadorDeAlugueis.models.Usuario;
import br.com.gerenciadorDeAlugueis.repositores.UsuarioRPO;
import org.springframework.stereotype.Service;

@Service
public class UsuarioService {
    private final UsuarioRPO usuarioRPO;

    public UsuarioService(UsuarioRPO usuarioRPO) {
        this.usuarioRPO = usuarioRPO;
    }

    public boolean login(Usuario usuario) {
        String email = usuario.getEmail();
        String senha = usuario.getSenha();
        String userName = usuario.getNome();

        return usuarioRPO.existsByNomeIgnoreCaseAndSenhaOrEmailIgnoreCaseAndSenha(userName, senha, email, senha);
    }


}
