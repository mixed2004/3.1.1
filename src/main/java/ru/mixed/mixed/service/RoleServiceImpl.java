package ru.mixed.mixed.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import ru.mixed.mixed.dao.RoleDao;
import ru.mixed.mixed.model.Role;

import java.util.List;

@Service
@Transactional
public class RoleServiceImpl implements RoleService {
    @Autowired
    private RoleDao roleDao;
    @Override
    public List<Role> getRoleList() {
        return roleDao.getRoleList();
    }

    @Override
    public List<String> getRoleNamesToList() {
        return roleDao.getRoleNamesToList();
    }

    @Override
    public Role getRoleByRoleName(String roleName) {
        return roleDao.getRoleByRoleName(roleName);
    }
}
