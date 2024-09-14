package com.innovalife.entity;

import jakarta.persistence.*;

import java.time.LocalDate;

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

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "cedula_usuario")
    private Usuario cedulaUsuario;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "id_servicio")
    private Servicio idServicio;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "cedula_persona_encargada")
    private Personal cedulaPersonaEncargada;

    public Integer getId() {
        return id;
    }

    public void setId(Integer id) {
        this.id = id;
    }

    public LocalDate getFechaRegistro() {
        return fechaRegistro;
    }

    public void setFechaRegistro(LocalDate fechaRegistro) {
        this.fechaRegistro = fechaRegistro;
    }

    public LocalDate getFechaCita() {
        return fechaCita;
    }

    public void setFechaCita(LocalDate fechaCita) {
        this.fechaCita = fechaCita;
    }

    public String getEstado() {
        return estado;
    }

    public void setEstado(String estado) {
        this.estado = estado;
    }

    public Usuario getCedulaUsuario() {
        return cedulaUsuario;
    }

    public void setCedulaUsuario(Usuario cedulaUsuario) {
        this.cedulaUsuario = cedulaUsuario;
    }

    public Servicio getIdServicio() {
        return idServicio;
    }

    public void setIdServicio(Servicio idServicio) {
        this.idServicio = idServicio;
    }

    public Personal getCedulaPersonaEncargada() {
        return cedulaPersonaEncargada;
    }

    public void setCedulaPersonaEncargada(Personal cedulaPersonaEncargada) {
        this.cedulaPersonaEncargada = cedulaPersonaEncargada;
    }

}