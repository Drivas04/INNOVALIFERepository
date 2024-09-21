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
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import static java.lang.String.valueOf;

@Service
@RequiredArgsConstructor
public class AuthService {

    private final UsuarioRepository usuarioRepository;
    private final JWTService jwtService;
    private final AuthenticationManager authenticationManager;
    private final PasswordEncoder passwordEncoder;

    public AuthResponse login(LoginRequest loginRequest){
        authenticationManager.authenticate(new UsernamePasswordAuthenticationToken(loginRequest.getUsername(), loginRequest.getPassword()));
        UserDetails usuario = usuarioRepository.findByUsername(loginRequest.getUsername()).orElseThrow();
        String token = jwtService.getToken(usuario);
        return AuthResponse.builder()
                .token(token)
                .build();
    }

    public AuthResponse register(RegisterRequest registerRequest){
        Usuario usuario = Usuario.builder()
                .username(registerRequest.getUsername())
                .names(registerRequest.getNames())
                .lastNames(registerRequest.getLastnames())
                .phone(registerRequest.getPhone())
                .email(registerRequest.getEmail())
                .password(passwordEncoder.encode(registerRequest.getPassword()))
                .role(Role.USER)
                .build();

        usuarioRepository.save(usuario);
        return AuthResponse.builder()
                .token(jwtService.getToken(usuario))
                .build();
    }
}
