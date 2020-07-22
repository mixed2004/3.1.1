package ru.mixed.mixed.service;



import ru.mixed.mixed.model.Role;

import java.util.List;

public interface RoleService {
    List<Role> getRoleList();
    List<String> getRoleNamesToList();
    Role getRoleByRoleName(String roleName);
}
