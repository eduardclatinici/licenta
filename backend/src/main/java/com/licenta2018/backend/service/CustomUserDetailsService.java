package com.licenta2018.backend.service;

import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

import com.licenta2018.backend.domain.model.user.User;
import com.licenta2018.backend.exceptions.AppUserNotFoundException;

@Service("customUserDetailsService")
public class CustomUserDetailsService implements UserDetailsService {

    @Autowired
    private UserServiceImpl appUserService;


    private List<GrantedAuthority> getGrantedAuthority(User user){
        List<GrantedAuthority> authorities = new ArrayList<>();
        authorities.add(new SimpleGrantedAuthority(user.getRole()));
        return authorities;
    }

    @Override
    public UserDetails loadUserByUsername(String email) throws UsernameNotFoundException {
        User user = appUserService.getByEmail(email);

        if("admin@woofwoof.com".equals(email)){
            return new org.springframework.security.core.userdetails.User(email, "$2a$06$SEcZ7jNZNBsC8G1YAdELEurPBaYUA8KbBfF9gLpQVUnqO8X1vHatm",
                    true, true, true, true,
                    Arrays.asList(new SimpleGrantedAuthority("ADMIN"))
            );
        }
        if(user ==null){
            throw new AppUserNotFoundException("Email does not exists in database");
        }

        return new org.springframework.security.core.userdetails.User(user.getEmail(), user.getPassword(),
                true, true,
                true , true, getGrantedAuthority(user));
    }
}