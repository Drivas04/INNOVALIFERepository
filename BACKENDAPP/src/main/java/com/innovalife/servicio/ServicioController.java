package com.innovalife.servicio;

import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/servicios")
@CrossOrigin(origins = "http://localhost:4200")
@RequiredArgsConstructor

public class ServicioController {

    @Autowired
    private ServicioRepository servicioRepository;

    @PreAuthorize("isAuthenticated()")
    @GetMapping(value="lista-servicios")
    public List<Servicio> getAll() {
        return servicioRepository.findAll();
    }

    @PreAuthorize("isAuthenticated()")
    @GetMapping(value="servicio/{id}")
    public ResponseEntity<Servicio> getById(@PathVariable Integer id) {
        Servicio servicio = servicioRepository.findById(id).orElse(null);
        if (servicio == null) {
            return ResponseEntity.notFound().build();
        }
        return ResponseEntity.ok(servicio);
    }

    @PreAuthorize("hasAuthority('ADMIN') AND isAuthenticated()")
    @PostMapping(value="agregar-servicio")
    public ResponseEntity<Servicio> save(@RequestBody Servicio servicio) {
        if (servicioRepository.existsById(servicio.getId())) {
            return ResponseEntity.badRequest().build();
        }
        servicioRepository.save(servicio);
        return ResponseEntity.ok(servicio);
    }

    @PreAuthorize("hasAuthority('ADMIN') AND isAuthenticated()")
    @PutMapping(value="editar-servicio/{id}")
    public ResponseEntity<Servicio> updateById(@PathVariable Integer id, @RequestBody Servicio servicio) {
        Servicio servicioEditado = servicioRepository.findById(id).orElse(null);
        if (servicioEditado == null) {
            return ResponseEntity.notFound().build();
        }
        servicioEditado.setNombre(servicio.getNombre());
        servicioEditado.setDescripcion(servicio.getDescripcion());
        Servicio nuevoServicio = servicioRepository.save(servicioEditado);
        return ResponseEntity.ok(nuevoServicio);
    }

    @PreAuthorize("hasAuthority('ADMIN') AND isAuthenticated()")
    @DeleteMapping(value="eliminar-servicio/{id}")
    public ResponseEntity<Servicio> deleteById(@PathVariable Integer id) {
        Servicio servicio = servicioRepository.findById(id).orElse(null);
        if (servicio == null) {
            return ResponseEntity.notFound().build();
        }
        servicioRepository.delete(servicio);
        return ResponseEntity.ok(servicio);
    }
}
