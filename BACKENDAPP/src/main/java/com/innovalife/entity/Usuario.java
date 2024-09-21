package com.innovalife.entity;

import com.innovalife.utils.Role;
import jakarta.persistence.*;
import lombok.*;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;

import java.io.Serializable;
import java.util.Collection;
import java.util.List;

@Builder
@NoArgsConstructor
@AllArgsConstructor
@Data
@Entity
@Table(name = "usuario")
public class Usuario implements UserDetails {
    @Id
    @Column(name = "username", nullable = false, length = 20)
    private String username;

    @Column(name = "names", length = 100)
    private String names;

    @Column(name = "lastNames", length = 100)
    private String lastNames;

    @Column(name = "phone", length = 20)
    private String phone;

    @Column(name = "email", length = 100)
    private String email;

    @Column(name = "password", length = 100)
    private String password;

    @Column(name = "role", length = 8)
    @Enumerated(EnumType.STRING)
    private Role role;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "NIT_entidad")
    private Entidad nitEntidad;

    @Override
    public Collection<? extends GrantedAuthority> getAuthorities() {
        return List.of(new SimpleGrantedAuthority(role.name()));
    }

    @Override
    public String getPassword() {
        return "";
    }

}