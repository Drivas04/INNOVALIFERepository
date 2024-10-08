package com.innovalife.entidad;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/miEntidad")
@CrossOrigin(origins = "http://localhost:4200")
@PreAuthorize("hasAuthority('ADMIN')")
public class EntidadController {

    @Autowired
    EntidadRepository entidadRepository;

    @PutMapping(value = "editarDatos/{NIT}")
    public ResponseEntity<Entidad> editarDatos(@PathVariable String NIT, @RequestBody Entidad nuevo){
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
