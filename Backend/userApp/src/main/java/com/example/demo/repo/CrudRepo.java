package com.example.demo.repo;


import java.util.List;

import org.springframework.data.mongodb.repository.MongoRepository; 

import com.example.demo.model.User;

public interface CrudRepo extends MongoRepository<User, Long> {
	List<User> findByStatus(String status);
	
}
