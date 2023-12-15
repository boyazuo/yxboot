package com.yxboot.common.api;

import java.io.Serializable;

/**
 * Created by Administrator on 2016/11/30.
 */
public class Result<T> implements Serializable {
    private Integer code;
    private String msg;
    private T data;

    public Result(){
    }

    public Result(ResultCode resultCode) {
        this.code = resultCode.getCode();
        this.msg = resultCode.getMsg();
    }

    public Result(ResultCode resultCode, String msg) {
        this.code = resultCode.getCode();
        this.msg = msg;
    }

    public Result(ResultCode resultCode, String msg, T data) {
        this.code = resultCode.getCode();
        this.msg = msg;
        this.data = data;
    }

    /**
     * 封装成功时返回的对象
     */
    public static <T> Result<T> success(String msg) {
        return new Result<>(ResultCode.SUCCESS, msg);
    }

    public static <T> Result<T> success(String msg, T data){
        return new Result<>(ResultCode.SUCCESS, msg, data);
    }

    /**
     * 封装失败时返回的对象
     */
    public static <T> Result<T> error(ResultCode resultCode) {
        return new Result<>(resultCode);
    }
    public static <T> Result<T> error(ResultCode resultCode, String msg){
        return new Result<>(resultCode, msg);
    }
    public static <T> Result<T> error(ResultCode resultCode, String msg, T data){
        return new Result<>(resultCode, msg, data);
    }
    public static <T> Result<T> error(String msg){
        return new Result<>(ResultCode.FAIL, msg);
    }
    public static <T> Result<T> error(String msg, T data){
        return new Result<>(ResultCode.FAIL, msg, data);
    }


    public Integer getCode() {
        return this.code;
    }

    public void setCode(ResultCode resultCode) {
        this.code = resultCode.getCode();
    }

    public String getMsg() {
        return this.msg;
    }

    public void setMsg(String msg) {
        this.msg = msg;
    }

    public T getData() {
        return this.data;
    }

    public void setData(T data) {
        this.data = data;
    }

}

