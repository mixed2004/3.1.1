package ru.mixed.mixed.service;

import ru.mixed.mixed.model.User;

import java.util.List;

public interface UserService {
    void add(User user);

    void update(User user);

    List<User> listUsers();

    User getUserById(long id);

    void deleteUser(User user);

}
