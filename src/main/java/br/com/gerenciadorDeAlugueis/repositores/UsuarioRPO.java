package br.com.gerenciadorDeAlugueis.repositores;

import br.com.gerenciadorDeAlugueis.models.Usuario;
import org.springframework.stereotype.Repository;

@Repository
public interface UsuarioRPO extends GenericRPO<Usuario> {

    boolean existsByNomeIgnoreCaseAndSenhaOrEmailIgnoreCaseAndSenha(String nome, String senhaDoNome, String email, String senhaDoEmail);

}
