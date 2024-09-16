package com.innovalife.entity;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class RegisterRequest {
    private String cedula;
    private String nombres;
    private String apellidos;
    private String telefono;
    private String email;
    private String password;
}
