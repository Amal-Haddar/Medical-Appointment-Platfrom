package com.api.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.rest.core.annotation.RepositoryRestResource;

import com.api.entities.Admin;

@RepositoryRestResource
public interface AdminRepository extends JpaRepository<Admin, Long> {

}
