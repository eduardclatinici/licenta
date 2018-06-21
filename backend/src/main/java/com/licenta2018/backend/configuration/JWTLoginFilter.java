package com.licenta2018.backend.configuration;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.licenta2018.backend.domain.dto.LoginDTO;
import com.licenta2018.backend.service.AppUserServiceImpl;
import com.licenta2018.backend.service.TokenAuthenticationService;

import org.springframework.security.authentication.*;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.AuthenticationException;
import org.springframework.security.core.userdetails.User;
import org.springframework.security.web.authentication.AbstractAuthenticationProcessingFilter;
import org.springframework.security.web.util.matcher.AntPathRequestMatcher;

import javax.servlet.FilterChain;
import javax.servlet.ServletException;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;
import java.util.Collections;

public class JWTLoginFilter extends AbstractAuthenticationProcessingFilter {

    private AppUserServiceImpl appUserService;

    public JWTLoginFilter(String url, AuthenticationManager authManager, AppUserServiceImpl appUserService) {
        super(new AntPathRequestMatcher(url));
        setAuthenticationManager(authManager);
        this.appUserService = appUserService;
    }

    @Override
    public Authentication attemptAuthentication(
            HttpServletRequest req, HttpServletResponse res)
            throws AuthenticationException, IOException, ServletException {
        LoginDTO credentials = new ObjectMapper()
                .readValue(req.getInputStream(), LoginDTO.class);
        Authentication authentication = null;
        try {
            authentication = getAuthenticationManager().authenticate(
                    new UsernamePasswordAuthenticationToken(
                            credentials.getEmailAddress(),
                            credentials.getPassword(),
                            Collections.emptyList()
                    )
            );
        } catch (InternalAuthenticationServiceException exception) {
            res.setHeader("Content-type", "application/json");
            res.getWriter().write(exception.getMessage());
            res.setStatus(401);
        }

        return authentication;
    }

    @Override
    protected void successfulAuthentication(
            HttpServletRequest req,
            HttpServletResponse res, FilterChain chain,
            Authentication auth) throws IOException, ServletException {
        TokenAuthenticationService.addAuthentication(res, auth.getName(), (User) auth.getPrincipal());

    }

    @Override
    protected void unsuccessfulAuthentication(HttpServletRequest request, HttpServletResponse response,
                                              AuthenticationException failed) throws IOException, ServletException {
        response.getWriter().print("Email or password is invalid");
        response.setStatus(HttpServletResponse.SC_UNAUTHORIZED);

    }
}