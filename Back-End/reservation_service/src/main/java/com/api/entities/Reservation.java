package com.api.entities;

import java.util.Collection;
import java.util.Date;

import javax.persistence.CascadeType;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.OneToMany;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.ToString;

@Entity
@Data
@AllArgsConstructor
@NoArgsConstructor
@ToString
public class Reservation {
	@Id @GeneratedValue(strategy=GenerationType.IDENTITY)
	private Long id;
	private Long medecinId;
	private Long patientId;
	private String commentaire;
	private Date start;
	private Date end;
	
	

}
