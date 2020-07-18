package com.api.dao;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;


import com.api.entities.Reservation;

public interface ReservationRepository extends JpaRepository<Reservation, Long>{
	List<Reservation> findByMedecinId(Long medecinId);
	List<Reservation> findByPatientId(Long patientId);
}
