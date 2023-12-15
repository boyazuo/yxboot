package com.yxboot.common.enums;

import cn.hutool.core.convert.Convert;
import cn.hutool.core.util.EnumUtil;
import com.baomidou.mybatisplus.annotation.EnumValue;
import com.fasterxml.jackson.annotation.JsonCreator;
import com.yxboot.common.base.BaseEnum;
import com.yxboot.common.exception.ApiException;
import lombok.Getter;

/**
 * 通用状态枚举
 *
 * @author Boya
 */
@Getter
public enum StatusEnum implements BaseEnum {
    // 1有效 0无效
    VALID(1, "有效"),
    INVALID(0, "无效");

    @EnumValue
    private Integer value;
    private String desc;

    StatusEnum(Integer value, String desc) {
        this.value = value;
        this.desc = desc;
    }

    @JsonCreator(mode = JsonCreator.Mode.DELEGATING)
    public static StatusEnum create(Object value) {
        value = Convert.toInt(value) != null ?  Convert.toInt(value): value;
        StatusEnum statusEnum = EnumUtil.likeValueOf(StatusEnum.class, value);
        if (statusEnum == null) {
            throw new ApiException("未找到匹配的枚举值：" + value);
        }
        return statusEnum;
    }
}
