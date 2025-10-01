package com.yxboot.common.enums;

import com.fasterxml.jackson.annotation.JsonCreator;
import com.mybatisflex.annotation.EnumValue;
import com.yxboot.common.base.BaseEnum;
import com.yxboot.common.exception.ApiException;
import cn.hutool.core.util.EnumUtil;
import lombok.Getter;

@Getter
public enum MenuEnum implements BaseEnum {
    // module:模块 menu:菜单 button:按钮/链接
    MODULE("module", "模块"),
    MENU("menu", "菜单"),
    BUTTON("button", "按钮");


    @EnumValue
    private String value;
    private String desc;

    MenuEnum(String value, String desc) {
        this.value = value;
        this.desc = desc;
    }

    @JsonCreator(mode = JsonCreator.Mode.DELEGATING)
    public static MenuEnum create(Object value) {
        MenuEnum menuEnum = EnumUtil.likeValueOf(MenuEnum.class, value);
        if (menuEnum == null) {
            throw new ApiException("未找到匹配的枚举值：" + value);
        }
        return menuEnum;
    }
}
