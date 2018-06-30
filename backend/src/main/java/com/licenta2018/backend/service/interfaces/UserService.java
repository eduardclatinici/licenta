package com.licenta2018.backend.service.interfaces;


import com.licenta2018.backend.domain.model.user.User;

public interface UserService extends CrudService<User> {
    public User getByEmail(String email);
}
