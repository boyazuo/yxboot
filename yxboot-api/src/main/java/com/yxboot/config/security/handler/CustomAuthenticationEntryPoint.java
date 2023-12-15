package com.yxboot.config.security.handler;

import cn.hutool.json.JSONUtil;
import com.yxboot.common.api.Result;
import com.yxboot.common.api.ResultCode;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import org.springframework.security.core.AuthenticationException;
import org.springframework.security.web.AuthenticationEntryPoint;

import java.io.IOException;

/**
 * 自定义返回结果：未登录或登录过期
 *
 * @author Boya
 */
public class CustomAuthenticationEntryPoint implements AuthenticationEntryPoint {
    @Override
    public void commence(HttpServletRequest request, HttpServletResponse response, AuthenticationException authException) throws IOException, ServletException {
        response.setHeader("Access-Control-Allow-Origin", "*");
        response.setHeader("Cache-Control","no-cache");
        response.setCharacterEncoding("UTF-8");
        response.setContentType("application/json");
        response.getWriter().println(JSONUtil.parse(Result.error(ResultCode.UNAUTHORIZED, "未登录或登录过期，请重新登录！")));
        response.getWriter().flush();
    }
}
