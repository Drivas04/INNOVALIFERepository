package com.innovalife.cita;

import com.innovalife.mail.MailService;
import com.innovalife.mail.MailStructure;
import com.innovalife.usuario.UserRepository;
import com.innovalife.utils.ResourceNotFoundException;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.servlet.function.EntityResponse;

import java.util.*;

@RestController
@RequestMapping("/citas")
@CrossOrigin(origins = "http://localhost:4200")
@RequiredArgsConstructor
public class CitaController {

    @Autowired
    private CitaRepository citaRepository;

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private MailService mailService;


    @PreAuthorize("hasAuthority('ADMIN')")
    @GetMapping(value="listaCitas")
    public List<Cita> getAll(){
        return citaRepository.findAll();
    }

    @PreAuthorize("isAuthenticated()")
    @GetMapping(value = "misCitas")
    public List<Cita> getMisCitas() throws ResourceNotFoundException {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        String username = authentication.getName();

        if (!userRepository.existsById(username)) {
            throw new ResourceNotFoundException("Usuario no registrado en el sistema");
        }

        return citaRepository.findByUsernameUsuario_Username(username);
    }

    @PreAuthorize("isAuthenticated() or hasAuthority('ADMIN')")
    @GetMapping("/cita/{id}")
    public ResponseEntity<Cita> getById(@PathVariable Integer id) throws ResourceNotFoundException {
        if(!citaRepository.existsById(id)){
            new ResourceNotFoundException("Usuario no encontrado");
        }
        return ResponseEntity.ok(citaRepository.getById(id));
    }

    @PreAuthorize("isAuthenticated()")
    @PostMapping("/agendarCita")
    public ResponseEntity<Cita> save(@RequestBody Cita cita){
        if(citaRepository.existsById(cita.getId())){
            return new ResponseEntity<>(HttpStatus.CONFLICT);
        }
        citaRepository.save(cita);
        return ResponseEntity.ok(cita);
    }

    @PreAuthorize("isAuthenticated() or hasRole('ADMIN')")
    @PutMapping("/actualizarCita/{id}")
    public ResponseEntity<Cita> updateById(@PathVariable Integer id, @RequestBody Cita cita){
        Cita actual = citaRepository.getById(id);
        if(!citaRepository.existsById(id)){
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
        cita.setId(id);
        cita.setEstado(cita.getEstado());
        cita.setFechaCita(cita.getFechaCita());
        cita.setDescripcion(cita.getDescripcion());

        Cita nuevaCita = citaRepository.save(cita);

        String emailUsuario = actual.getUsernameUsuario().getEmail();

        System.out.println(emailUsuario);

        MailStructure mailStructure = new MailStructure();

        mailStructure.setSubject("Cita Actualizada");
        mailStructure.setBody("Su cita ha sido actualizada");

        mailService.sendMail(emailUsuario, mailStructure);

        return new ResponseEntity<>(nuevaCita, HttpStatus.OK);

    }

    @PreAuthorize("isAuthenticated() and hasAuthority('USER')")
    @DeleteMapping("/eliminarCita/{id}")
    public ResponseEntity<Cita> deleteById(@PathVariable Integer id){
        if(!citaRepository.existsById(id)){
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
        citaRepository.deleteById(id);
        return new ResponseEntity<>(HttpStatus.OK);
    }

}
