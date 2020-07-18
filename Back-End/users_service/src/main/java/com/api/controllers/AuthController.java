package com.api.controllers;

import java.util.HashSet;
import java.util.List;
import java.util.Set;
import java.util.stream.Collectors;

import javax.validation.Valid;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.api.entities.Admin;
import com.api.entities.ERole;
import com.api.entities.Medecin;
import com.api.entities.Patient;
import com.api.entities.Role;
import com.api.entities.User;
import com.api.payload.request.LoginRequest;
import com.api.payload.request.SignupRequest;
import com.api.payload.response.JwtResponse;
import com.api.payload.response.MessageResponse;
import com.api.repository.RoleRepository;
import com.api.repository.UserRepository;
import com.api.repository.AdminRepository;
import com.api.repository.MedecinRepository;
import com.api.repository.PatientRepository;
import com.api.security.jwt.JwtUtils;
import com.api.security.services.UserDetailsImpl;

@CrossOrigin(origins = "*", maxAge = 3600)
@RestController
@RequestMapping("/api/auth")
public class AuthController {
	@Autowired
	AuthenticationManager authenticationManager;

	@Autowired
	UserRepository userRepository;

	@Autowired
	RoleRepository roleRepository;
	
	@Autowired
	MedecinRepository medecinRepository;
	
	@Autowired
	PatientRepository patientRepository;
	
	@Autowired
	AdminRepository adminRepository;

	@Autowired
	PasswordEncoder encoder;

	@Autowired
	JwtUtils jwtUtils;

	@PostMapping("/signin")
	public ResponseEntity<?> authenticateUser(@Valid @RequestBody LoginRequest loginRequest) {

		Authentication authentication = authenticationManager.authenticate(
				new UsernamePasswordAuthenticationToken(loginRequest.getUsername(), loginRequest.getPassword()));

		SecurityContextHolder.getContext().setAuthentication(authentication);
		String jwt = jwtUtils.generateJwtToken(authentication);
		
		UserDetailsImpl userDetails = (UserDetailsImpl) authentication.getPrincipal();		
		List<String> roles = userDetails.getAuthorities().stream()
				.map(item -> item.getAuthority())
				.collect(Collectors.toList());

		return ResponseEntity.ok(new JwtResponse(jwt, 
												 userDetails.getId(), 
												 userDetails.getUsername(), 
												 userDetails.getEmail(), 
												 roles));
	}

	@PostMapping("/signup")
	public ResponseEntity<?> registerUser(@Valid @RequestBody SignupRequest signUpRequest) {
		//System.out.println(signUpRequest.getRole());
		if (userRepository.existsByUsername(signUpRequest.getUsername())) {
			return ResponseEntity
					.badRequest()
					.body(new MessageResponse("Error: Ce nom d'utilisateur est déjà utilisé!"));
		}

		if (userRepository.existsByEmail(signUpRequest.getEmail())) {
			return ResponseEntity
					.badRequest()
					.body(new MessageResponse("Error: Cet email est déjà utilisé!"));
		}

		// Create new user's account
		User user = new User(signUpRequest.getUsername(), 
							 signUpRequest.getEmail(),
							 encoder.encode(signUpRequest.getPassword()));

		Set<String> strRoles = signUpRequest.getRole();
		Set<Role> roles = new HashSet<>();

		if (strRoles == null) {
			Role userRole = roleRepository.findByName(ERole.ROLE_USER)
					.orElseThrow(() -> new RuntimeException("Error: Role is not found."));
			roles.add(userRole);
			user.setRoles(roles);
			userRepository.save(user);
		} else {
			strRoles.forEach(role -> {
				switch (role) {
				case "admin":
					Role adminRole = roleRepository.findByName(ERole.ROLE_ADMIN)
							.orElseThrow(() -> new RuntimeException("Error: Role is not found."));
					roles.add(adminRole);
					Admin admin = new Admin(signUpRequest.getUsername(), 
							 signUpRequest.getEmail(),
							 encoder.encode(signUpRequest.getPassword()),signUpRequest.getNom(),signUpRequest.getPrenom(),signUpRequest.getPhoto(),
							 
							 signUpRequest.getTel(),signUpRequest.getCin()
							 );
					admin.setRoles(roles);
					adminRepository.save(admin);

					break;
				case "mod":
					Role modRole = roleRepository.findByName(ERole.ROLE_MODERATOR)
							.orElseThrow(() -> new RuntimeException("Error: Role is not found."));
					roles.add(modRole);
					user.setRoles(roles);
					userRepository.save(user);

					break;
				case "medecin":
					Role medecinRole = roleRepository.findByName(ERole.ROLE_MEDECIN)
							.orElseThrow(() -> new RuntimeException("Error: Role is not found."));
					roles.add(medecinRole);
					Medecin medecin = new Medecin(signUpRequest.getUsername(), 
							 signUpRequest.getEmail(),
							 encoder.encode(signUpRequest.getPassword()),signUpRequest.getCin(),signUpRequest.getNom(),
							 signUpRequest.getPrenom(),signUpRequest.getPhoto(),signUpRequest.getAdresse(),
							 signUpRequest.getTel(),signUpRequest.getSpecialite(),signUpRequest.getPrixVisite()
							 );
					medecin.setRoles(roles);
					medecinRepository.save(medecin);

					break;
				case "patient":
					Role patientRole = roleRepository.findByName(ERole.ROLE_PATIENT)
							.orElseThrow(() -> new RuntimeException("Error: Role is not found."));
					roles.add(patientRole);
					Patient patient = new Patient(signUpRequest.getUsername(), 
							 signUpRequest.getEmail(),
							 encoder.encode(signUpRequest.getPassword()),signUpRequest.getNom(),
							 signUpRequest.getPrenom(),signUpRequest.getPhoto(),signUpRequest.getAdresse(),
							 signUpRequest.getTel(),signUpRequest.getDateNaissance()
							 );
					patient.setRoles(roles);
					patientRepository.save(patient);

					break;
				default:
					Role userRole = roleRepository.findByName(ERole.ROLE_USER)
							.orElseThrow(() -> new RuntimeException("Error: Role is not found."));
					roles.add(userRole);
					user.setRoles(roles);
					userRepository.save(user);
				}
			});
		}

		

		return ResponseEntity.ok(new MessageResponse("User registered successfully!"));
	}
}
