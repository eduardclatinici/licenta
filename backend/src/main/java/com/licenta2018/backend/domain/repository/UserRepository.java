package com.licenta2018.backend.domain.repository;

import javax.transaction.Transactional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import com.licenta2018.backend.domain.model.user.User;

@Repository
@Transactional
public interface UserRepository extends JpaRepository<User,Long> {

    @Query("SELECT au FROM User au WHERE au.email = ?1")
    User findAppUserByEmail(String email);
}
