package com.innovalife.oauth2;

import com.innovalife.entity.Usuario;
import com.innovalife.service.UsuarioService;
import com.innovalife.utils.Role;
import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.Authentication;
import org.springframework.security.oauth2.core.user.OAuth2User;
import org.springframework.security.web.authentication.SimpleUrlAuthenticationSuccessHandler;
import org.springframework.stereotype.Component;

import java.io.IOException;

@Component
public class CustomOAuth2SuccesHandler extends SimpleUrlAuthenticationSuccessHandler {
    @Autowired
    private UsuarioService usuarioService;

    @Override
    public void onAuthenticationSuccess(HttpServletRequest request, HttpServletResponse response, FilterChain chain, Authentication authentication) throws IOException, ServletException {
        OAuth2User principal = (OAuth2User) authentication.getPrincipal();

        String email = principal.getAttribute("cedula");
        Usuario usuario = usuarioService.findById(email);

        if(usuario == null) {
            usuario = new Usuario();
            usuario.setEmail(email);
            usuario.setNombres(principal.getAttribute("nombres"));
            usuario.setApellidos(principal.getAttribute("apellidos"));
            usuario.setTelefono(principal.getAttribute("telefono"));
            usuario.setTipoUsuario(Role.USER);
            usuarioService.save(usuario);
        }

    }
}
