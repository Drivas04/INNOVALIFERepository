package com.innovalife.usuario;

import com.innovalife.mail.MailService;
import jakarta.mail.MessagingException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.mail.MailSender;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.*;

@RestController
@CrossOrigin(origins = "http://localhost:4200")
@RequestMapping("/usuario")
public class UsuarioController {

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private MailService mailService;

    @PutMapping(value = "olvidoClave")
    public ResponseEntity<String> olvidoClave(@RequestParam String email) {
        Usuario usuario = userRepository.findByEmail(email)
                .orElseThrow(()->new RuntimeException("Usuario no encontrado"));
        try {
            mailService.sendSetPasswordMail(email);
        } catch (MessagingException e) {
            throw new RuntimeException(e);
        }
        return new ResponseEntity<>("Correo enviado con exito. Revise su bandeja de entrada.", HttpStatus.OK);
    }

    @PutMapping(value = "set-password")
    public ResponseEntity<String> setPassword(@RequestParam String email, @RequestHeader String password) {
        PasswordEncoder passwordEncoder = new BCryptPasswordEncoder();
        Usuario usuario = userRepository.findByEmail(email)
                .orElseThrow(()->new RuntimeException("Usuario no encontrado"));
        usuario.setPassword(passwordEncoder.encode(password));
        userRepository.save(usuario);
        return new ResponseEntity<>("clave actualizada con éxito", HttpStatus.OK);
    }
}