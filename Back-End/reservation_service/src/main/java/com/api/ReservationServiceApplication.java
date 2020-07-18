package com.api;

import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.cloud.openfeign.EnableFeignClients;
import org.springframework.context.annotation.Bean;
import org.springframework.data.rest.core.config.RepositoryRestConfiguration;


import com.api.entities.Reservation;

@SpringBootApplication
@EnableFeignClients
public class ReservationServiceApplication {

	public static void main(String[] args) {
		SpringApplication.run(ReservationServiceApplication.class, args);
	}
	
	@Bean
	CommandLineRunner start (
			RepositoryRestConfiguration repositoryRestConfiguration
			) {
		return args ->{
			repositoryRestConfiguration.exposeIdsFor(Reservation.class);
		
			
			

		};
		}

}
