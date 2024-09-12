package com.innovalife.entity;

import jakarta.persistence.*;


@Entity
@Table(name="usuario")
public class UsuarioEntity {
	
	@Id
	private String cedula;
	
	@Column(name="nombres")
	private String nombres;
	
	private String apellidos;
	
	private String telefono;
	
	private String direccion;

	public UsuarioEntity(String cedula, String nombres, String apellidos, String telefono, String direccion) {
		this.cedula = cedula;
		this.nombres = nombres;
		this.apellidos = apellidos;
		this.telefono = telefono;
		this.direccion = direccion;
	}

	public String getCedula() {
		return cedula;
	}

	public void setCedula(String cedula) {
		this.cedula = cedula;
	}

	public String getNombres() {
		return nombres;
	}

	public void setNombres(String nombres) {
		this.nombres = nombres;
	}

	public String getApellidos() {
		return apellidos;
	}

	public void setApellidos(String apellidos) {
		this.apellidos = apellidos;
	}

	public String getTelefono() {
		return telefono;
	}

	public void setTelefono(String telefono) {
		this.telefono = telefono;
	}

	public String getDireccion() {
		return direccion;
	}

	public void setDireccion(String direccion) {
		this.direccion = direccion;
	}
	
	
	
}
