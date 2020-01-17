package com.mjbank.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

import com.mjbank.model.Account;

@Repository
public interface AccountRepository extends CrudRepository<Account, Integer>  {

}
