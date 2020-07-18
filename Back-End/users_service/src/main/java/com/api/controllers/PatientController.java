package com.api.controllers;

import java.util.Date;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import javax.validation.Valid;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PatchMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.RestController;

import com.api.repository.PatientRepository;
import com.api.exception.ResourceNotFoundException;
import com.api.entities.Medecin;
import com.api.entities.Patient;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.CrossOrigin;



@CrossOrigin(origins = "*", maxAge = 3600)
@RestController
//@PreAuthorize("hasRole('PATIENT')")
public class PatientController {

	@Autowired
	PatientRepository patientRepository;
	
	
	//Afficher tout les patient
	@GetMapping("/patients")
    public List<Patient> index(){
        return patientRepository.findAll();
    }
	
	
	//Ajouter patient
		@PostMapping("/patients")
	    Patient createOrSavePatient(@RequestBody Patient newPatient) {
	        return patientRepository.save(newPatient);
	    }
		

	    
	//Chercher patient par Id   + Exception
	    @GetMapping("/patients/{id}")
	    public ResponseEntity<Patient> getPatientById(@PathVariable(value = "id") Long id)
	        throws ResourceNotFoundException {
	        Patient patient = patientRepository.findById(id)
	          .orElseThrow(() -> new ResourceNotFoundException("Patient introuvable pour cet identifiant :: " + id));
	        return ResponseEntity.ok().body(patient);
	    }
	    
	   
	    
	// Mettre à jour patient + ResourceNotFoundException
	    @PatchMapping("/patients/{id}")
	    public ResponseEntity<Patient> updatePatient(@PathVariable(value = "id") Long patientId,
	         @Valid @RequestBody Patient patientDetails) throws ResourceNotFoundException {
	        Patient patient = patientRepository.findById(patientId)
	        .orElseThrow(() -> new ResourceNotFoundException("Patient introuvable pour cet identifiant :: " + patientId));

	        patient.setNom(patientDetails.getNom());
	        patient.setPrenom(patientDetails.getPrenom());
	        patient.setEmail(patientDetails.getEmail());
	        patient.setPassword(patientDetails.getPassword());
	        patient.setPhoto(patientDetails.getPhoto());
	        patient.setAdresse(patientDetails.getAdresse());
	        patient.setTel(patientDetails.getTel());
	        patient.setDateNaissance(patientDetails.getDateNaissance());
	       
	        final Patient updatedPatient = patientRepository.save(patient);
	        return ResponseEntity.ok(updatedPatient);
	    }
	    
	
	 // Supprimer patient + ResourceNotFoundException
		@DeleteMapping("/patients/{id}")
	    public Map<String, Boolean> deletePatient(@PathVariable(value = "id") Long patientId)
	         throws ResourceNotFoundException {
	        Patient patient = patientRepository.findById(patientId)
	       .orElseThrow(() -> new ResourceNotFoundException("Patient introuvable pour cet identifiant :: " + patientId));
	        patientRepository.delete(patient);
	        Map<String, Boolean> response = new HashMap<>();
	        response.put("Patient supprimé", Boolean.TRUE);
	        return response;
	    }
		
		//Recherche par date naissance
		  @RequestMapping(value = "/patientsDATE/{date}" , method = RequestMethod.GET)
		  public @ResponseBody List<Patient> getPatientDate(@PathVariable("date") Date date) {
		      return patientRepository.findBydateNaissanceContaining(date);
		  }

}
