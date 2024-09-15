package com.innovalife.entity;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.Table;

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

    public String getNit() {
        return nit;
    }

    public void setNit(String nit) {
        this.nit = nit;
    }

    public String getNombre() {
        return nombre;
    }

    public void setNombre(String nombre) {
        this.nombre = nombre;
    }

    public String getBloqueAtencion() {
        return bloqueAtencion;
    }

    public void setBloqueAtencion(String bloqueAtencion) {
        this.bloqueAtencion = bloqueAtencion;
    }

}