package ru.mixed.mixed.dao;

import ru.mixed.mixed.model.Role;

import java.util.List;

public interface RoleDao {
    List<Role> getRoleList();
    List<String> getRoleNamesToList();
    Role getRoleByRoleName(String roleName);
}
