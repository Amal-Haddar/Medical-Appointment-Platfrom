package com.api.entities;


import java.util.Date;

import javax.persistence.CascadeType;
import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.ManyToOne;

import org.hibernate.annotations.Cascade;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.ToString;


@Entity
@Data
@NoArgsConstructor

@ToString
public class Disponibilite {
	@Id @GeneratedValue(strategy=GenerationType.IDENTITY)
	private Long id;
	@ManyToOne(fetch = FetchType.LAZY)
	private Calendrier calendrier; 
	private String title;
	private Date start;
	private Date end;
	public Disponibilite( Calendrier calendrier,String title,Date start,Date end) {
		this.calendrier=calendrier;
		this.title=title;
		this.start=start;
		this.end=end;
		
	}
	

}
