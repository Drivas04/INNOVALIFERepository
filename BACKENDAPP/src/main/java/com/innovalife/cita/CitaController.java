package com.innovalife.cita;

import com.innovalife.utils.ResourceNotFoundException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.servlet.function.EntityResponse;

import java.util.List;

@RestController
@RequestMapping("/citas")
@CrossOrigin(origins = "http://localhost:4200")
public class CitaController {

    @Autowired
    private CitaRepository citaRepository;

    @GetMapping("listaCitas")
    public List<Cita> getAll(){
        return citaRepository.findAll();
    }

    @GetMapping("/cita/{id}")
    public ResponseEntity<Cita> getById(@PathVariable Integer id) throws ResourceNotFoundException {
        if(!citaRepository.existsById(id)){
            new ResourceNotFoundException("Usuario no encontrado");
        }
        return ResponseEntity.ok(citaRepository.getById(id));
    }

    @PostMapping("/agendarCita")
    public ResponseEntity<Cita> save(@RequestBody Cita cita){
        if(citaRepository.existsById(cita.getId())){
            return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
        }
        citaRepository.save(cita);
        return ResponseEntity.ok(cita);
    }

    @PutMapping("/actualizarCita/{id}")
    public ResponseEntity<Cita> updateById(@PathVariable Integer id, @RequestBody Cita cita){
        if(!citaRepository.existsById(id)){
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
        Cita citaExistente = citaRepository.getReferenceById(id);
        return ResponseEntity.ok().build();

    }

    @DeleteMapping("/eliminarCita/{id}")
    public ResponseEntity<Cita> deleteById(@PathVariable Integer id){
        if(!citaRepository.existsById(id)){
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
        citaRepository.deleteById(id);
        return new ResponseEntity<>(HttpStatus.OK);
    }

}
