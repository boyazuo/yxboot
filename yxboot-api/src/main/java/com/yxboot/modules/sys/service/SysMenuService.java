package com.yxboot.modules.sys.service;

import cn.hutool.core.collection.CollUtil;
import com.baomidou.mybatisplus.core.conditions.query.QueryWrapper;
import com.baomidou.mybatisplus.extension.service.impl.ServiceImpl;
import com.yxboot.common.enums.MenuEnum;
import com.yxboot.modules.sys.entity.SysMenu;
import com.yxboot.modules.sys.mapper.SysMenuMapper;
import org.springframework.stereotype.Service;

import java.util.List;


/**
 * 菜单表业务实现类
 *
 * @author Boya
 */
@Service
public class SysMenuService extends ServiceImpl<SysMenuMapper, SysMenu> {
    public List<SysMenu> selectAll() {
        QueryWrapper<SysMenu> wrapper = new QueryWrapper<>();
        wrapper.orderByAsc("sort");
        return list(wrapper);
    }

    public List<SysMenu> query(Long parentId, List<Integer> type, Long roleId, Integer status) {
        QueryWrapper<SysMenu> wrapper = new QueryWrapper<>();
        wrapper.eq(parentId != null, "parent_id", parentId);
        wrapper.in(CollUtil.isNotEmpty(type), "type", type);
        wrapper.exists(roleId != null, "select * from sys_role_menu where sys_role_menu.menu_id=sys_menu.menu_id and role_id=" + roleId);
        wrapper.eq(status != null, "status", status);
        wrapper.orderByAsc("sort");
        return list(wrapper);
    }

    public List<SysMenu> selectByRoleId(Long roleId) {
        QueryWrapper<SysMenu> wrapper = new QueryWrapper<>();
        wrapper.exists("select * from sys_role_menu where sys_role_menu.menu_id=sys_menu.menu_id and role_id=" + roleId);
        wrapper.orderByAsc("sort");
        return list(wrapper);
    }

    public List<SysMenu> selectByRoleId(List<Long> roleIds) {
        QueryWrapper<SysMenu> wrapper = new QueryWrapper<>();
        wrapper.exists("select * from sys_role_menu where sys_role_menu.menu_id=sys_menu.menu_id and role_id in (" + CollUtil.join(roleIds, ",") + ")");
        wrapper.orderByAsc("sort");
        return list(wrapper);
    }

    public List<SysMenu> queryByParentId(Long menuId) {
        QueryWrapper<SysMenu> wrapper = new QueryWrapper<>();
        wrapper.eq("parent_id",menuId);
        wrapper.ne("type", MenuEnum.BUTTON);
       return list(wrapper);
    }

    public List<SysMenu> queryByParentIdAndBootion(Long menuId) {
        QueryWrapper<SysMenu> wrapper = new QueryWrapper<>();
        wrapper.eq("parent_id",menuId);
        wrapper.eq("type", MenuEnum.BUTTON);
        return list(wrapper);
    }
}
