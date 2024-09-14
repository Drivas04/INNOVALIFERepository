package com.innovalife.controller;

import java.util.List;

import com.innovalife.entity.Usuario;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
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

import com.innovalife.service.UsuarioService;
import com.innovalife.utils.ResourceNotFoundException;

@CrossOrigin(origins = "http://localhost:4200")
@RestController
@RequestMapping("/usuario")
public class UsuarioRestController {

	@Autowired
	private UsuarioService usuarioService;
	
	@GetMapping("/listaUsuarios")
	public List<Usuario> getAll(){
		return usuarioService.getAll();
	}
	
	@PostMapping(value="/guardarUsuario")
	public ResponseEntity<Usuario> save(@RequestBody Usuario usuario){
		Usuario usu = usuarioService.save(usuario);
		return new ResponseEntity<Usuario>(usu, HttpStatus.OK);
	}
	
	@PutMapping("/editar/{cedula}")
	public ResponseEntity<Usuario> update(@PathVariable String cedula, @RequestBody Usuario nuevoUsuario){
		Usuario usuarioExistente = usuarioService.get(cedula);
		
		if(usuarioExistente == null) {
			return new ResponseEntity<Usuario>(HttpStatus.NOT_FOUND);
		}
		
		nuevoUsuario.setCedula(cedula);
		Usuario usu = usuarioService.save(nuevoUsuario);
		return new ResponseEntity<Usuario>(usu, HttpStatus.OK);
	}
	
	@GetMapping("/obtener/{cedula}")
	public ResponseEntity<Usuario> getUsuarioById(@PathVariable String cedula) throws ResourceNotFoundException{
		Usuario usuario = usuarioService.get(cedula);
		
		if(usuario == null) {
			new ResourceNotFoundException("ERROR 404: Usuario no encontrado");
		}
		return ResponseEntity.ok(usuario);
	}
	
	@DeleteMapping("/eliminar/{cedula}")
	public ResponseEntity<Usuario> delete(@PathVariable String cedula){
		Usuario usuario = usuarioService.get(cedula);
		if(usuario != null) {
			usuarioService.delete(cedula);
		}
		else {
			return new ResponseEntity<Usuario>(usuario, HttpStatus.INTERNAL_SERVER_ERROR);
		}
		return new ResponseEntity<Usuario>(usuario, HttpStatus.OK);
	}
	
	
}
