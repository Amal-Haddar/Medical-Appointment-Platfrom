package com.api.dao;

import org.springframework.data.jpa.repository.JpaRepository;

import org.springframework.data.rest.core.annotation.RepositoryRestResource;

import com.api.entities.Calendrier;
import com.api.entities.Disponibilite;
import java.util.ArrayList;

@RepositoryRestResource
public interface DisponibiliteRepository extends JpaRepository<Disponibilite, Long>{
	void deleteByCalendrier(Calendrier c);

}
