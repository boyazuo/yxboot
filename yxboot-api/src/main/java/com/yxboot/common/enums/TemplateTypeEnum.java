package com.yxboot.common.enums;

import com.fasterxml.jackson.annotation.JsonCreator;
import com.mybatisflex.annotation.EnumValue;
import com.yxboot.common.base.BaseEnum;
import com.yxboot.common.exception.ApiException;
import cn.hutool.core.convert.Convert;
import cn.hutool.core.util.EnumUtil;
import lombok.Getter;

@Getter
public enum TemplateTypeEnum implements BaseEnum {
    // 1前端 2后端
    WEB(1, "前端"),
    SERVICE(2, "后端");

    @EnumValue
    private Integer value;
    private String desc;

    TemplateTypeEnum(Integer value, String desc) {
        this.value = value;
        this.desc = desc;
    }

    @JsonCreator(mode = JsonCreator.Mode.DELEGATING)
    public static TemplateTypeEnum create(Object value) {
        value = Convert.toInt(value) != null ? Convert.toInt(value) : value;
        TemplateTypeEnum statusEnum = EnumUtil.likeValueOf(TemplateTypeEnum.class, value);
        if (statusEnum == null) {
            throw new ApiException("未找到匹配的枚举值：" + value);
        }
        return statusEnum;
    }
}
