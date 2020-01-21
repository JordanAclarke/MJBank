package com.mjbank.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.mjbank.model.Transaction;
import com.mjbank.repository.TransactionRepository;

@Service
public class TransactionService {

	@Autowired
	private TransactionRepository Tr;
	
	public void saveTrans(Transaction t) {
		Tr.save(t);
	}
	
	public List<Transaction> getTrans(int accnum){
		return Tr.findByAccountId(accnum);
	}
}
