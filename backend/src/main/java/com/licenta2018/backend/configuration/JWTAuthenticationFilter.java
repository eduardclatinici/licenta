package com.licenta2018.backend.configuration;

import io.jsonwebtoken.ExpiredJwtException;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.filter.GenericFilterBean;

import javax.servlet.*;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;

import com.licenta2018.backend.service.UserServiceImpl;
import com.licenta2018.backend.service.TokenAuthenticationService;

public class JWTAuthenticationFilter extends GenericFilterBean {
    private UserServiceImpl appUserService;
    public JWTAuthenticationFilter(UserServiceImpl appUserService) {
        this.appUserService = appUserService;
    }

    @Override
    public void doFilter(ServletRequest request,
                         ServletResponse response,
                         FilterChain filterChain)
            throws IOException, ServletException {

        Authentication authentication;
        try{
            authentication = TokenAuthenticationService
                    .getAuthentication((HttpServletRequest)request, appUserService);
        }catch (ExpiredJwtException ex){
            HttpServletResponse httpServletResponse = ((HttpServletResponse)response);
            httpServletResponse.setStatus(401);
            httpServletResponse.setHeader("Authorization","expired");
            return;

        }

        SecurityContextHolder.getContext()
                .setAuthentication(authentication);

        filterChain.doFilter(request,response);
    }
}