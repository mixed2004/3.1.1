package ru.mixed.mixed.service;



import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;
import ru.mixed.mixed.dao.UserDao;
import ru.mixed.mixed.model.User;

import java.util.List;

@Repository("UserServiceImp")
@Transactional
public class UserServiceImp implements UserService {
    @Autowired
    private UserDao userDao;

    @Override
    public void add(User user) {
        userDao.add(user);
    }

    @Override
    public void update(User user) {
        userDao.update(user);
    }

    @Override
    public List<User> listUsers() {
        return userDao.listUsers();
    }

    @Override
    public User getUserById(long id) {
        return userDao.getUserById(id);
    }

    @Override
    public UserDetails loadUserByUsername(String s) throws UsernameNotFoundException {
        System.out.println("поиск юзера по логину");
        UserDetails user = userDao.getUserByLogin(s);
        System.out.println(user.toString());
        return user;
    }

    @Override
    public void deleteUser(User user) {
        userDao.deleteUser(user);
    }
}
