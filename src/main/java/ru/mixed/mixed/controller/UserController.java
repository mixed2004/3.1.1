package ru.mixed.mixed.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.Authentication;

import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.*;
import ru.mixed.mixed.model.User;
import ru.mixed.mixed.service.RoleService;
import ru.mixed.mixed.service.UserService;

import java.util.List;

@Controller
public class UserController {
    @Autowired
    private  UserService userService;
    @Autowired
    private  RoleService roleService;

//    @Autowired
//    public UserController(UserService userService, RoleService roleService) {
//        this.userService = userService;
//        this.roleService = roleService;
//    }

    @Autowired
       private PasswordEncoder passwordEncoder;

    @GetMapping(value = "/admin")
    public String userList(Model model, Authentication authentication) {
        User autorityUser = (User) authentication.getPrincipal();
        List<User> users = userService.listUsers();

        model.addAttribute("new_user", new User());
        model.addAttribute("edit_user", new User());
        model.addAttribute("users", users);
        model.addAttribute("autorityUser", autorityUser);
        model.addAttribute("userRoles", roleService.getRoleNamesToList());
        return "admin";
    }

    @GetMapping(value = "/login")
    public String loginPage() {
        return "login";
    }

//    @GetMapping(value = "/newUser")
//    public String getAddUserForm(Model model) {
//        User user = new User();
//        model.addAttribute("user", user);
//        model.addAttribute("userRoles", roleService.getRoleNamesToList());
//        return "newUser";
//    }
//
//    @PostMapping(value = "/add")
//    public String addUser(@ModelAttribute("new_user") User user, @RequestParam Map<String, String> form) {
//        List<String> roles = roleService.getRoleNamesToList();
//        user.getRoles().clear();
//        for (String key : form.keySet()) {
//            if (roles.contains(key)) {
//                user.getRoles().add(roleService.getRoleByRoleName(key));
//            }
//        }
//        user.setPassword(passwordEncoder.encode(user.getPassword()));
//        userService.add(user);
//        return "redirect:/admin";
//    }
//
//    @GetMapping(value = "/editUser")
//    public String getEditUserForm(@ModelAttribute("edit_user") User user, Model model) {
//        model.addAttribute("userHiddenPassword", user.getPassword());
//        user.setPassword("");
//        model.addAttribute("user", user);
//        model.addAttribute("userRoles", roleService.getRoleNamesToList());
//        System.out.println(roleService.getRoleNamesToList());
//        return "editUser";
//    }
//
//    @PostMapping(value = "/editUser")
//    public String editUser(User user,
//                           @RequestParam Map<String, String> form,
//                           @RequestParam("userHiddenPassword") String userHiddenPassword) {
//        List<String> roles = roleService.getRoleNamesToList();
//        user.getRoles().clear();
//        for (String key : form.keySet()) {
//            if (roles.contains(key)) {
//                user.getRoles().add(roleService.getRoleByRoleName(key));
//            }
//        }
//        if (!user.getPassword().isEmpty()) {
//            user.setPassword(passwordEncoder.encode(user.getPassword()));
//        } else {
//            user.setPassword(userHiddenPassword);
//        }
//        userService.update(user);
//        return "redirect:/admin";
//    }
//
//    @PostMapping(value = "/deleteUser")
//    public String deleteUser(@ModelAttribute("user") User user) {
//        userService.deleteUser(user);
//        return "redirect:/admin";
//    }
//
    @GetMapping(value = "/user")
    public String getUser(Authentication authentication, Model model) {
        User autorityUser = (User) authentication.getPrincipal();
        model.addAttribute("autorityUser", autorityUser);
        return "user";
    }
}