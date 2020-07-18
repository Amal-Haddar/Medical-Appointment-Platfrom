package com.api.controller;


import java.util.ArrayList;


import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PatchMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import com.api.dao.CalendrierRepository;
import com.api.dao.DisponibiliteRepository;
import com.api.entities.Calendrier;
import com.api.entities.Disponibilite;
import com.api.exception.ResourceNotFoundException;


@CrossOrigin(origins = "*")
@RestController
public class CalendrierController {
	@Autowired
	CalendrierRepository calendrierRepository;
	@Autowired
	DisponibiliteRepository disponibiliteRepository;
	
	//create a calendar by medecinId
    //@PostMapping("/calendriers/{medecinId}")
   	Calendrier createCalendrier( Long medecinId, ArrayList<Disponibilite> dispo) {
	   Calendrier c1=calendrierRepository.save(new Calendrier(medecinId,dispo));
	  
	  for(int i=0;i<dispo.size();i++) {
		   //dispo.get(0).setCalendrier(c1);
		   disponibiliteRepository.save(new Disponibilite(c1,dispo.get(i).getTitle(),
				   dispo.get(i).getStart(),dispo.get(i).getEnd()));
	   }
	   return c1;	
		}
   
  //get calendrier by medecinId
   @GetMapping("/calendriers/{medecinId}")
   	Long getCalendrierByMedecinId(@PathVariable(value = "medecinId") Long medecinId)
        {
       Calendrier calendrier = calendrierRepository.findByMedecinId(medecinId);
       if (calendrier !=null) {
    	   return calendrier.getId();
       }else {
    	   return null;
       }
        
    		  
   }
   
   @PatchMapping("/calendriers/{medecinId}")  
	Calendrier updateCalendrier(@PathVariable(value = "medecinId") Long medecinId,
			   @RequestBody ArrayList<Disponibilite> dispo) {
	   		Calendrier c1= calendrierRepository.findByMedecinId(medecinId);
	   		if(c1!=null) {
	   	
	   			calendrierRepository.deleteById(c1.getId());
	   			disponibiliteRepository.deleteByCalendrier(c1);
	   			}
	   			
	   			
	   		
	   		c1=createCalendrier(medecinId,dispo);
		  
		  
		   return c1;	
			}
}
