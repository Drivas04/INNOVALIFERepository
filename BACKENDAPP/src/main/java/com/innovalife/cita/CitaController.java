package com.innovalife.cita;

import com.innovalife.mail.MailService;
import com.innovalife.servicio.Servicio;
import com.innovalife.usuario.UserRepository;
import com.innovalife.utils.Propiedades;
import com.innovalife.utils.ResourceNotFoundException;
import jakarta.mail.MessagingException;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.*;

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

    Propiedades propiedades = new Propiedades();

    @PreAuthorize("hasAuthority('ADMIN')")
    @GetMapping(value="lista-citas")
    public List<Cita> getAll(){
        return citaRepository.findAll();
    }

    @PreAuthorize("isAuthenticated()")
    @GetMapping(value = "mis-citas")
    public List<Cita> getMyInfo() throws ResourceNotFoundException {
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
    @PostMapping("/agendar-cita")
    public ResponseEntity<Cita> save(@RequestBody Cita cita) throws MessagingException {
        if(citaRepository.existsById(cita.getId())){
            return new ResponseEntity<>(HttpStatus.CONFLICT);
        }
        Cita nuevaCita = citaRepository.save(cita);
        Servicio servicio = nuevaCita.getIdServicio();
        mailService.sendAssignementMail(nuevaCita.getUsernameUsuario().getEmail(), nuevaCita.getUsernameUsuario().getNames(), servicio.getNombre(), cita.getFechaCita().toString());
        return ResponseEntity.status(HttpStatus.OK).body(nuevaCita);
    }

    @PreAuthorize("isAuthenticated()")
    @PutMapping("/actualizar-cita/{id}")
    public ResponseEntity<Cita> updateById(@PathVariable Integer id, @RequestBody Cita cita) throws MessagingException {
        Cita actual = citaRepository.getById(id);
        if(!citaRepository.existsById(id)){
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
        cita.setId(id);
        cita.setEstado(cita.getEstado());
        cita.setFechaCita(cita.getFechaCita());
        cita.setDescripcion(cita.getDescripcion());

        Servicio servicio = actual.getIdServicio();
        String emailUsuario = actual.getUsernameUsuario().getEmail();
        Cita nuevaCita = citaRepository.save(cita);
        mailService.sendUpdateMail(emailUsuario, actual.getUsernameUsuario().getNames(), servicio.getNombre(), actual.getFechaCita().toString(), nuevaCita.getIdServicio().getNombre(), nuevaCita.getFechaCita().toString());

        return new ResponseEntity<>(nuevaCita, HttpStatus.OK);

    }

    @PreAuthorize("isAuthenticated() and hasAuthority('USER')")
    @DeleteMapping("/eliminar-cita/{id}")
    public ResponseEntity<Cita> deleteById(@PathVariable Integer id){
        if(!citaRepository.existsById(id)){
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
        citaRepository.deleteById(id);
        return new ResponseEntity<>(HttpStatus.OK);
    }

}
