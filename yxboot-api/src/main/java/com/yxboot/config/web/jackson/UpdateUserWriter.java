package com.yxboot.config.web.jackson;

import cn.hutool.core.bean.BeanUtil;
import cn.hutool.extra.spring.SpringUtil;
import com.fasterxml.jackson.core.JsonGenerator;
import com.fasterxml.jackson.databind.JavaType;
import com.fasterxml.jackson.databind.SerializerProvider;
import com.fasterxml.jackson.databind.cfg.MapperConfig;
import com.fasterxml.jackson.databind.introspect.AnnotatedClass;
import com.fasterxml.jackson.databind.introspect.BeanPropertyDefinition;
import com.fasterxml.jackson.databind.ser.VirtualBeanPropertyWriter;
import com.fasterxml.jackson.databind.util.Annotations;
import com.yxboot.common.cache.SysUserCacheUtil;
import com.yxboot.modules.sys.entity.SysUser;
import lombok.NoArgsConstructor;

/**
 * @author Boya
 */
@NoArgsConstructor
public class UpdateUserWriter extends VirtualBeanPropertyWriter {

    private UpdateUserWriter(BeanPropertyDefinition propDef, Annotations contextAnnotations, JavaType declaredType) {
        super(propDef, contextAnnotations, declaredType);
    }

    public static SysUserCacheUtil userCache;

    private static SysUserCacheUtil getUserCache() {
        if (userCache == null) {
            userCache = SpringUtil.getBean(SysUserCacheUtil.class);
        }
        return userCache;
    }

    @Override
    protected Object value(Object bean, JsonGenerator gen, SerializerProvider prov) throws Exception {
        String updateUserIdField = "updateUserId";
        Long updateUserId = BeanUtil.getProperty(bean, updateUserIdField);
        SysUser updateUser = getUserCache().getUser(updateUserId);
        String value = null;
        if (updateUser != null) {
            value = updateUser.getName();
        }
        return value;
    }

    @Override
    public VirtualBeanPropertyWriter withConfig(MapperConfig<?> config, AnnotatedClass declaringClass, BeanPropertyDefinition propDef, JavaType type) {
        return new UpdateUserWriter(propDef, declaringClass.getAnnotations(), type);
    }
}
