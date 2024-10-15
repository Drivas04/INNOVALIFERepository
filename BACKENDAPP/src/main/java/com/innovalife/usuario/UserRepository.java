package com.innovalife.usuario;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface UserRepository extends JpaRepository<Usuario,String> {

    Optional<Usuario> findByUsername(String username);

    Optional<Usuario> findByEmail(String email);
}
