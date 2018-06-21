package com.licenta2018.backend.service;

import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.User;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

import com.licenta2018.backend.domain.model.user.Client;
import com.licenta2018.backend.exceptions.AppUserNotFoundException;

@Service("customUserDetailsService")
public class CustomUserDetailsService implements UserDetailsService {

    @Autowired
    private AppUserServiceImpl appUserService;


    private List<GrantedAuthority> getGrantedAuthority(Client client){
        List<GrantedAuthority> authorities = new ArrayList<>();
        authorities.add(new SimpleGrantedAuthority(client.getRole()));
        return authorities;
    }

    @Override
    public UserDetails loadUserByUsername(String email) throws UsernameNotFoundException {
        Client client = appUserService.getByEmail(email);

        if("admin@woofwoof.com".equals(email)){
            return new User(email, "$2a$06$SEcZ7jNZNBsC8G1YAdELEurPBaYUA8KbBfF9gLpQVUnqO8X1vHatm",
                    true, true, true, true,
                    Arrays.asList(new SimpleGrantedAuthority("ADMIN"))
            );
        }
        if(client ==null){
            throw new AppUserNotFoundException("Email does not exists in database");
        }

        return new User(client.getEmail(), client.getSystemUserDetails().getPassword(),
                true, true,
                true , true, getGrantedAuthority(client));
    }
}