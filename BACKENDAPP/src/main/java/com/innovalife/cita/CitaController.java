package com.innovalife.cita;

import com.innovalife.mail.MailService;
import com.innovalife.mail.MailStructure;
import com.innovalife.servicio.Servicio;
import com.innovalife.servicio.ServicioRepository;
import com.innovalife.usuario.UserRepository;
import com.innovalife.utils.Propiedades;
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

    MailStructure mailStructure = new MailStructure();

    Propiedades propiedades = new Propiedades();

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
        Cita nuevaCita = citaRepository.save(cita);
        Servicio servicio = nuevaCita.getIdServicio();
        mailStructure.setSubject(propiedades.getProperty("ASUNTO_NUEVA_CITA"));
        mailStructure.setBody("Tu cita de "+servicio.getNombre()+" ha sido agendada para el "+cita.getFechaCita()+".\n¡No faltes! ");
        mailService.sendMail(nuevaCita.getUsernameUsuario().getEmail(), mailStructure);
        return ResponseEntity.status(HttpStatus.OK).body(nuevaCita);
    }

    @PreAuthorize("isAuthenticated() or hasAuthority('ADMIN')")
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

        Servicio servicio = actual.getIdServicio();

        mailStructure.setSubject(propiedades.getProperty("ASUNTO_EDICION_CITA"));
        mailStructure.setBody("Su cita de "+servicio.getNombre()+" ha sido actualizada.\nFecha: "+cita.getFechaCita()+"\nEstado: "+cita.getEstado()+"\nDescripcion: "+cita.getDescripcion());

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
