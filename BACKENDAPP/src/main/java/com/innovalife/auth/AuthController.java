package com.innovalife.auth;

import com.innovalife.usuario.UserRepository;
import com.innovalife.usuario.Usuario;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import lombok.RequiredArgsConstructor;

import java.security.Principal;

@RestController
@RequestMapping("/auth")
@CrossOrigin("http://localhost:4200")
@RequiredArgsConstructor
public class AuthController {
    
    private final AuthService authService;

    @Autowired
    private UserRepository userRepository;
    
    @PostMapping(value = "login")
    public ResponseEntity<AuthResponse> login(@RequestBody LoginRequest request) {
        return ResponseEntity.ok(authService.login(request));
    }

    @PostMapping(value = "registrate")
    public ResponseEntity<AuthResponse> register(@RequestBody RegisterRequest request) {
        return ResponseEntity.ok(authService.register(request));
    }

    @GetMapping(value = "usuario-actual")
    public Usuario obtenerUsuarioActual(Principal usuarioActual){
        return userRepository.findByUsername(usuarioActual.getName()).orElseThrow();
    }
}
