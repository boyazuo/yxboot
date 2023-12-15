package com.yxboot.common.aspect;

import com.yxboot.common.enums.LogTypeEnum;

import java.lang.annotation.*;

import static java.lang.annotation.ElementType.METHOD;
import static java.lang.annotation.ElementType.TYPE;


@Target({METHOD, TYPE})
@Retention(RetentionPolicy.RUNTIME)
@Inherited
@Documented
public @interface SysLogOperation {
    String value() default "";

    LogTypeEnum type() default LogTypeEnum.OPERATE;

}
