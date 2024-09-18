package com.innovalife.service;

import com.innovalife.entity.AuthResponse;
import com.innovalife.entity.LoginRequest;
import com.innovalife.entity.RegisterRequest;
import com.innovalife.entity.Usuario;
import com.innovalife.repository.UsuarioRepository;
import com.innovalife.utils.Role;
import lombok.RequiredArgsConstructor;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class AuthService {

    private UsuarioService usuarioService;
    private JWTService jwtService;
    private AuthenticationManager authenticationManager;

    public AuthResponse login(LoginRequest loginRequest){
        authenticationManager.authenticate(new UsernamePasswordAuthenticationToken(loginRequest.getCedula(), loginRequest.getPassword()));
        UserDetails usuario = usuarioService.findById(loginRequest.getCedula());
        String token = jwtService.getToken(usuario);
        return AuthResponse.builder()
                .token(token)
                .build();
    }

    public AuthResponse register(RegisterRequest registerRequest){
        Usuario usuario = Usuario.builder()
                .cedula(registerRequest.getCedula())
                .nombres(registerRequest.getNombres())
                .apellidos(registerRequest.getApellidos())
                .telefono(registerRequest.getTelefono())
                .email(registerRequest.getEmail())
                .password(registerRequest.getPassword())
                .tipoUsuario(Role.USER)
                .build();

        usuarioService.save(usuario);
        return AuthResponse.builder()
                .token(jwtService.getToken(usuario))
                .build();
    }
}
