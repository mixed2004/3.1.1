package ru.mixed.mixed.dao;

import ru.mixed.mixed.model.User;

import java.util.List;

public interface UserDao {
    void add(User user);

    void update(User user);

    List<User> listUsers();

    User getUserById(long id);

    void deleteUser(User user);

    User getUserByLogin(String login);
}
