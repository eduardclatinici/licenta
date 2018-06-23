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
public class Client {

    @Id
    @GeneratedValue(strategy = SEQUENCE)
    private long id;

    @Column
    @NotNull(message = "First name cannot be null")
    private String firstName;

    @Column
    @NotNull(message = "Last name cannot be null")
    private String lastName;

    @Column
    @NotNull(message = "Email cannot be null")
    @Email
    private String email;

    @Column
    @NotNull(message = "phone number cannot be null")
    private String phoneNumber;

    @NotNull(message = "Client details cannot be null")
    @OneToOne(cascade = CascadeType.ALL)
    @JoinTable(name = "user_systemDetails", joinColumns = @JoinColumn(name = "user_id", referencedColumnName = "id"),
            inverseJoinColumns = @JoinColumn(name = "systemUserDetails_id", referencedColumnName = "id"))
    private SystemUserDetails systemUserDetails;

    @Column
    @NotNull(message = "Role cannot be null")
    private String role;

    @OneToMany(mappedBy = "client",cascade = CascadeType.ALL)
    private Set<HotelReservation> roomReservations = new HashSet<>();

    public Client() {
    }

    public String getRole() {
        return role;
    }

    public String getEmail() {
        return email;
    }

    public SystemUserDetails getSystemUserDetails() {
        return systemUserDetails;
    }

    public void setFirstName(String firstName) {
        this.firstName = firstName;
    }

    public void setLastName(String lastName) {
        this.lastName = lastName;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public void setPhoneNumber(String phoneNumber) {
        this.phoneNumber = phoneNumber;
    }

    public void setSystemUserDetails(SystemUserDetails systemUserDetails) {
        this.systemUserDetails = systemUserDetails;
    }

    public void setRole(String role) {
        this.role = role;
    }
}
