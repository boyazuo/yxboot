package com.yxboot.common.enums;

import com.fasterxml.jackson.annotation.JsonCreator;
import com.mybatisflex.annotation.EnumValue;
import com.yxboot.common.base.BaseEnum;
import com.yxboot.common.exception.ApiException;
import cn.hutool.core.util.EnumUtil;
import lombok.Getter;

/**
 * 通用状态枚举
 *
 * @author Boya
 */
@Getter
public enum StatusEnum implements BaseEnum {
    // normal:正常 invalid:无效
    NORMAL("normal", "正常"),
    INVALID("invalid", "无效");

    @EnumValue
    private String value;
    private String desc;

    StatusEnum(String value, String desc) {
        this.value = value;
        this.desc = desc;
    }

    @JsonCreator(mode = JsonCreator.Mode.DELEGATING)
    public static StatusEnum create(Object value) {
        StatusEnum statusEnum = EnumUtil.likeValueOf(StatusEnum.class, value);
        if (statusEnum == null) {
            throw new ApiException("未找到匹配的枚举值：" + value);
        }
        return statusEnum;
    }
}
