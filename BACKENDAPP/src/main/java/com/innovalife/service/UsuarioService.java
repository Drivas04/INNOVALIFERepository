package com.innovalife.service;

import com.innovalife.entity.Usuario;
import org.springframework.stereotype.Service;

import com.innovalife.utils.GenericServiceAPI;

@Service
public interface UsuarioService extends GenericServiceAPI<Usuario, String>{

    public Usuario findByEmail(String email);

}
