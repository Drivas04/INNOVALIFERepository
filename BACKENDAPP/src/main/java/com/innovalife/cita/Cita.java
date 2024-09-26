package com.innovalife.cita;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import lombok.Getter;
import lombok.Setter;

import java.time.LocalDate;

@Getter
@Setter
@Entity
@Table(name = "cita")
public class Cita {
    @Id
    @Column(name = "id", nullable = false)
    private Integer id;

    @Column(name = "fecha_registro")
    private LocalDate fechaRegistro;

    @Column(name = "fecha_cita")
    private LocalDate fechaCita;

    @Column(name = "estado", length = 50)
    private String estado;

}