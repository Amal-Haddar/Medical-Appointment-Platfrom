package com.api;

import java.util.ArrayList;
import java.util.Date;

import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.cloud.openfeign.EnableFeignClients;
import org.springframework.context.annotation.Bean;
import org.springframework.data.rest.core.config.RepositoryRestConfiguration;

import com.api.dao.CalendrierRepository;
//import com.api.dao.DisponibiliteRepository;
import com.api.entities.Calendrier;
import com.api.entities.Disponibilite;
import com.api.entities.Medecin;
import com.api.service.MedecinService;

@SpringBootApplication
@EnableFeignClients
public class DisponiblityServiceApplication {

	public static void main(String[] args) {
		SpringApplication.run(DisponiblityServiceApplication.class, args);
	}
	
	@Bean
	CommandLineRunner start (CalendrierRepository calendrierRepository,
			//MedecinService medecinService,
			RepositoryRestConfiguration repositoryRestConfiguration
			//DisponibiliteRepository disponibiliteRepository
			
			) {
		return args ->{
			repositoryRestConfiguration.exposeIdsFor(Calendrier.class);
			repositoryRestConfiguration.exposeIdsFor(Disponibilite.class);
			//Medecin m1=medecinService.findMedecinById(4L);
			//System.out.println(m1);
			
			/*Calendrier c1=calendrierRepository.save(new Calendrier(null,m1.getId(),
					[{title:"work"]));*/
			/*disponibiliteRepository.save(new Disponibilite(null,c1,"time1",new Date(),new Date()));
			disponibiliteRepository.save(new Disponibilite(null,c1,"time2",new Date(),new Date()));
			disponibiliteRepository.save(new Disponibilite(null,c1,"time3",new Date(),new Date()));*/
			

		};
		
	}

}
