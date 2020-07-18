package com.api.entities;

import java.util.Collection;

import lombok.Data;

@Data
public class EmbeddedDispo {
	@Data
	public class _Embedded{
		Collection<Disponibilite> disponibilites;
	}
	_Embedded _embedded ;

}
