package com.innovalife.entity;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
@Entity
@Table(name = "entidad")
public class Entidad {
    @Id
    @Column(name = "NIT", nullable = false, length = 20)
    private String nit;

    @Column(name = "nombre", length = 100)
    private String nombre;

    @Column(name = "bloque_atencion", length = 50)
    private String bloqueAtencion;

}