package com.licenta2018.backend.service.interfaces;

import com.licenta2018.backend.domain.model.user.Client;

public interface AppUserService extends CrudService<Client> {
    public Client getByEmail(String email);
}
