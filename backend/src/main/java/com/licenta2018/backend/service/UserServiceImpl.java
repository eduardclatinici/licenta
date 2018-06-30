package com.licenta2018.backend.service;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.PageRequest;
import org.springframework.stereotype.Service;


import com.licenta2018.backend.domain.model.user.User;
import com.licenta2018.backend.domain.repository.UserRepository;
import com.licenta2018.backend.domain.transformer.UserTransformer;
import com.licenta2018.backend.exceptions.AppUserNotFoundException;
import com.licenta2018.backend.service.interfaces.UserService;

@Service
public class UserServiceImpl implements UserService {

    @Autowired
    UserRepository repository;
    @Autowired
    UserTransformer userTransformer;

    public User getByEmail(String email){
        return repository.findAppUserByEmail(email);
    }

    @Override
    public void save(User entity) {
        this.repository.save(entity);
    }

    @Override
    public List<User> getAll(){
        return this.repository.findAll();
    }

    @Override
    public List<User> getAll(int pageSize, int pageNumber) {
        return repository.findAll(new PageRequest(pageNumber,pageSize)).getContent();
    }

    @Override
    public void deleteAll(){
        this.repository.deleteAll();
    }

    @Override
    public User getById(Long id) throws AppUserNotFoundException {
        Optional<User> user = repository.findById(id);
        if(!user.isPresent())
            throw new AppUserNotFoundException("Employee not found");
        return user.get();
    }

    @Override
    public void delete(Long id) {
        this.repository.deleteById(id);
    }

}
