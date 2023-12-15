package com.yxboot.config.mybatisplus;

import cn.hutool.core.date.DateUtil;
import com.baomidou.mybatisplus.core.handlers.MetaObjectHandler;
import com.yxboot.config.security.SecurityUser;
import lombok.extern.slf4j.Slf4j;
import org.apache.ibatis.reflection.MetaObject;
import org.springframework.security.authentication.AnonymousAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Component;

/**
 * 字段填充审计
 * @author Boya
 */
@Slf4j
@Component
public class MyMetaObjectHandler implements MetaObjectHandler {
    @Override
    public void insertFill(MetaObject metaObject) {
        setFieldUser("createUserId", metaObject);
        this.setFieldValByName("createTime", DateUtil.date(), metaObject);
    }

    @Override
    public void updateFill(MetaObject metaObject) {
        setFieldUser("updateUserId", metaObject);
        this.setFieldValByName("updateTime", DateUtil.date(), metaObject);
    }

    public void setFieldUser(String field, MetaObject metaObject) {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        if (authentication != null && authentication.isAuthenticated() && authentication.getName() != null
                && !(authentication instanceof AnonymousAuthenticationToken)) {
            this.setFieldValByName(field, ((SecurityUser) authentication.getPrincipal()).getUserId(), metaObject);
        }
    }
}

