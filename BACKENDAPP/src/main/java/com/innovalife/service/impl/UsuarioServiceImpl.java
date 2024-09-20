package com.innovalife.service.impl;

import com.innovalife.entity.Usuario;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.repository.CrudRepository;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.stereotype.Service;

import com.innovalife.repository.UsuarioRepository;
import com.innovalife.service.UsuarioService;
import com.innovalife.utils.GenericServiceImpl;

import java.util.Optional;

@Service
public class UsuarioServiceImpl extends GenericServiceImpl<Usuario, String> implements UsuarioService{

	@Autowired
	private UsuarioRepository usuarioRepository;
	
	@Override
	public CrudRepository<Usuario, String> getDao() {
		return usuarioRepository;
	}


	@Override
	public Usuario findById(String cedula) {
		return null;
	}

	@Override
	public Optional<Usuario> findByUsername(String cedula) {
		return Optional.empty();
	}


}
