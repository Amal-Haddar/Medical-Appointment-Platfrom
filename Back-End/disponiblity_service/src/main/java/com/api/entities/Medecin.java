package com.api.entities;


import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;

import lombok.Data;


@Data
public class Medecin {
	private Long id;
	private String username;
	private String email;
	private int cin;
	private String nom;
	private String prenom;
	private String photo;
	private String adresse;
	private int tel;
	private String spécialité;
	private double prixVisite;
	
	

}
