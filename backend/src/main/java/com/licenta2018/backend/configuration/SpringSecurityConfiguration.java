package com.licenta2018.backend.configuration;


import com.licenta2018.backend.service.AppUserServiceImpl;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.boot.web.servlet.error.DefaultErrorAttributes;
import org.springframework.boot.web.servlet.error.ErrorAttributes;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.http.HttpMethod;
import org.springframework.security.authentication.dao.DaoAuthenticationProvider;
import org.springframework.security.config.annotation.authentication.builders.AuthenticationManagerBuilder;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.configuration.WebSecurityConfigurerAdapter;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;
import org.springframework.security.web.authentication.logout.LogoutSuccessHandler;
import org.springframework.web.context.request.WebRequest;

import java.util.Map;

@Configuration
@EnableWebSecurity
public class SpringSecurityConfiguration extends WebSecurityConfigurerAdapter {

    @Autowired
    @Qualifier("customUserDetailsService")
    UserDetailsService userDetailsService;

    @Autowired
    AppUserServiceImpl appUserService;

    @Autowired
    LogoutSuccessHandler logoutHandler;

    @Override
    protected void configure(HttpSecurity http) throws Exception {
        http.cors().and().csrf().disable().authorizeRequests()
                .antMatchers(HttpMethod.POST, "/api/app-user/forgot-password").permitAll()
                .antMatchers(HttpMethod.POST, "/api/app-user/change-password").permitAll()
                .antMatchers("/api/app-user/userdetails").hasAnyAuthority("ADMIN","USER", "EMPLOYEE")
                .antMatchers("/api/app-user/user").hasAnyAuthority("USER")
                .antMatchers("/api/app-user/**").hasAuthority("ADMIN")
                .antMatchers(HttpMethod.POST, "/api/login").permitAll()
                .anyRequest().authenticated()
                .and().logout().logoutSuccessHandler(logoutHandler).invalidateHttpSession(false).permitAll()
                .and()
                .addFilterBefore(new JWTLoginFilter("/api/login", authenticationManager(), appUserService),
                        UsernamePasswordAuthenticationFilter.class);

    }


    @Override
    protected void configure(AuthenticationManagerBuilder auth) throws Exception {
        auth.inMemoryAuthentication().withUser("admin@woofwoof.com").password("$2y$12$Ao3qD9BImy7QLX/NlbQAZOaaPmEro7CI/siqYueBz50Q0Crd9jBLu").roles("ADMIN");
        auth.userDetailsService(userDetailsService);
        auth.authenticationProvider(authenticationProvider());


    }

    @Bean
    public DaoAuthenticationProvider authenticationProvider() {
        DaoAuthenticationProvider authenticationProvider = new DaoAuthenticationProvider();
        authenticationProvider.setUserDetailsService(userDetailsService);
        authenticationProvider.setPasswordEncoder(passwordEncoder());
        return authenticationProvider;
    }

    @Bean
    public PasswordEncoder passwordEncoder() {
        return new BCryptPasswordEncoder();
    }

    @Bean
    public ErrorAttributes errorAttributes() {
        return new DefaultErrorAttributes() {
            @Override
            public Map<String, Object> getErrorAttributes(WebRequest requestAttributes, boolean includeStackTrace) {
                Map<String, Object> errorAttributes = super.getErrorAttributes(requestAttributes, includeStackTrace);
                errorAttributes.put("message", "Email or password invalid.");
                return errorAttributes;
            }

        };
    }


}