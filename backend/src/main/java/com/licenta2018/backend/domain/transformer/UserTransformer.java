package com.licenta2018.backend.domain.transformer;

import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;

import com.licenta2018.backend.domain.dto.UserDTO;
import com.licenta2018.backend.domain.model.user.User;

@Service
public class UserTransformer implements Transformer<User, UserDTO> {

    private BCryptPasswordEncoder bCryptPasswordEncoder = new BCryptPasswordEncoder();

    @Override
    public User toModel(UserDTO userDTO) {
        User user = new User();
        user.setEmail(userDTO.getEmail());
        user.setPassword(bCryptPasswordEncoder.encode(userDTO.getPassword()));
        user.setPhoneNumber(userDTO.getPhone());
        user.setName(userDTO.getName());
        user.setRole("USER");
        return user;
    }

    @Override
    public UserDTO toDTO(User user) {
        return null;
    }
}
