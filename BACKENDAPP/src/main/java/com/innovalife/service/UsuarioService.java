package com.innovalife.service;

import com.innovalife.entity.Usuario;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.stereotype.Service;

import com.innovalife.utils.GenericServiceAPI;

import java.util.Optional;

@Service
public interface UsuarioService extends GenericServiceAPI<Usuario, String>{

    Usuario findById(String cedula);

    Optional<Usuario> findByUsername(String cedula);

}
