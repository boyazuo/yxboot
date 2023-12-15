package com.yxboot.config.security;

import com.yxboot.modules.sys.entity.SysUser;
import com.yxboot.modules.sys.service.SysUserService;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Component;

import java.util.ArrayList;
import java.util.List;

/**
 * 实现UserDetailsService接口，用于加载用户信息
 *
 * @author Boya
 */
@Slf4j
@Component(value = "tenantUserDetailsService")
public class SysUserDetailsService implements UserDetailsService {

    @Autowired
    private SysUserService sysUserService;

    @Override
    public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
        // 查询数据库操作
        SysUser user = sysUserService.selectByUsername(username);
        if (user != null) {
            List<SimpleGrantedAuthority> authorities = new ArrayList<>();
            return new SecurityUser(user.getUserId(), username, user.getPassword(), authorities);
        } else {
            throw new UsernameNotFoundException("the user is not found");
        }
    }
}
