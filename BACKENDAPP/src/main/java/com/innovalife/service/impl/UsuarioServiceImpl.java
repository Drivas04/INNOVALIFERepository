package com.innovalife.service.impl;

import com.innovalife.entity.Usuario;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Service;

import com.innovalife.repository.UsuarioRepository;
import com.innovalife.service.UsuarioService;
import com.innovalife.utils.GenericServiceImpl;

@Service
public class UsuarioServiceImpl extends GenericServiceImpl<Usuario, String> implements UsuarioService{

	@Autowired
	private UsuarioRepository usuarioRepository;
	
	@Override
	public CrudRepository<Usuario, String> getDao() {
		return usuarioRepository;
	}

	@Override
	public Usuario findByEmail(String email) {
		return null;
	}
}
