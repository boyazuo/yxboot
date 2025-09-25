package com.yxboot.config.mybatisflex;

import java.lang.reflect.Field;
import java.time.LocalDateTime;
import com.mybatisflex.annotation.InsertListener;
import com.mybatisflex.annotation.UpdateListener;
import com.yxboot.utils.UserUtil;
import lombok.extern.slf4j.Slf4j;

/**
 * MyBatis-Flex 字段填充监听器
 *
 * @author Boya
 */
@Slf4j
public class MyFlexListener implements InsertListener, UpdateListener {

    @Override
    public void onInsert(Object entity) {
        try {
            setFieldValue(entity, "createTime", LocalDateTime.now());
            setFieldValue(entity, "updateTime", LocalDateTime.now());

            Long userId = UserUtil.getCurrentUserId();
            if (userId != null) {
                setFieldValue(entity, "createUserId", userId);
                setFieldValue(entity, "updateUserId", userId);
            }
        } catch (Exception e) {
            log.error("Insert listener error: ", e);
        }
    }

    @Override
    public void onUpdate(Object entity) {
        try {
            setFieldValue(entity, "updateTime", LocalDateTime.now());

            Long userId = UserUtil.getCurrentUserId();
            if (userId != null) {
                setFieldValue(entity, "updateUserId", userId);
            }
        } catch (Exception e) {
            log.error("Update listener error: ", e);
        }
    }

    private void setFieldValue(Object entity, String fieldName, Object value) {
        try {
            Field field = entity.getClass().getDeclaredField(fieldName);
            field.setAccessible(true);
            if (field.get(entity) == null) {
                field.set(entity, value);
            }
        } catch (NoSuchFieldException | IllegalAccessException e) {
            // 字段不存在或无法访问，忽略
        }
    }
}
