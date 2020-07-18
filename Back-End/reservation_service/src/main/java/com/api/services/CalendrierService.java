package com.api.services;

import org.springframework.cloud.openfeign.FeignClient;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;

import com.api.entities.Disponibilite;
import com.api.entities.EmbeddedDispo;

@FeignClient(name="DISPONIBILITY-SERVICE")
public interface CalendrierService {
	@GetMapping("/calendriers/{medecinId}")
	Long getCalendrierByMedecinId(@PathVariable(value = "medecinId") Long medecinId);
	
	@GetMapping("/calendriers/{calendrierId}/disponibilites")
	EmbeddedDispo getDisponibilityByCalendrierId(@PathVariable(value = "calendrierId") Long calendrierId);
	

}
