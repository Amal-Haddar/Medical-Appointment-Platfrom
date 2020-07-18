package com.api.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.rest.core.annotation.RepositoryRestResource;

import com.api.entities.Medecin;

@RepositoryRestResource
public interface MedecinRepository extends JpaRepository<Medecin, Long> {
	
	// custom query to search doctor by spécialité or adresse
    List<Medecin> findByNomContainingOrPrenomContaining(String text , String textAgain);
	
	
	List<Medecin> findByAdresseContaining(String adresse);
	List<Medecin> findByPrenomIgnoreCase(String nom);
	List<Medecin> findBySpecialiteContaining(String specialite);
}
