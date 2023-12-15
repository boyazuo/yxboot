package com.yxboot.modules.sys.controller;

import cn.hutool.core.collection.CollUtil;
import com.baomidou.mybatisplus.core.metadata.IPage;
import com.yxboot.common.api.Result;
import com.yxboot.common.aspect.SysLogOperation;
import com.yxboot.common.pagination.PageRequest;
import com.yxboot.modules.sys.entity.SysMenu;
import com.yxboot.modules.sys.entity.SysRole;
import com.yxboot.modules.sys.entity.SysRoleMenu;
import com.yxboot.modules.sys.service.SysRoleMenuService;
import com.yxboot.modules.sys.service.SysRoleService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;
import java.util.List;


/**
 * 角色表 Api
 *
 * @author Boya
 */
@RestController
@RequestMapping("/sys/role")
@RequiredArgsConstructor
@Tag(name = "【系统模块】角色表 Api")
public class SysRoleController {
    private final SysRoleService sysRoleService;
    private final SysRoleMenuService sysRoleMenuService;

    @GetMapping("/list")
    @Operation(summary = "查询列表接口")
    public Result list(String name, Integer status, PageRequest pageRequest) {
        IPage<SysRole> pageResult = sysRoleService.pageQuery(name, status, pageRequest);
        return Result.success("查询成功！", pageResult);
    }

    @GetMapping("/all")
    @Operation(summary = "角色列表（不分页）")
    public Result listAll(String name, Integer status) {
        List<SysRole> list = sysRoleService.query(name, status);
        return Result.success("查询成功！", list);
    }

    @GetMapping("/get")
    @Operation(summary = "查询详情接口")
    public Result get(@RequestParam Long roleId) {
        SysRole sysRole = sysRoleService.getById(roleId);
        return Result.success("查询成功！", sysRole);
    }

    @PostMapping("/save")
    @SysLogOperation(value = "保存角色信息")
    @Operation(summary = "保存信息接口")
    public Result save(@RequestBody SysRole sysRole) {
        sysRoleService.saveOrUpdate(sysRole);
        sysRoleMenuService.removeByRoleId(sysRole.getRoleId());
        List<SysMenu> menus = sysRole.getMenus();
        if (CollUtil.isNotEmpty(menus)) {
            List<SysRoleMenu> roleMenus = new ArrayList<>();
            for (SysMenu menu : menus) {
                SysRoleMenu sysRoleMenu = new SysRoleMenu();
                sysRoleMenu.setRoleId(sysRole.getRoleId());
                sysRoleMenu.setMenuId(menu.getMenuId());
                roleMenus.add(sysRoleMenu);
            }
            sysRoleMenuService.saveBatch(roleMenus);
        }
        return Result.success("保存成功！", sysRole);
    }

    @PostMapping("/saveMenus")
    @SysLogOperation(value = "保存角色菜单信息")
    @Operation(summary = "保存角色菜单接口")
    public Result saveMenus(@RequestBody SysRole sysRole) {
        sysRoleMenuService.removeByRoleId(sysRole.getRoleId());
        List<SysMenu> menus = sysRole.getMenus();
        if (CollUtil.isNotEmpty(menus)) {
            List<SysRoleMenu> roleMenus = new ArrayList<>();
            for (SysMenu menu : menus) {
                SysRoleMenu sysRoleMenu = new SysRoleMenu();
                sysRoleMenu.setRoleId(sysRole.getRoleId());
                sysRoleMenu.setMenuId(menu.getMenuId());
                roleMenus.add(sysRoleMenu);
            }
            sysRoleMenuService.saveBatch(roleMenus);
        }
        return Result.success("保存成功！", sysRole);
    }

    @DeleteMapping("/remove")
    @SysLogOperation(value = "删除角色信息")
    @Operation(summary = "删除信息接口")
    public Result remove(Long roleId) {
        sysRoleService.removeById(roleId);
        return Result.success("删除成功！");
    }
}
