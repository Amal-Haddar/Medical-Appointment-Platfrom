package com.api.entities;

import java.util.Date;

import javax.persistence.Entity;
import javax.persistence.Temporal;
import javax.persistence.TemporalType;

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
public class Patient extends User {
	private String nom;
	private String prenom;
	private String photo;
	private String adresse;
	private int tel;
	@Temporal(TemporalType.DATE)
	private Date dateNaissance;
	public Patient(String username, String email, String password,String nom,
			 String prenom,String photo,String adresse,int tel,Date dateNaissance ) {
	        
		 super(username,email,password);
	        this.nom=nom;
	        this.prenom=prenom;
	        this.photo=photo;
	        this.adresse=adresse;
	        this.tel=tel;
	        this.dateNaissance=dateNaissance;
	        
	        
	        
	    }

}
