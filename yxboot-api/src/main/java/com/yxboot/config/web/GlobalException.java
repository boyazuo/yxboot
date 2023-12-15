package com.yxboot.config.web;

import com.yxboot.common.api.Result;
import com.yxboot.common.api.ResultCode;
import lombok.extern.slf4j.Slf4j;
import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.ResponseStatus;

/**
 * 全局异常捕获处理
 *
 * @author Boya
 */
@Slf4j
@ControllerAdvice
public class GlobalException {
    @ResponseBody
    @ResponseStatus
    @ExceptionHandler(value = Exception.class)
    public Result exceptionHandler(Exception e) {
        log.error("全局异常捕获：" + e.getMessage(), e);
        return Result.error(ResultCode.INTERNAL_SERVER_ERROR, "服务内部错误，请联系管理员！");
    }
}
