package ru.mixed.mixed.service;

import org.springframework.security.core.userdetails.UserDetailsService;
import ru.mixed.mixed.model.User;

import java.util.List;

public interface UserService extends UserDetailsService {
    void add(User user);

    void update(User user);

    List<User> listUsers();

    User getUserById(long id);

    void deleteUser(User user);

}
