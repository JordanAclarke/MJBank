package com.mjbank.service;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.mjbank.model.Account;
import com.mjbank.repository.AccountRepository;

@Service
public class AccountService {

	@Autowired
	private AccountRepository accountRepository;
	
	public List getAllAccounts() {
		return (List) accountRepository.findAll();
	}
	public void addAccount(Account account) {
		accountRepository.save(account);
	}
	public void deleteAccount(int id) {
		accountRepository.deleteById(id);
	}
	public Optional<Account> getByAccountId(int id) {
		return accountRepository.findById(id);
	}
	public void updateAccount(Account account) {
		accountRepository.save(account);
	}
	public Account getbyno(String accno) {
		return accountRepository.findByAccountNumber(accno).get();
	}
}
