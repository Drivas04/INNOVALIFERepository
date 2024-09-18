package com.innovalife.repository;

import com.innovalife.entity.Usuario;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface UsuarioRepository extends CrudRepository<Usuario, String>{

    @Override
    Optional<Usuario> findById(String cedula);
}
