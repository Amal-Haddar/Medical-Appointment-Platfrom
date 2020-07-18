package com.api.payload.request;

import java.util.Date;
import java.util.Set;

import javax.validation.constraints.*;

import lombok.Data;

@Data
public class SignupRequest {
    @NotBlank
    @Size(min = 3, max = 20)
    private String username;
 
    @NotBlank
    @Size(max = 50)
    @Email
    private String email;
    
    private Set<String> role;
    
    @NotBlank
    @Size(min = 6, max = 40)
    private String password;
    
    private int cin;
    
    private String nom;
	private String prenom;
	private String photo;
	private String adresse;
	private int tel;
	
	private String specialite;
	private double prixVisite;
	private Date dateNaissance;
	
  
    
}
