package com.yxboot.common.enums;

import cn.hutool.core.convert.Convert;
import cn.hutool.core.util.EnumUtil;
import com.baomidou.mybatisplus.annotation.EnumValue;
import com.fasterxml.jackson.annotation.JsonCreator;
import com.yxboot.common.base.BaseEnum;
import com.yxboot.common.exception.ApiException;
import lombok.Getter;

/**
 * 性别枚举
 *
 * @author Boya
 */
@Getter
public enum SexEnum implements BaseEnum {
    // 1男 2女
    MALE(1, "男"),
    FEMALE(2, "女");

    @EnumValue
    private Integer value;
    private String desc;

    SexEnum(Integer value, String desc) {
        this.value = value;
        this.desc = desc;
    }

    @JsonCreator(mode = JsonCreator.Mode.DELEGATING)
    public static SexEnum create(Object value) {
        value = Convert.toInt(value) != null ?  Convert.toInt(value): value;
        SexEnum sexEnum = EnumUtil.likeValueOf(SexEnum.class, value);
        if (sexEnum == null) {
            throw new ApiException("未找到匹配的枚举值：" + value);
        }
        return sexEnum;
    }
}
