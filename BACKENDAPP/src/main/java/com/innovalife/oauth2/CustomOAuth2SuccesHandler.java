package com.innovalife.oauth2;

import com.innovalife.entity.Usuario;
import com.innovalife.repository.UsuarioRepository;
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
    private UsuarioRepository usuarioRepository;

    @Override
    public void onAuthenticationSuccess(HttpServletRequest request, HttpServletResponse response, FilterChain chain, Authentication authentication) throws IOException, ServletException {
        OAuth2User principal = (OAuth2User) authentication.getPrincipal();

        String cedula = principal.getAttribute("cedula");
        Usuario usuario = usuarioRepository.findByUsername(cedula).orElseThrow();

        if(usuario == null) {
            usuario = new Usuario();
            usuario.setEmail(principal.getAttribute("email"));
            usuario.setNames(principal.getAttribute("names"));
            usuario.setLastNames(principal.getAttribute("lastnames"));
            usuario.setPhone(principal.getAttribute("phone"));
            usuario.setRole(Role.USER);
            usuarioRepository.save(usuario);
        }

    }
}
