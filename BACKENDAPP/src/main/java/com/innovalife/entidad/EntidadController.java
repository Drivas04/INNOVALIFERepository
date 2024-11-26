package com.innovalife.entidad;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/entidad")
@CrossOrigin(origins = "http://localhost:4200")
@PreAuthorize("hasAuthority('ADMIN')")
public class EntidadController {

    @Autowired
    EntidadRepository entidadRepository;

    @PreAuthorize("hasAuthority('USER') and isAuthenticated()")
    @GetMapping(value = "lista-entidades")
    public List<Entidad> getAll() {
        return entidadRepository.findAll();
    }


    @PreAuthorize("isAuthenticated()")
    @GetMapping(value = "mi-entidad/{NIT}")
    public ResponseEntity<Entidad> getById(@PathVariable String NIT){
        if(!entidadRepository.existsById(NIT)){
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
        Entidad entidad = entidadRepository.getById(NIT);
        return new ResponseEntity<>(entidad, HttpStatus.OK);
    }

    @PreAuthorize("hasAuthority('ADMIN') and isAuthenticated()")
    @PutMapping(value = "editar-datos/{NIT}")
    public ResponseEntity<Entidad> updateById(@PathVariable String NIT, @RequestBody Entidad nuevo){
        if(!entidadRepository.existsById(NIT)){
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
        Entidad entidad = entidadRepository.findById(NIT).get();
        entidad.setNit(NIT);
        entidad.setBloqueAtencion(nuevo.getBloqueAtencion());
        entidadRepository.save(entidad);
        return new ResponseEntity<>(entidad, HttpStatus.OK);
    }
}
