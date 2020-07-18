package com.api.entities;
import java.util.Collection;

import javax.persistence.CascadeType;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.OneToMany;
import javax.persistence.Transient;

import com.api.entities.Disponibilite;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.ToString; 

@Entity
@Data
@NoArgsConstructor
@ToString
public class Calendrier {
	@Id @GeneratedValue(strategy=GenerationType.IDENTITY)
	private Long id;
	private Long medecinId;
	@OneToMany(mappedBy="calendrier", cascade = CascadeType.ALL)
	private Collection<Disponibilite> disponibilites;
	public Calendrier(Long medecinId,Collection<Disponibilite>disponibilites){
		this.medecinId=medecinId;
		this.disponibilites=disponibilites;
	}
	
	
	

}
