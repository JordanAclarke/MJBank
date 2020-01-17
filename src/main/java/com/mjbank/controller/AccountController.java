package com.mjbank.controller;

import java.util.List;
import java.util.Map;
import java.util.Optional;

import org.json.JSONObject;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.google.gson.Gson;
import com.mjbank.model.Account;
import com.mjbank.service.AccountService;

@RestController
@RequestMapping("/api")
public class AccountController {
	
	@Autowired
	private AccountService accountService;
	
	@GetMapping("/getAllAccounts")
	public List<Account> getAllAccounts() {
		List<Account> accountList = accountService.getAllAccounts();
		return accountList;
	}
	
	@GetMapping("/getAccount/{singleId}")
	public Optional<Account> getSingleAccount(@PathVariable int singleId) {
		return accountService.getByAccountId(singleId);
	}
	
	@PostMapping("/addAccount")
	public ResponseEntity<?> addAccount(@RequestBody Account account) {
		if(account.getOpeningBalance() < 500) {
			return new ResponseEntity<>(HttpStatus.NOT_ACCEPTABLE);
		} else {
		accountService.addAccount(account);
		Account newAccount = account;
		return new ResponseEntity<Account>(newAccount, HttpStatus.OK);
		}
	}
	
	@PutMapping("/updateAccountAddress/{id}")
	public ResponseEntity<String> updateAccountAddress(@PathVariable int id, @RequestBody Map<String, String> address) {
		Account newAccount = accountService.getByAccountId(id).get();
//		Testing Purposes
		String test = address.values().toString();
		newAccount.setAddress(test.substring(1, test.length() - 1));
//		Testing Purposes
		accountService.updateAccount(newAccount);
		return new ResponseEntity<String>("Successfully Updated", HttpStatus.ACCEPTED);
	}
	
	@PutMapping("/deposit/{id}")
	public ResponseEntity<String> deposit(@PathVariable int id, @RequestParam("balance") double balance) {
		Account newAccount = accountService.getByAccountId(id).get();
//		Testing Purposes
		double newBalance = newAccount.getBalance() + balance;
		newAccount.setBalance(newBalance);
//		Testing Purposes
		accountService.updateAccount(newAccount);
		return new ResponseEntity<String>("Successfully Updated Balance", HttpStatus.ACCEPTED);
	}
	
	@PutMapping("/withdraw/{id}")
	public ResponseEntity<String> withdraw(@PathVariable int id, @RequestParam("balance") double balance) {
		Account newAccount = accountService.getByAccountId(id).get();
//		Testing Purposes
	double oldBalance = newAccount.getBalance();
		if(newAccount.getBalance() > balance) {
		newAccount.setBalance(oldBalance - balance);
//		Testing Purposes
		accountService.updateAccount(newAccount);
		return new ResponseEntity<String>("Successfully Updated Balance", HttpStatus.ACCEPTED);
		} else {
			return new ResponseEntity<String>("Insufficient Funds", HttpStatus.NOT_ACCEPTABLE);
		}
	}
	
//	@PutMapping("/transfer/{id}")
//	public ResponseEntity<String> transfer(@PathVariable int id, @RequestParam("balance") double balance) {
//		Account newAccount = accountService.getByAccountId(id).get();
////		Testing Purposes
//		if(newAccount.getBalance() > balance) {
//		newAccount.setBalance(balance);
////		Testing Purposes
//		accountService.updateAccount(newAccount);
//		return new ResponseEntity<String>("Successfully Updated Balance", HttpStatus.ACCEPTED);
//		} else {
//			return new ResponseEntity<String>("Insufficient Funds", HttpStatus.NOT_ACCEPTABLE);
//		}
//	}
	
	@DeleteMapping("/deleteAccount/{id}")
	public String deleteAccount(@PathVariable int id) {
		accountService.deleteAccount(id);
		return "Account Deleted";
	}
	
	

}
