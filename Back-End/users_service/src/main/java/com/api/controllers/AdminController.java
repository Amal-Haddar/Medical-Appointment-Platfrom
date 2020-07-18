package com.api.controllers;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import javax.validation.Valid;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PatchMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import com.api.entities.Admin;
import com.api.exception.ResourceNotFoundException;
import com.api.repository.AdminRepository;

@CrossOrigin(origins = "*", maxAge = 3600)
@RestController
public class AdminController {
	
	@Autowired
	AdminRepository adminRepository;
	
	   //Afficher tout les admins
	  	@GetMapping("/admins")
	    public List<Admin> index(){
	        return adminRepository.findAll();
	    }
		
		
		//Ajouter admin
			@PostMapping("/admins")
		    Admin createOrSaveAdmin(@RequestBody Admin newAdmin) {
		        return adminRepository.save(newAdmin);
		    }
			

		    
		//Chercher admin par Id   + Exception
		    @GetMapping("/admins/{id}")
		    public ResponseEntity<Admin> getPatientById(@PathVariable(value = "id") Long id)
		        throws ResourceNotFoundException {
		        Admin admin = adminRepository.findById(id)
		          .orElseThrow(() -> new ResourceNotFoundException("Admin introuvable pour cet identifiant :: " + id));
		        return ResponseEntity.ok().body(admin);
		    }
		    
		   
		    
		// Mettre à jour admin + ResourceNotFoundException
		    @PatchMapping("/admins/{id}")
		    public ResponseEntity<Admin> updateAdmin(@PathVariable(value = "id") Long adminId,
		         @Valid @RequestBody Admin adminDetails) throws ResourceNotFoundException {
		        Admin admin = adminRepository.findById(adminId)
		        .orElseThrow(() -> new ResourceNotFoundException("Admin introuvable pour cet identifiant :: " + adminId));

		        admin.setNom(adminDetails.getNom());
		        admin.setPrenom(adminDetails.getPrenom());
		        admin.setEmail(adminDetails.getEmail());
		        admin.setPassword(adminDetails.getPassword());
		        admin.setPhoto(adminDetails.getPhoto());
		        admin.setTel(adminDetails.getTel());
		        admin.setCin(adminDetails.getCin());
		        
		       
		        final Admin updatedAdmin = adminRepository.save(admin);
		        return ResponseEntity.ok(updatedAdmin);
		    }
		    
		
		 // Supprimer admin + ResourceNotFoundException
			@DeleteMapping("/admins/{id}")
		    public Map<String, Boolean> deleteAdmin(@PathVariable(value = "id") Long adminId)
		         throws ResourceNotFoundException {
		        Admin admin = adminRepository.findById(adminId)
		       .orElseThrow(() -> new ResourceNotFoundException("Admin introuvable pour cet identifiant :: " + adminId));
		        adminRepository.delete(admin);
		        Map<String, Boolean> response = new HashMap<>();
		        response.put("Admin supprimé", Boolean.TRUE);
		        return response;
		    }

}
