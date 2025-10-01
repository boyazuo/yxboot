package com.yxboot.modules.sys.controller;

import java.util.Collection;
import java.util.List;
import java.util.stream.Collectors;
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
import com.yxboot.common.enums.MenuEnum;
import com.yxboot.common.pagination.PageRequest;
import com.yxboot.modules.sys.entity.SysMenu;
import com.yxboot.modules.sys.service.SysMenuService;
import com.yxboot.utils.TreeUtil;
import cn.hutool.core.collection.CollUtil;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import lombok.RequiredArgsConstructor;


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

    @GetMapping("/all")
    @Operation(summary = "查询列表接口,没有分页")
    public Result<List<SysMenu>> all(Long parentId, @RequestParam(required = false) List<Integer> type, Long roleId,
            String status) {
        List<SysMenu> list = sysMenuService.query(parentId, type, roleId, status);
        return Result.success("查询成功！", list);
    }

    @GetMapping("/tree")
    @Operation(summary = "查询列表接口,返回树形结构")
    public Result<Collection<SysMenu>> tree() {
        List<SysMenu> list = sysMenuService.selectAll();
        return Result.success("查询成功！", TreeUtil.menuTrees(list));
    }

    @GetMapping("/list")
    @Operation(summary = "查询列表接口")
    public Result<Page<SysMenu>> list(PageRequest pageRequest) {
        Page<SysMenu> page = pageRequest.convertToPage();
        Page<SysMenu> pageResult = sysMenuService.page(page);
        return Result.success("查询成功！", pageResult);
    }

    @GetMapping("/get")
    @Operation(summary = "查询详情接口")
    public Result<SysMenu> get(@RequestParam Long menuId) {
        SysMenu sysMenu = sysMenuService.getById(menuId);
        return Result.success("查询成功！", sysMenu);
    }

    @PostMapping("/save")
    @SysLogOperation(value = "保存菜单信息")
    @Operation(summary = "保存信息接口")
    public Result<SysMenu> save(@RequestBody SysMenu sysMenu) {
        sysMenuService.saveOrUpdate(sysMenu);
        return Result.success("保存成功！", sysMenu);
    }

    @DeleteMapping("/remove")
    @SysLogOperation(value = "删除菜单信息")
    @Operation(summary = "删除信息接口")
    public Result<Void> remove(Long menuId) {
        List<SysMenu> sysMenus = sysMenuService.queryByParentId(menuId);
        if (CollUtil.isNotEmpty(sysMenus)) {
            return Result.error("删除失败！当前菜单下有子级菜单不可删除");
        }
        SysMenu sysMenu = sysMenuService.getById(menuId);
        if (sysMenu.getType() == MenuEnum.MENU) {
            List<SysMenu> sysMenuList = sysMenuService.queryByParentIdAndBooton(menuId);
            sysMenuService.removeByIds(sysMenuList.stream().map(SysMenu::getMenuId).collect(Collectors.toList()));
        }
        sysMenuService.removeById(menuId);

        return Result.success("删除成功！");
    }
}
