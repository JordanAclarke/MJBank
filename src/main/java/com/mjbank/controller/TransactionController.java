package com.mjbank.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.mjbank.model.Transaction;
import com.mjbank.service.TransactionService;

@CrossOrigin(origins = "http://localhost:3000", maxAge = 3600)
@RestController
@RequestMapping("/api")
public class TransactionController {
	
	@Autowired
	private TransactionService transactionService;
	
	
	@GetMapping("/transactions/{accountnumber}")
	public List<Transaction> getTransaction(@PathVariable(name="accountnumber") int accountNumber){
		return transactionService.getTrans(accountNumber);
	}
}
