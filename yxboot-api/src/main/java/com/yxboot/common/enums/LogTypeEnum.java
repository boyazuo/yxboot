package com.yxboot.common.enums;

import cn.hutool.core.convert.Convert;
import cn.hutool.core.util.EnumUtil;
import com.baomidou.mybatisplus.annotation.EnumValue;
import com.fasterxml.jackson.annotation.JsonCreator;
import com.yxboot.common.base.BaseEnum;
import com.yxboot.common.exception.ApiException;
import lombok.Getter;

@Getter
public enum LogTypeEnum  implements BaseEnum {
    // 1登录 2操作
    LOGIN(1, "登录"),
    OPERATE(2, "操作");
    @EnumValue
    private Integer value;
    private String desc;

    LogTypeEnum(Integer value, String desc) {
        this.value = value;
        this.desc = desc;
    }

    @JsonCreator(mode = JsonCreator.Mode.DELEGATING)
    public static LogTypeEnum create(Object value) {
        value = Convert.toInt(value) != null ?  Convert.toInt(value): value;
        LogTypeEnum logTypeEnum = EnumUtil.likeValueOf(LogTypeEnum.class, value);
        if (logTypeEnum == null) {
            throw new ApiException("未找到匹配的枚举值：" + value);
        }
        return logTypeEnum;
    }
}
