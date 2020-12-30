package com.AngularApi.models.dao;

import org.springframework.data.repository.CrudRepository;

import com.AngularApi.models.entity.Cliente;

public interface iClienteDao extends CrudRepository<Cliente, Long> {
	
}
