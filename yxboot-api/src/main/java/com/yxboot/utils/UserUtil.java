package com.yxboot.utils;

import com.yxboot.config.security.SecurityUser;
import com.yxboot.modules.sys.entity.SysUser;
import com.yxboot.modules.sys.service.SysUserService;
import lombok.RequiredArgsConstructor;
import org.springframework.security.authentication.AnonymousAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Component;

@Component
@RequiredArgsConstructor
public class UserUtil {
    private final SysUserService sysUserService;

    public Long getCurrentUserId() {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        if (authentication != null && authentication.isAuthenticated() && authentication.getName() != null
                && !(authentication instanceof AnonymousAuthenticationToken)) {
            return ((SecurityUser) authentication.getPrincipal()).getUserId();
        }
        return null;
    }

    public SysUser getCurrentUser() {
        Long userId = getCurrentUserId();
        return sysUserService.getById(userId);
    }
}
