package com.innovalife.cita;

import com.innovalife.personal.Personal;
import com.innovalife.servicio.Servicio;
import com.innovalife.usuario.Usuario;
import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

import java.time.LocalDate;

@Getter
@Setter
@Entity
public class Cita {
    @Id
    @Column(name = "id", nullable = false)
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;

    @Column(name = "fecha_registro")
    private LocalDate fechaRegistro;

    @Column(name = "fecha_cita")
    private LocalDate fechaCita;

    @Column(name = "estado", length = 50)
    private String estado;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "username_usuario")
    private Usuario usernameUsuario;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "id_servicio")
    private Servicio idServicio;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "cedula_persona_encargada")
    private Personal cedulaPersonaEncargada;

    @Column(name = "descripcion")
    private String descripcion;

}