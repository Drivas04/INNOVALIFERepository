package com.innovalife.entity;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
@Entity
@Table(name = "servicio")
public class Servicio {
    @Id
    @Column(name = "id", nullable = false)
    private Integer id;

    @Column(name = "nombre", length = 100)
    private String nombre;

    @Lob
    @Column(name = "descripcion")
    private String descripcion;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "NIT_entidad")
    private Entidad nitEntidad;

}