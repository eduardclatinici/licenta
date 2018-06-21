package com.licenta2018.backend.domain.repository;

import javax.transaction.Transactional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import com.licenta2018.backend.domain.model.user.Client;

@Repository
@Transactional
public interface AppUserRepository extends JpaRepository<Client,Long> {

    @Query("SELECT au FROM Client au WHERE au.email = ?1")
    Client findAppUserByEmail(String email);
}
