package com.api.entities;


import java.util.Date;
import javax.persistence.FetchType;
import javax.persistence.ManyToOne;
import lombok.Data;




@Data



public class Disponibilite {
	private Long id;
	//@ManyToOne(fetch = FetchType.LAZY)
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
