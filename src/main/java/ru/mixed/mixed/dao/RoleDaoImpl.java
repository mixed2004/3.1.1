package ru.mixed.mixed.dao;

import org.springframework.stereotype.Repository;
import ru.mixed.mixed.model.Role;


import javax.persistence.EntityManager;
import javax.persistence.PersistenceContext;
import java.util.List;

@Repository
@SuppressWarnings("ALL")
public class RoleDaoImpl implements RoleDao {
    @PersistenceContext
    private EntityManager entityManager;
    @Override
    public List<Role> getRoleList() {
        return entityManager.createQuery("from Role").getResultList();
    }

    @Override
    public List<String> getRoleNamesToList() {
        return entityManager.createQuery("select roleName from Role").getResultList();
    }

    @Override
    public Role getRoleByRoleName(String roleName) {
        return (Role) entityManager
                .createQuery("FROM Role WHERE roleName =:roleName")
                .setParameter("roleName", roleName)
                .getSingleResult();
    }
}
