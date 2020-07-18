package com.api.controllers;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import javax.validation.Valid;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.ui.ModelMap;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PatchMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.RestController;
import com.api.repository.MedecinRepository;
import com.api.exception.ResourceNotFoundException;
import com.api.entities.Medecin;

@CrossOrigin(origins = "*", maxAge = 3600)
@RestController
//@PreAuthorize("hasRole('MEDECIN')")
public class MedecinController {
	
	@Autowired
	MedecinRepository medecinRepository;
	
	
	
	//afficher tout les medecins
	
	  @GetMapping("/medecins") public List<Medecin> index(){ return
	  medecinRepository.findAll(); }
	 
	
	
	
	//Ajouter medecin
	@PostMapping("/medecins")
    Medecin createOrSaveMedecin(@RequestBody Medecin newMedecin) {
      return medecinRepository.save(newMedecin);
  }

	
	
	//Chercher medecin par Id   + Exception
  @GetMapping("/medecins/{id}")
      public ResponseEntity<Medecin> getMedecinById(@PathVariable(value = "id") Long id)
      throws ResourceNotFoundException {
      Medecin medecin = medecinRepository.findById(id)
        .orElseThrow(() -> new ResourceNotFoundException("Medecin introuvable pour cet identifiant :: " + id));
      return ResponseEntity.ok().body(medecin);
  }
  
  
  
  // Mettre à jour medecin + ResourceNotFoundException
  @PutMapping("/medecins/{id}")
  public ResponseEntity<Medecin> updateMedecin(@PathVariable(value = "id") Long medecinId,
       @Valid @RequestBody Medecin medecinDetails) throws ResourceNotFoundException {
      Medecin medecin = medecinRepository.findById(medecinId)
      .orElseThrow(() -> new ResourceNotFoundException("Medecin introuvable pour cet identifiant :: " + medecinId));

      medecin.setNom(medecinDetails.getNom());
      medecin.setPrenom(medecinDetails.getPrenom());
      medecin.setEmail(medecinDetails.getEmail());
      medecin.setPassword(medecinDetails.getPassword());
      medecin.setPhoto(medecinDetails.getPhoto());
      medecin.setAdresse(medecinDetails.getAdresse());
      medecin.setTel(medecinDetails.getTel());
      medecin.setCin(medecinDetails.getCin());
      medecin.setSpecialite(medecinDetails.getSpecialite());
      medecin.setPrixVisite(medecinDetails.getPrixVisite());
      final Medecin updatedMedecin = medecinRepository.save(medecin);
      return ResponseEntity.ok(updatedMedecin);
  }
  
  
  
                 // RECHERCHE METHEOD 1 : Par nom + prenom ! 
  @PostMapping("/medecins/search")
  public List<Medecin> search(@RequestBody Map<String, String> body){
      String searchTerm = body.get("text");
      return medecinRepository.findByNomContainingOrPrenomContaining(searchTerm, searchTerm);
  }
  


 
                                // RECHERCHE METHEOD 2 :
  //Recherche par adresse
  @RequestMapping(value = "/medecinsADR/{adr}" , method = RequestMethod.GET)
  public @ResponseBody List<Medecin> getMedecinAdresse(@PathVariable("adr") String adr) {
      return medecinRepository.findByAdresseContaining(adr);
  }
  
//Recherche par spécialité
  @RequestMapping(value = "/medecinsSPC/{spc}" , method = RequestMethod.GET)
  public @ResponseBody List<Medecin> getMedecinSpecialite(@PathVariable("spc") String spc) {
      return medecinRepository.findBySpecialiteContaining(spc);
  }
  
//Recherche par nom
  @RequestMapping(value = "/medecinsPrenom/{prn}" , method = RequestMethod.GET)
  public @ResponseBody List<Medecin> getMedecinNom(@PathVariable("prn") String prn) {
      return medecinRepository.findByPrenomIgnoreCase(prn);
  }


	
	//Supprimer medecin
  
	@DeleteMapping("/medecins/{id}")
  public Map<String, Boolean> deleteMedecin(@PathVariable(value = "id") Long medecinId)
       throws ResourceNotFoundException {
      Medecin medecin = medecinRepository.findById(medecinId)
     .orElseThrow(() -> new ResourceNotFoundException("Medecin introuvable pour cet identifiant :: " + medecinId));
      medecinRepository.delete(medecin);
      Map<String, Boolean> response = new HashMap<>();
      response.put("Medecin supprimé", Boolean.TRUE);
      return response;
  }

}

