package com.api.entities;

import javax.persistence.Entity;

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
public class Admin extends User {
	
	private String nom;
	private String prenom;
	private int tel;
	private String photo;
	private int cin;
	
	public Admin (String username, String email, String password,String nom,
			 String prenom,String photo,int tel, int cin) {
	        
		 super(username,email,password);
	       
	        this.nom=nom;
	        this.prenom=prenom;
	        this.tel=tel;
	        this.photo=photo;
	        this.cin=cin;
	        
	    }

}
