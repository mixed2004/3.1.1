package ru.mixed.mixed.model;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import lombok.Data;
import lombok.Getter;
import lombok.Setter;
import org.springframework.security.core.GrantedAuthority;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;

@Entity
@Data
@Getter
@Setter
@JsonIgnoreProperties(ignoreUnknown = true)
public class Role implements GrantedAuthority {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long id;
    private String roleName;

    @Override
    public String getAuthority() {
        return roleName;
    }

    @Override
    public String toString() {
        return roleName + ' ';
    }
}
