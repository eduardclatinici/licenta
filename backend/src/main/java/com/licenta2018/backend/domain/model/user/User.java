package com.licenta2018.backend.domain.model.user;

import static javax.persistence.GenerationType.*;

import java.util.HashSet;
import java.util.Set;
import javax.persistence.CascadeType;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.JoinTable;
import javax.persistence.OneToMany;
import javax.persistence.OneToOne;
import javax.persistence.Table;
import javax.persistence.UniqueConstraint;
import javax.validation.constraints.Email;
import javax.validation.constraints.NotNull;

import com.licenta2018.backend.domain.model.reservation.HotelReservation;

@Entity
@Table(name = "CLIENTS", uniqueConstraints={@UniqueConstraint(columnNames = {"email"})})
public class User {

    @Id
    @GeneratedValue(strategy = SEQUENCE)
    private long id;

    @Column
    @NotNull(message = "Name cannot be null")
    private String name;

    @Column
    @NotNull(message = "Email cannot be null")
    @Email
    private String email;

    @Column
    @NotNull(message = "phone number cannot be null")
    private String phoneNumber;

    @Column
    @NotNull(message = "User details cannot be null")
    private String password;

    @Column
    @NotNull(message = "Role cannot be null")
    private String role;

    @OneToMany(mappedBy = "user",cascade = CascadeType.ALL)
    private Set<HotelReservation> roomReservations = new HashSet<>();

    public User() {
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public String getPhoneNumber() {
        return phoneNumber;
    }

    public void setPhoneNumber(String phoneNumber) {
        this.phoneNumber = phoneNumber;
    }

    public String getPassword() {
        return password;
    }

    public void setPassword(String password) {
        this.password = password;
    }

    public String getRole() {
        return role;
    }

    public void setRole(String role) {
        this.role = role;
    }
}
