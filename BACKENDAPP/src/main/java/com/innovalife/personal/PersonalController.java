package com.innovalife.personal;

import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/personal")
@CrossOrigin(origins = "http://localhost:4200")
@RequiredArgsConstructor

public class PersonalController {

    private final PersonalRepository personalRepository;

    @PreAuthorize("isAuthenticated()")
    @GetMapping(value = "lista-personal")
    public List<Personal> getALl() {
        return personalRepository.findAll();
    }

    @PreAuthorize("isAuthenticated()")
    @GetMapping(value = "funcionario/{cedula}")
    public ResponseEntity<Personal> getByid(@PathVariable String cedula) {
        if (!personalRepository.existsById(cedula)) {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
        Personal personal = personalRepository.findById(cedula).get();
        return new ResponseEntity<>(personal, HttpStatus.OK);
    }

    @PreAuthorize("hasAuthority('ADMIN')")
    @PostMapping(value = "registrar-funcionario")
    public ResponseEntity<Personal> save(@RequestBody Personal personal) {
        if(personalRepository.existsById(personal.getCedula())){
            return new ResponseEntity<>(HttpStatus.CONFLICT);
        }
        Personal nuevo = personalRepository.save(personal);
        return new ResponseEntity<>(nuevo, HttpStatus.OK);
    }

    @PreAuthorize("hasAuthority('ADMIN')")
    @PutMapping(value = "actualizar-funcionario/{cedula}")
    public ResponseEntity<Personal> updateById(@PathVariable String cedula, @RequestBody Personal personal) {
        if (!personalRepository.existsById(cedula)) {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
        personal.setCedula(cedula);
        personalRepository.save(personal);
        return new ResponseEntity<>(personal, HttpStatus.OK);
    }

    @PreAuthorize("hasAuthority('ADMIN')")
    @DeleteMapping(value = "eliminar-funcionario/{cedula}")
    public ResponseEntity<Personal> deleteById(@PathVariable String cedula) {
        if (!personalRepository.existsById(cedula)) {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
        personalRepository.deleteById(cedula);
        return new ResponseEntity<>(HttpStatus.OK);
    }
}
