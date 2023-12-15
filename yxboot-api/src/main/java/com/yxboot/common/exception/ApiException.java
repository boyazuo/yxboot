package com.yxboot.common.exception;


import com.yxboot.common.api.ResultCode;

/**
 * 自定义API异常
 */
public class ApiException extends RuntimeException {
    private ResultCode resultCode;

    public ApiException(ResultCode resultCode) {
        super(resultCode.getMsg());
        this.resultCode = resultCode;
    }

    public ApiException(String message) {
        super(message);
    }

    public ApiException(Throwable cause) {
        super(cause);
    }

    public ApiException(String message, Throwable cause) {
        super(message, cause);
    }

    public ResultCode getResultCode() {
        return resultCode;
    }
}
