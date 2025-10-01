package com.yxboot.common.enums;

import com.fasterxml.jackson.annotation.JsonCreator;
import com.mybatisflex.annotation.EnumValue;
import com.yxboot.common.base.BaseEnum;
import com.yxboot.common.exception.ApiException;
import cn.hutool.core.util.EnumUtil;
import lombok.Getter;

@Getter
public enum LogTypeEnum implements BaseEnum {
    // 1登录 2操作
    LOGIN("login", "登录"),
    OPERATE("operate", "操作");

    @EnumValue
    private String value;
    private String desc;

    LogTypeEnum(String value, String desc) {
        this.value = value;
        this.desc = desc;
    }

    @JsonCreator(mode = JsonCreator.Mode.DELEGATING)
    public static LogTypeEnum create(Object value) {
        LogTypeEnum logTypeEnum = EnumUtil.likeValueOf(LogTypeEnum.class, value);
        if (logTypeEnum == null) {
            throw new ApiException("未找到匹配的枚举值：" + value);
        }
        return logTypeEnum;
    }
}
