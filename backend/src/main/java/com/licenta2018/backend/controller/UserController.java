package com.licenta2018.backend.controller;

import java.util.HashMap;
import java.util.Map;

import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api")
public class UserController {

    @GetMapping("/auth-details")
    public Map getUserDetails(Authentication authentication){
        Map<String,Object>  map = new HashMap<>();
        map.put("username",authentication.getPrincipal());
        map.put("authority",authentication.getAuthorities());
        return map;
    }

}
