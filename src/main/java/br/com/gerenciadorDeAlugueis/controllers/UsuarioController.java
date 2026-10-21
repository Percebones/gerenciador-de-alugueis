package br.com.gerenciadorDeAlugueis.controllers;


import br.com.gerenciadorDeAlugueis.dto.UsuarioDTO;
import br.com.gerenciadorDeAlugueis.exceptions.GerenciadorException;
import br.com.gerenciadorDeAlugueis.models.Usuario;
import br.com.gerenciadorDeAlugueis.service.UsuarioService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping(path = "/api/v1/login")
public class UsuarioController {

    private final UsuarioService usuarioService;

    public UsuarioController(UsuarioService usuarioService) {
        this.usuarioService = usuarioService;
    }


    @PostMapping(path = "/login")
    public ResponseEntity<?> login(@RequestBody UsuarioDTO usuarioDTO) {
        Usuario usuario = new Usuario();
        try {
            usuario.setEmail(usuarioDTO.email());
            usuario.setNome(usuarioDTO.nome());
            usuario.setSenha(usuarioDTO.senha());

            if (usuarioService.login(usuario)) {
                return new ResponseEntity<>("Usuário válido", HttpStatus.OK);
            } else {
                throw new GerenciadorException("Usuário ou senha inválidos");
            }
        } catch (GerenciadorException e) {
            return new ResponseEntity<>(e.getMessage(), HttpStatus.UNAUTHORIZED);
        } catch (Exception e) {
            return new ResponseEntity<>(e.getMessage(), HttpStatus.INTERNAL_SERVER_ERROR);
        }

    }

}
