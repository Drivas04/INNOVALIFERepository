package com.innovalife.entity;

import jakarta.persistence.*;

@Entity
@Table(name = "dias_atencion_entidad")
public class DiasAtencionEntidad {
    @Id
    @Column(name = "id", nullable = false)
    private Integer id;

    @Column(name = "dia", length = 20)
    private String dia;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "NIT_entidad")
    private Entidad nitEntidad;

    public Integer getId() {
        return id;
    }

    public void setId(Integer id) {
        this.id = id;
    }

    public String getDia() {
        return dia;
    }

    public void setDia(String dia) {
        this.dia = dia;
    }

    public Entidad getNitEntidad() {
        return nitEntidad;
    }

    public void setNitEntidad(Entidad nitEntidad) {
        this.nitEntidad = nitEntidad;
    }

}