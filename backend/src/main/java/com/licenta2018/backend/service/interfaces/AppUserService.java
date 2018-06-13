package com.licenta2018.backend.service.interfaces;

import com.licenta2018.backend.domain.model.user.AppUser;

public interface AppUserService extends CrudService<AppUser> {
    public AppUser getByEmail(String email);
}
