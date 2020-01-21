package com.mjbank.model;

import java.util.Random;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.Table;
import javax.validation.constraints.Max;
import javax.validation.constraints.Min;
import javax.validation.constraints.NotNull;

import org.hibernate.validator.constraints.Length;

@Entity
@Table(name = "Account")
public class Account {

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private int id;
	
	@Column(name = "first_name")
	private String firstName;
	
	@Column(name = "last_name")
	private String lastName;
	
	
	private String address;
	
	@Column(name = "account_number", unique = true)
	private String accountNumber = "1001";
	
	@Min(value = 500)
	@Column(name = "opening_balance")
	private double openingBalance;
	
	private double balance;
	
	@Column(name = "social_security", unique = true)
	private String ssNo;
	
	private static int routingNumber = 051000017;
	
	
//	public Account(String firstName, String lastName, String address, double openingBalance, int ssNo) {
//		super();
//		this.firstName = firstName;
//		this.lastName = lastName;
//		this.address = address;
//		this.openingBalance = openingBalance;
//		this.ssNo = ssNo;
//	}

	public Account() {
		
	}

	public String getFirstName() {
		return firstName;
	}

	public void setFirstName(String firstName) {
		this.firstName = firstName;
	}

	public String getLastName() {
		return lastName;
	}

	public void setLastName(String lastName) {
		this.lastName = lastName;
	}

	public String getAddress() {
		return address;
	}

	public void setAddress(String address) {
		this.address = address;
	}

	public double getOpeningBalance() {
		return openingBalance;
	}

	public void setOpeningBalance(double openingBalance) {
		
		this.openingBalance = openingBalance;
		this.balance = openingBalance;

	}

	public String getSsNo() {
		return ssNo;
	}

	public void setSsNo(String ssNo) {
		this.ssNo = ssNo;
		this.accountNumber = this.accountNumber + ssNo.substring(ssNo.length() - 4);
	}

	public int getId() {
		return id;
	}

	public static int getRoutingNumber() {
		return routingNumber;
	}

	public String getAccountNumber() {
		return accountNumber;
	}

	public double getBalance() {
		return balance;
	}

	public void setBalance(double balance) {
		this.balance = balance;
	}

	
	
	
	
	
}
