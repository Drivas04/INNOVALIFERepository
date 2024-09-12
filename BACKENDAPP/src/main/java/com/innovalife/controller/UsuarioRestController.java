package com.innovalife.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.HttpStatusCode;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.innovalife.entity.UsuarioEntity;
import com.innovalife.service.UsuarioService;
import com.innovalife.utils.ResourceNotFoundException;

@CrossOrigin(origins = "http://localhost:4200")
@RestController
@RequestMapping("/usuario")
public class UsuarioRestController {

	@Autowired
	private UsuarioService usuarioService;
	
	@GetMapping("/listaUsuarios")
	public List<UsuarioEntity> getAll(){
		return usuarioService.getAll();
	}
	
	@PostMapping(value="/guardarUsuario")
	public ResponseEntity<UsuarioEntity> save(@RequestBody UsuarioEntity usuario){
		UsuarioEntity usu = usuarioService.save(usuario);
		return new ResponseEntity<UsuarioEntity>(usu, HttpStatus.OK);
	}
	
	@PutMapping("/editar/{id}")
	public ResponseEntity<UsuarioEntity> update(@PathVariable String cedula, @RequestBody UsuarioEntity nuevoUsuario){
		UsuarioEntity usuarioExistente = usuarioService.get(cedula);
		
		if(usuarioExistente == null) {
			return new ResponseEntity<UsuarioEntity>(HttpStatus.NOT_FOUND);
		}
		
		nuevoUsuario.setCedula(cedula);
		UsuarioEntity usu = usuarioService.save(nuevoUsuario);
		return new ResponseEntity<UsuarioEntity>(usu, HttpStatus.OK);
	}
	
	@GetMapping("/obtener/{id}")
	public ResponseEntity<UsuarioEntity> getUsuarioById(@PathVariable String cedula) throws ResourceNotFoundException{
		UsuarioEntity usuario = usuarioService.get(cedula);
		
		if(usuario == null) {
			new ResourceNotFoundException("ERROR 404: Usuario no encontrado");
		}
		return ResponseEntity.ok(usuario);
	}
	
	@DeleteMapping("/eliminar/{id}")
	public ResponseEntity<UsuarioEntity> delete(@PathVariable String cedula){
		UsuarioEntity usuario = usuarioService.get(cedula);
		if(usuario != null) {
			usuarioService.delete(cedula);
		}
		else {
			return new ResponseEntity<UsuarioEntity>(usuario, HttpStatus.INTERNAL_SERVER_ERROR);
		}
		return new ResponseEntity<UsuarioEntity>(usuario, HttpStatus.OK);
	}
	
	
}
