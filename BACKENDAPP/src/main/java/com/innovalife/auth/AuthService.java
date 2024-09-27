package com.innovalife.auth;

import com.innovalife.usuario.Role;
import com.innovalife.usuario.Usuario;
import com.innovalife.usuario.UserRepository;
import com.innovalife.jwt.JwtService;
import com.innovalife.utils.ResourceNotFoundException;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;



import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class AuthService {

    private final UserRepository userRepository;
    private final JwtService jwtService;
    private final AuthenticationManager authenticationManager;
    private final PasswordEncoder passwordEncoder;

    public AuthResponse login(LoginRequest request) {
        authenticationManager.authenticate(new UsernamePasswordAuthenticationToken(request.getUsername(), request.getPassword()));
        UserDetails user = userRepository.findByUsername(request.getUsername()).orElseThrow(() -> new UsernameNotFoundException("Usuario no encontrado"));

        if(!passwordEncoder.matches(request.getPassword(), user.getPassword())) {
            throw new BadCredentialsException("Contraseña incorrecta");
        }

        String token=jwtService.getToken(user);
        return AuthResponse.builder().mensaje("Bienvenido! " + user.getUsername())
            .token(token)
            .build();
    }

    public AuthResponse register(RegisterRequest request) {
        Usuario user = Usuario.builder()
            .username(request.getUsername())
            .password(passwordEncoder.encode( request.getPassword()))
            .names(request.getNames())
            .lastname(request.lastnames)
            .phone(request.getPhone()).email(request.getEmail())
            .role(Role.USER)
            .build();

        if(userRepository.existsById(user.getUsername())){
            return AuthResponse.builder().mensaje("ERROR: Usuario ya existente").build();
        }
        else{
            userRepository.save(user);
            return AuthResponse.builder()
            .token(jwtService.getToken(user))
            .build();
        }
    }
}