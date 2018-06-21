package com.licenta2018.backend.service;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.PageRequest;
import org.springframework.stereotype.Service;

import com.licenta2018.backend.domain.model.user.Client;
import com.licenta2018.backend.domain.repository.AppUserRepository;
import com.licenta2018.backend.exceptions.AppUserNotFoundException;
import com.licenta2018.backend.service.interfaces.AppUserService;

@Service
public class AppUserServiceImpl implements AppUserService {

    @Autowired
    AppUserRepository repository;

    public Client getByEmail(String email){
        return repository.findAppUserByEmail(email);
    }

    @Override
    public void save(Client entity) {
        this.repository.save(entity);
    }

    @Override
    public List<Client> getAll(){
        return this.repository.findAll();
    }

    @Override
    public List<Client> getAll(int pageSize, int pageNumber) {
        return repository.findAll(new PageRequest(pageNumber,pageSize)).getContent();
    }

    @Override
    public void deleteAll(){
        this.repository.deleteAll();
    }

    @Override
    public Client getById(Long id) throws AppUserNotFoundException {
        Optional<Client> user = repository.findById(id);
        if(!user.isPresent())
            throw new AppUserNotFoundException("Employee not found");
        return user.get();
    }

    @Override
    public void delete(Long id) {
        this.repository.deleteById(id);
    }

}
