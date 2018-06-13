package com.licenta2018.backend.service;

import java.io.IOException;
import java.io.PrintWriter;
import java.util.Arrays;
import java.util.Date;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.User;
import org.springframework.stereotype.Service;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.licenta2018.backend.domain.model.user.AppUser;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.SignatureAlgorithm;

@Service
public class TokenAuthenticationService {

    private static long EXPIRATIONTIME;
    private static String SECRET;
    private static String TOKEN_PREFIX;
    private static String HEADER_STRING;

    @Value("${java2.security.expirationtime}")
    public void setEXPIRATIONTIME(long EXPIRATIONTIME) {
        TokenAuthenticationService.EXPIRATIONTIME = EXPIRATIONTIME;
    }
    @Value("${java2.security.secret}")
    public void setSECRET(String SECRET) {
        TokenAuthenticationService.SECRET = SECRET;
    }
    @Value("${java2.security.token_prefix}")
    public void setTokenPrefix(String tokenPrefix) {
        TOKEN_PREFIX = tokenPrefix;
    }
    @Value("${java2.security.header}")
    public void setHeaderString(String headerString) {
        HEADER_STRING = headerString;
    }

    public static void addAuthentication(HttpServletResponse res, String email, User user) throws IOException {
        String JWT = Jwts.builder()
                .setSubject(email)
                .setExpiration(new Date(System.currentTimeMillis() + EXPIRATIONTIME))
                .signWith(SignatureAlgorithm.HS512, SECRET)
                .compact();

        res.addHeader("Access-Control-Allow-Headers",HEADER_STRING);
        res.addHeader("Access-Control-Expose-Headers",HEADER_STRING);
        res.addHeader(HEADER_STRING, TOKEN_PREFIX.concat(" ").concat(JWT));
        res.setContentType("application/json");
        PrintWriter writer = res.getWriter();
        ObjectMapper mapper = new ObjectMapper();
        writer.print(mapper.writeValueAsString(user));

    }

    public static Authentication getAuthentication(HttpServletRequest request, AppUserServiceImpl appUserService) {
        String token = request.getHeader(HEADER_STRING);
        if (token != null) {
            String emailAddress = Jwts.parser()
                    .setSigningKey(SECRET)
                    .parseClaimsJws(token.replace(TOKEN_PREFIX, ""))
                    .getBody()
                    .getSubject();
            AppUser appUser = appUserService.getByEmail(emailAddress);
            if("admin@woofwoof.com".equals(emailAddress)){
                return new UsernamePasswordAuthenticationToken(emailAddress, null,
                        Arrays.asList(new SimpleGrantedAuthority("ADMIN") ));
            }
            return emailAddress != null && appUser!=null ?
                    new UsernamePasswordAuthenticationToken(emailAddress, null,
                            Arrays.asList(new SimpleGrantedAuthority(appUser.getRole()) )) :
                    null;
        }
        return null;
    }
}
