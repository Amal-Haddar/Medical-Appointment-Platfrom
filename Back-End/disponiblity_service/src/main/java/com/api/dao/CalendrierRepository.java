package com.api.dao;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.rest.core.annotation.RepositoryRestResource;

import com.api.entities.Calendrier;

@RepositoryRestResource
public interface CalendrierRepository extends JpaRepository<Calendrier, Long>{
	Calendrier findByMedecinId(Long medecinId);

}
