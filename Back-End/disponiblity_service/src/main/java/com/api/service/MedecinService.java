package com.api.service;

import org.springframework.cloud.openfeign.FeignClient;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;

import com.api.entities.Medecin;

@FeignClient(name="USERS-SERVICE")
public interface MedecinService {
	@GetMapping("/medecins/{id}")
	public Medecin findMedecinById(@PathVariable(name="id")Long id);

}
