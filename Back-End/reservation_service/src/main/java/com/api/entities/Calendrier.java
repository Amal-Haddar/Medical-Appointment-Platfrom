package com.api.entities;
import java.util.Collection;

import javax.persistence.CascadeType;
import javax.persistence.OneToMany;
import com.api.entities.Disponibilite;
import lombok.Data;



@Data
public class Calendrier {
	private Long id;
	private Long medecinId;
	//@OneToMany(mappedBy="calendrier", cascade = CascadeType.ALL)
	private Collection<Disponibilite> disponibilites;
	public Calendrier(Long medecinId,Collection<Disponibilite>disponibilites){
		this.medecinId=medecinId;
		this.disponibilites=disponibilites;
	}
	
	
	

}
