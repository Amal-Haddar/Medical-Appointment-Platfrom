package com.api.repository;

import java.util.Date;
import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.rest.core.annotation.RepositoryRestResource;

import com.api.entities.Patient;

@RepositoryRestResource
public interface PatientRepository extends JpaRepository<Patient, Long>{
	
	List<Patient> findBydateNaissanceContaining(Date date);
	
}
