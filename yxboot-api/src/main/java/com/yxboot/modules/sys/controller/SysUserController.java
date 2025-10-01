package com.yxboot.modules.sys.controller;

import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import com.mybatisflex.core.paginate.Page;
import com.yxboot.common.api.Result;
import com.yxboot.common.aspect.SysLogOperation;
import com.yxboot.common.pagination.PageRequest;
import com.yxboot.modules.sys.entity.SysUser;
import com.yxboot.modules.sys.entity.SysUserRole;
import com.yxboot.modules.sys.service.SysUserRoleService;
import com.yxboot.modules.sys.service.SysUserService;
import com.yxboot.utils.UserUtil;
import cn.hutool.core.bean.BeanUtil;
import cn.hutool.core.bean.copier.CopyOptions;
import cn.hutool.core.util.StrUtil;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;


/**
 * 用户表 Api
 *
 * @author Boya
 */
@Slf4j
@RestController
@RequestMapping("/sys/user")
@RequiredArgsConstructor
@Tag(name = "【系统模块】用户表 Api")
public class SysUserController {
    private final SysUserService sysUserService;
    private final SysUserRoleService sysUserRoleService;
    private final PasswordEncoder passwordEncoder;

    @GetMapping("/list")
    @Operation(summary = "查询列表接口")
    public Result<Page<SysUser>> list(String name, String phone, Long roleId, String status, Integer deptId,
            PageRequest pageRequest) {
        Page<SysUser> pageResult = sysUserService.pageQuery(name, phone, roleId, status, deptId, pageRequest);
        return Result.success("查询成功！", pageResult);
    }

    @GetMapping("/get")
    @Operation(summary = "查询详情接口")
    public Result<SysUser> get(@RequestParam Long userId) {
        SysUser sysUser = sysUserService.selectById(userId);
        return Result.success("查询成功！", sysUser);
    }

    @PostMapping("/save")
    @SysLogOperation(value = "保存用户信息")
    @Operation(summary = "保存信息接口")
    public Result<SysUser> save(@RequestBody SysUser sysUser) {
        if (sysUser.getUserId() != null) {
            SysUser dbUser = sysUserService.getById(sysUser.getUserId());
            BeanUtil.copyProperties(sysUser, dbUser, CopyOptions.create().ignoreNullValue());
            sysUser = dbUser;
        } else {
            String username = sysUser.getUsername();
            if (StrUtil.isEmpty(username)) {
                return Result.error("登录账号不能为空");
            }
            SysUser dbUser = sysUserService.selectByUsername(username);
            if (dbUser != null) {
                return Result.error("该登录账号已存在，请修改登录账号");
            }
            sysUser.setPassword(passwordEncoder.encode(sysUser.getPassword()));
        }
        sysUserService.saveOrUpdate(sysUser);

        Long roleId = sysUser.getRoleId();
        if (roleId != null) {
            sysUserRoleService.removeByUserId(sysUser.getUserId());

            SysUserRole userRole = new SysUserRole();
            userRole.setUserId(sysUser.getUserId());
            userRole.setRoleId(roleId);
            sysUserRoleService.save(userRole);
        }
        return Result.success("保存成功！", sysUser);
    }

    @PostMapping("/resetPassword")
    @SysLogOperation(value = "重置用户密码")
    @Operation(summary = "重置用户密码接口")
    public Result<SysUser> resetPassword(Long userId, String password) {
        SysUser sysUser = sysUserService.getById(userId);
        if (sysUser != null && StrUtil.isNotEmpty(password)) {
            sysUser.setPassword(passwordEncoder.encode(password));
            sysUserService.saveOrUpdate(sysUser);
            return Result.success("保存成功！", sysUser);
        } else {
            return Result.error("重置失败！");
        }
    }

    @PostMapping("/changePassword")
    @SysLogOperation(value = "修改密码")
    @Operation(summary = "修改密码接口")
    public Result<SysUser> changePassword(String oldPassword, String password) {
        Long userId = UserUtil.getCurrentUserId();
        SysUser sysUser = sysUserService.getById(userId);
        if (sysUser != null && StrUtil.isNotEmpty(password) && StrUtil.isNotBlank(oldPassword)) {
            if (passwordEncoder.matches(oldPassword, sysUser.getPassword())) {
                sysUser.setPassword(passwordEncoder.encode(password));
                sysUserService.saveOrUpdate(sysUser);
                return Result.success("保存成功！", sysUser);
            } else {
                return Result.error("原密码错误");
            }
        } else {
            return Result.error("修改失败！");
        }
    }

    @DeleteMapping("/remove")
    @SysLogOperation(value = "删除用户信息")
    @Operation(summary = "删除信息接口")
    public Result<Void> remove(Long userId) {
        sysUserService.removeById(userId);
        log.warn("删除用户，用户id：{}", userId);
        return Result.success("删除成功！");
    }
}
