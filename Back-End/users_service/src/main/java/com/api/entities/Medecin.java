package com.api.entities;

import javax.persistence.Entity;

import com.api.entities.Medecin;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.EqualsAndHashCode;
import lombok.NoArgsConstructor;
import lombok.ToString;

@Entity
@Data
@EqualsAndHashCode(callSuper = true)
@NoArgsConstructor
@AllArgsConstructor
@ToString
public class Medecin extends User {
	private int cin;
	private String nom;
	private String prenom;
	private String photo;
	private String adresse;
	private int tel;
	private String specialite;
	private double prixVisite;
	
	public Medecin(String username, String email, String password,int cin,String nom,
			 String prenom,String photo,String adresse,int tel,String specialite,double prixVisite) {
	        
		 super(username,email,password);
	        this.cin=cin;
	        this.nom=nom;
	        this.prenom=prenom;
	        this.photo=photo;
	        this.adresse=adresse;
	        this.tel=tel;
	        this.specialite=specialite;
	        this.prixVisite=prixVisite;
	    }

}
