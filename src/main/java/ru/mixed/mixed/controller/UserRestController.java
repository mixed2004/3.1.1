package ru.mixed.mixed.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.*;
import ru.mixed.mixed.model.Role;
import ru.mixed.mixed.model.User;
import ru.mixed.mixed.model.UserDTO;
import ru.mixed.mixed.service.RoleService;
import ru.mixed.mixed.service.UserService;

import java.util.HashSet;
import java.util.List;
import java.util.Set;

@RestController
@RequestMapping("/rest")
public class UserRestController {
    @Autowired
    private  UserService userService;
    @Autowired
    private  RoleService roleService;

    @Autowired
       private PasswordEncoder passwordEncoder;

    @GetMapping(value = "/admin")
    public ResponseEntity<List<User>> userList() {
        List<User> users = userService.listUsers();
        return (users == null) ? new ResponseEntity<>(HttpStatus.NOT_FOUND) : new ResponseEntity<>(users, HttpStatus.OK);
    }
    @PostMapping(value = "/admin/userThatWasAdd")
    public ResponseEntity<UserDetails> userThatWasAdd(@RequestBody String userLoginThatWasAdd) {
        UserDetails user = userService.loadUserByUsername(userLoginThatWasAdd);
        return (user == null) ? new ResponseEntity<>(HttpStatus.NOT_FOUND) : new ResponseEntity<>(user, HttpStatus.OK);
    }
    @PostMapping(value = "/admin/userForFillModalForm")
    public ResponseEntity<User> userThatWasAdd(@RequestBody long userFindId) {
        User user = userService.getUserById(userFindId);
        return (user == null) ? new ResponseEntity<>(HttpStatus.NOT_FOUND) : new ResponseEntity<>(user, HttpStatus.OK);
    }

    @PostMapping(value = "/admin")
    public ResponseEntity addUser(@RequestBody UserDTO user) {
        User resultUser = new User(user.getName(), user.getAdress(), user.getSurname(), user.getLogin(), passwordEncoder.encode(user.getPassword()));
        Set<Role> roles = new HashSet<>();
        for (String roleFromDTO: user.getRolesString()) {
            roles.add(roleService.getRoleByRoleName(roleFromDTO));
        }
        resultUser.setRoles(roles);
        userService.add(resultUser);
        return new ResponseEntity(user, HttpStatus.CREATED);
    }

    @PutMapping(value = "/admin")
    public ResponseEntity editUser(@RequestBody UserDTO user) {
        User resultUser = userService.getUserById(user.getId());
       resultUser.setName(user.getName());
       resultUser.setSurname(user.getSurname());
       resultUser.setAdress(user.getAdress());
       resultUser.setLogin(user.getLogin());
       if (!user.getPassword().isEmpty()){
           resultUser.setPassword(passwordEncoder.encode(user.getPassword()));

       }
        Set<Role> roles = new HashSet<>();
        for (String roleFromDTO: user.getRolesString()) {
            roles.add(roleService.getRoleByRoleName(roleFromDTO));
        }
        resultUser.setRoles(roles);
        userService.update(resultUser);
        return new ResponseEntity(HttpStatus.OK);
    }

@DeleteMapping(value = "/admin")
public ResponseEntity deleteUser(@RequestBody long id) {
    User user = userService.getUserById(id);
    userService.deleteUser(user);
    return new ResponseEntity(HttpStatus.OK);
}

    @GetMapping(value = "/user")
    public ResponseEntity<User> getUser(Authentication authentication) {
        User autorityUser = (User) authentication.getPrincipal();
        return (autorityUser == null) ? new ResponseEntity<>(HttpStatus.NOT_FOUND) : new ResponseEntity<>(autorityUser, HttpStatus.OK);
    }
}