package com.innovalife.personal;

import com.innovalife.entity.Entidad;
import com.innovalife.usuario.Usuario;
import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
@Entity
public class Personal {
    @Id
    @Column(name = "cedula", nullable = false, length = 20)
    private String cedula;

    @MapsId
    @OneToOne(fetch = FetchType.LAZY, optional = false)
    @JoinColumn(name = "cedula", nullable = false)
    private Usuario usuario;

    @Column(name = "nombres", length = 100)
    private String nombres;

    @Column(name = "apellidos", length = 100)
    private String apellidos;

    @Column(name = "telefono", length = 20)
    private String telefono;

    @Column(name = "email", length = 100)
    private String email;

    @Column(name = "cargo", length = 50)
    private String cargo;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "NIT_entidad")
    private Entidad nitEntidad;

}