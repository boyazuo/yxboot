package com.yxboot.modules.sys.controller;

import cn.hutool.core.collection.CollUtil;
import com.baomidou.mybatisplus.core.metadata.IPage;
import com.baomidou.mybatisplus.extension.plugins.pagination.Page;
import com.yxboot.common.api.Result;
import com.yxboot.common.aspect.SysLogOperation;
import com.yxboot.common.enums.MenuEnum;
import com.yxboot.modules.sys.entity.SysMenu;
import com.yxboot.modules.sys.filler.SysMenuFiller;
import com.yxboot.modules.sys.service.SysMenuService;
import com.yxboot.utils.TreeUtil;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

import java.util.List;


/**
 * 菜单表 Api
 *
 * @author Boya
 */
@RestController
@RequestMapping("/sys/menu")
@RequiredArgsConstructor
@Tag(name = "【系统模块】菜单表 Api")
public class SysMenuController {
    private final SysMenuService sysMenuService;
    private final SysMenuFiller sysMenuFiller;

    @GetMapping("/all")
    @Operation(summary = "查询列表接口,没有分页")
    public Result all(Long parentId, @RequestParam(required = false) List<Integer> type, Long roleId, Integer status) {
        List<SysMenu> list = sysMenuService.query(parentId, type, roleId, status);
        sysMenuFiller.fillSysMenu(list);
        return Result.success("查询成功！", list);
    }

    @GetMapping("/tree")
    @Operation(summary = "查询列表接口,返回树形结构")
    public Result tree() {
        List<SysMenu> list = sysMenuService.selectAll();
        sysMenuFiller.fillSysMenu(list);
        return Result.success("查询成功！", TreeUtil.menuTrees(list));
    }

    @GetMapping("/list")
    @Operation(summary = "查询列表接口")
    public Result list(@RequestParam(defaultValue = "1") Long current, @RequestParam(defaultValue = "20") Long pageSize) {
        IPage page = new Page(current, pageSize);
        IPage<SysMenu> pageResult = sysMenuService.page(page);
        return Result.success("查询成功！", pageResult);
    }

    @GetMapping("/get")
    @Operation(summary = "查询详情接口")
    public Result get(@RequestParam Long menuId) {
        SysMenu sysMenu =sysMenuService.getById(menuId);
        return Result.success("查询成功！", sysMenu );
    }

    @PostMapping("/save")
    @SysLogOperation(value = "保存菜单信息")
    @Operation(summary = "保存信息接口")
    public Result save(@RequestBody SysMenu sysMenu) {
        sysMenuService.saveOrUpdate(sysMenu);
        return Result.success("保存成功！", sysMenu);
    }

    @DeleteMapping("/remove")
    @SysLogOperation(value = "删除菜单信息")
    @Operation(summary = "删除信息接口")
    public Result remove(Long menuId) {
      List<SysMenu>  sysMenus= sysMenuService.queryByParentId(menuId);
        if (CollUtil.isNotEmpty(sysMenus)){
            return  Result.error("删除失败！当前菜单下有子级菜单不可删除");
        }
        SysMenu sysMenu=  sysMenuService.getById(menuId);
        if (sysMenu.getType()== MenuEnum.MENU) {
           List<SysMenu> sysMenuList= sysMenuService.queryByParentIdAndBootion(menuId);
            sysMenuService.removeBatchByIds(sysMenuList);
        }
        sysMenuService.removeById(menuId);

        return Result.success("删除成功！");
    }
}
