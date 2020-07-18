package com.api.controller;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PatchMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import com.api.dao.ReservationRepository;
import com.api.entities.Medecin;
import com.api.entities.Patient;
import com.api.entities.Reservation;

@CrossOrigin(origins = "*")
@RestController
public class ReservationController {
	@Autowired
	ReservationRepository reservationRepository;
	
	
		@PostMapping("/reservations")
		Reservation createOrSaveReservation(@RequestBody Reservation newReservation) {
	      return reservationRepository.save(newReservation);
	  }
		
		
		@GetMapping("/reservations") 
		public List<Reservation> getAllReservations(){ return
				reservationRepository.findAll(); }
		
		
		@GetMapping("/mesReservations/{id}") 
		public List<Reservation> getAllReservationsByPatient(@PathVariable(value = "id") Long id){ 	
			return
				reservationRepository.findByPatientId(id); }
		
		@GetMapping("/mesReservationsMedecin/{id}") 
		public List<Reservation> getAllReservationsByMedecin(@PathVariable(value = "id") Long id){ return
				reservationRepository.findByMedecinId(id); }
		
		@PatchMapping("/reservations") 
		public Reservation updateReservation(@RequestBody Reservation r){ return
				reservationRepository.save(r); }
		
		@DeleteMapping("/reservations/{id}") 
		public void DeleteReservation(@PathVariable(value = "id") Long id){ 
				reservationRepository.deleteById(id); }
		
		
		
		
		
		
	

}
