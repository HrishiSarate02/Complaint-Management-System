package com.example.demo.services;

import java.util.*;  

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.bind.annotation.GetMapping;

import com.example.demo.model.User;
import com.example.demo.repo.CrudRepo;

@Service
public class CrudService {

	@Autowired
	private CrudRepo repo;
	

	public List<User> fetchcomplainList(){
		return repo.findAll(); 
	}
	
	public List<User> fetchComplaintsByStatus(String status) {
	    return repo.findByStatus(status);
	}
	
	public User saveComplainToDB(User product) {
		return repo.save(product);
		
	}
	
	public Optional<User> fetchComplainToById(long id) {
		return repo.findById(id);
		 
	}
	
	  public void updateComplain(User user) {
	        repo.save(user); // Save the updated complain
	    }
	  
	public List<User> updateComplaintsStatus(List<User> complaints) {
	    return repo.saveAll(complaints); // Save all complaints with updated status
	}
	
	public String deleteComplainToById(long id) {
		
		String result;
	try {
		repo.deleteById(id);
		result = "Complain deleted successfully";
	}catch(Exception e) {
		result = "Complain with id is not deleted";
	}
		
		return result;
	
	
	
}
	
}
