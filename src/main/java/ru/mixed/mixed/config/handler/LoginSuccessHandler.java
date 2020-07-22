package ru.mixed.mixed.config.handler;

import org.springframework.security.core.Authentication;
import org.springframework.security.web.authentication.AuthenticationSuccessHandler;
import org.springframework.stereotype.Component;
import ru.mixed.mixed.model.Role;
import ru.mixed.mixed.model.User;

import javax.servlet.ServletException;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;
import java.util.ArrayList;
import java.util.List;

@Component
public class LoginSuccessHandler implements AuthenticationSuccessHandler {

    @Override
    public void onAuthenticationSuccess(HttpServletRequest httpServletRequest,
                                        HttpServletResponse httpServletResponse,
                                        Authentication authentication) throws IOException, ServletException {
        User user = (User) authentication.getPrincipal();
        List<String> userRolesList = new ArrayList<>();
        for (Role role : user.getRoles()) {
            userRolesList.add(role.getRoleName());
        }
        if (userRolesList.contains("ADMIN")) {
            httpServletResponse.sendRedirect("/admin");
        }else {
            if (userRolesList.contains("USER")) {
                httpServletResponse.sendRedirect("/user");
            }else {
                httpServletResponse.sendRedirect("/login");
            }
        }
    }
    }
