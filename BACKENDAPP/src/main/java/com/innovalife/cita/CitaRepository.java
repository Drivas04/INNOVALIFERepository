package com.innovalife.cita;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface CitaRepository extends JpaRepository<Cita, Integer> {

    Page<Cita> findAll(Pageable pageable);

    Page<Cita> findByUsernameUsuario_Username(String username, Pageable pageable);
}
