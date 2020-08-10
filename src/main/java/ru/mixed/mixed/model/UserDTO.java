package ru.mixed.mixed.model;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class UserDTO {
    private long id;
    private String name;
    private String surname;
    private String adress;
    private String login;
    private String password;
    private String[] rolesString;
}
