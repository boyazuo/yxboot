package com.yxboot.common.enums;

import cn.hutool.core.convert.Convert;
import cn.hutool.core.util.EnumUtil;
import com.baomidou.mybatisplus.annotation.EnumValue;
import com.fasterxml.jackson.annotation.JsonCreator;
import com.yxboot.common.base.BaseEnum;
import com.yxboot.common.exception.ApiException;
import lombok.Getter;

@Getter
public enum MenuEnum implements BaseEnum {
    // 1模块 2菜单 3按钮
    MODULE(1, "模块"),
    MENU(2, "菜单"),
    BUTTON(3, "按钮");


    @EnumValue
    private Integer value;
    private String desc;

    MenuEnum(Integer value, String desc) {
        this.value = value;
        this.desc = desc;
    }

    @JsonCreator(mode = JsonCreator.Mode.DELEGATING)
    public static MenuEnum create(Object value) {
        value = Convert.toInt(value) != null ?  Convert.toInt(value): value;
        MenuEnum menuEnum = EnumUtil.likeValueOf(MenuEnum.class, value);
        if (menuEnum == null) {
            throw new ApiException("未找到匹配的枚举值：" + value);
        }
        return menuEnum;
    }
}
