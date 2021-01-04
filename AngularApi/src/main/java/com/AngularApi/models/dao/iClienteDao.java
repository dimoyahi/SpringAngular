package com.AngularApi.models.dao;

import org.springframework.data.jpa.repository.JpaRepository;

import com.AngularApi.models.entity.Cliente;

public interface iClienteDao extends JpaRepository<Cliente, Long> {
	
}
