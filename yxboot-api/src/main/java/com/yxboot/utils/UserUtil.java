package com.yxboot.utils;

import org.springframework.security.authentication.AnonymousAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Component;
import com.yxboot.config.security.SecurityUser;
import lombok.RequiredArgsConstructor;

@Component
@RequiredArgsConstructor
public class UserUtil {

    public static Long getCurrentUserId() {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        if (authentication != null && authentication.isAuthenticated() && authentication.getName() != null
                && !(authentication instanceof AnonymousAuthenticationToken)) {
            return ((SecurityUser) authentication.getPrincipal()).getUserId();
        }
        return null;
    }
}
