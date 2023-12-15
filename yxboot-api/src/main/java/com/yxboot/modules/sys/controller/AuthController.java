package com.yxboot.modules.sys.controller;

import cn.hutool.captcha.CaptchaUtil;
import cn.hutool.captcha.ShearCaptcha;
import cn.hutool.captcha.generator.RandomGenerator;
import cn.hutool.core.collection.CollUtil;
import cn.hutool.core.util.StrUtil;
import com.yxboot.common.api.Result;
import com.yxboot.common.api.ResultCode;
import com.yxboot.common.aspect.SysLogOperation;
import com.yxboot.common.enums.LogTypeEnum;
import com.yxboot.config.security.jwt.JwtTokenUtil;
import com.yxboot.modules.sys.entity.SysMenu;
import com.yxboot.modules.sys.entity.SysUser;
import com.yxboot.modules.sys.entity.SysUserRole;
import com.yxboot.modules.sys.service.SysMenuService;
import com.yxboot.modules.sys.service.SysUserRoleService;
import com.yxboot.modules.sys.service.SysUserService;
import com.yxboot.utils.UserUtil;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import jakarta.servlet.http.HttpSession;
import lombok.RequiredArgsConstructor;
import org.springframework.security.authentication.*;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.AuthenticationException;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.io.IOException;
import java.util.List;
import java.util.stream.Collectors;

@RestController
@RequestMapping("/auth")
@RequiredArgsConstructor
@Tag(name = "【用户认证】认证接口 Api")
public class AuthController {
    private final AuthenticationManager authenticationManager;
    private final SysUserService sysUserService;
    private final SysUserRoleService sysUserRoleService;
    private final SysMenuService sysMenuService;
    private final JwtTokenUtil jwtTokenUtil;
    private final UserUtil userUtil;

    /**
     * 验证码字典
     */
    private final static String RANDOM_GENERATOR_CODE = "AaBbCcDdEeFfGHhJjKkMmNnPpQqRrSsTtUuVvWwXxYyZz2345678";

    @SysLogOperation(value = "用户登录", type = LogTypeEnum.LOGIN)
    @PostMapping(value = "/login")
    @Operation(summary = "登录接口")
    public Result login(String username, String password, String captchaCode, HttpSession session) throws AuthenticationException {
        String sessionCaptchaCode = StrUtil.toString(session.getAttribute("captchaCode"));
        RandomGenerator randomGenerator = new RandomGenerator(RANDOM_GENERATOR_CODE, 4);
        if (!randomGenerator.verify(sessionCaptchaCode, captchaCode)) {
            return Result.error(ResultCode.FORBIDDEN, "验证码错误");
        }
        UsernamePasswordAuthenticationToken authenticationToken = new UsernamePasswordAuthenticationToken(username, password);
        try {
            Authentication authentication = authenticationManager.authenticate(authenticationToken);
            SecurityContextHolder.getContext().setAuthentication(authentication);
        } catch (AuthenticationException e) {
            String msg = e.getMessage();
            if (e instanceof LockedException) {
                msg = "账户被锁定，请联系管理员!";
            } else if (e instanceof CredentialsExpiredException) {
                msg = "密码过期，请联系管理员!";
            } else if (e instanceof AccountExpiredException) {
                msg = "账户过期，请联系管理员!";
            } else if (e instanceof DisabledException) {
                msg = "账户被禁用，请联系管理员!";
            } else if (e instanceof BadCredentialsException) {
                msg = "用户名或者密码输入错误，请重新输入!";
            }
            return Result.error(ResultCode.FORBIDDEN, msg);
        }
        SysUser user = sysUserService.selectByUsername(username);
        return Result.success("登录成功", jwtTokenUtil.createJWT(user));
    }

    @Operation(summary = "获取验证码")
    @GetMapping("/captcha")
    public void captcha(HttpServletRequest request, HttpServletResponse response) throws IOException {
        // 定义验证码字典表 和取值长度
        RandomGenerator randomGenerator = new RandomGenerator(RANDOM_GENERATOR_CODE, 4);

        // 定义图形验证码的长、宽、验证码字符数、干扰线宽度
        ShearCaptcha captcha = CaptchaUtil.createShearCaptcha(150, 40);
        // 自定义验证码
        captcha.setGenerator(randomGenerator);
        // 生成验证码
        captcha.createCode();
        // 获取验证码中的文字内容
        String captchaCode = captcha.getCode();
        // 图形验证码写出，可以写出到文件，也可以写出到流
        captcha.write(response.getOutputStream());
        request.getSession().setAttribute("captchaCode", captchaCode);
    }

    @GetMapping(value = "/profile")
    @Operation(summary = "获取当前用户信息")
    public Result profile() throws AuthenticationException {
        return Result.success("查询成功", userUtil.getCurrentUser());
    }

    @GetMapping(value = "/permissions")
    @Operation(summary = "获取当前用户权限")
    public Result permissions() throws AuthenticationException {
        Long currentUserId = userUtil.getCurrentUserId();
        List<SysUserRole> userRoles = sysUserRoleService.selectByUserId(currentUserId);
        List<Long> roleIds = userRoles.stream().map(SysUserRole::getRoleId).collect(Collectors.toList());
        if (CollUtil.isNotEmpty(roleIds)) {
            List<SysMenu> menus = sysMenuService.selectByRoleId(roleIds);
            return Result.success("查询成功", menus);
        }
        return Result.error("查询失败，用户角色设置错误。");
    }
}
