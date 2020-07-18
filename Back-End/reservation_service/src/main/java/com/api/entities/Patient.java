package com.api.entities;

import java.util.Date;

import javax.persistence.Entity;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.EqualsAndHashCode;
import lombok.NoArgsConstructor;
import lombok.ToString;


@Data

public class Patient {
	private Long id;
	private String username;
	private String email;
	private String nom;
	private String prenom;
	private String photo;
	private String adresse;
	private int tel;
	private Date dateNaissance;
	

}
