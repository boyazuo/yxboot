package com.yxboot.common.enums;

import com.fasterxml.jackson.annotation.JsonCreator;
import com.mybatisflex.annotation.EnumValue;
import com.yxboot.common.base.BaseEnum;
import com.yxboot.common.exception.ApiException;
import cn.hutool.core.util.EnumUtil;
import lombok.Getter;

@Getter
public enum TemplateTypeEnum implements BaseEnum {
    // 1前端 2后端
    WEB("web", "前端"),
    SERVICE("service", "后端");

    @EnumValue
    private String value;
    private String desc;

    TemplateTypeEnum(String value, String desc) {
        this.value = value;
        this.desc = desc;
    }

    @JsonCreator(mode = JsonCreator.Mode.DELEGATING)
    public static TemplateTypeEnum create(Object value) {
        TemplateTypeEnum statusEnum = EnumUtil.likeValueOf(TemplateTypeEnum.class, value);
        if (statusEnum == null) {
            throw new ApiException("未找到匹配的枚举值：" + value);
        }
        return statusEnum;
    }
}
