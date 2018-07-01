package com.licenta2018.backend.controller;

import com.licenta2018.backend.domain.dto.UserDTO;
import com.licenta2018.backend.domain.transformer.UserTransformer;
import com.licenta2018.backend.service.interfaces.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.io.File;
import java.nio.file.Path;

import static org.springframework.http.HttpStatus.OK;

@RestController
@RequestMapping("/api")
public class UserController {

    @Autowired
    UserService userService;

    @Autowired
    UserTransformer userTransformer;

    @GetMapping("/auth-details")
    public UserDTO getUserDetails(Authentication authentication) {
        UserDTO userDTO = new UserDTO();
        userDTO.setEmail(authentication.getPrincipal().toString());
        userDTO.setAuthority(authentication.getAuthorities().toArray()[0].toString());
        return userDTO;
    }

    @PostMapping("/register")
    public ResponseEntity register(@RequestBody UserDTO registerDTO) {
        userService.save(userTransformer.toModel(registerDTO));
        return new ResponseEntity(OK);
    }

}
