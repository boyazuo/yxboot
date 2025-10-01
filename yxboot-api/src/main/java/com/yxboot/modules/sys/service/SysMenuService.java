package com.yxboot.modules.sys.service;

import static com.yxboot.modules.sys.entity.table.SysMenuTableDef.SYS_MENU;
import static com.yxboot.modules.sys.entity.table.SysRoleMenuTableDef.SYS_ROLE_MENU;
import java.util.List;
import org.springframework.stereotype.Service;
import com.mybatisflex.core.query.QueryWrapper;
import com.mybatisflex.spring.service.impl.ServiceImpl;
import com.yxboot.common.enums.MenuEnum;
import com.yxboot.modules.sys.entity.SysMenu;
import com.yxboot.modules.sys.entity.table.SysMenuTableDef;
import com.yxboot.modules.sys.mapper.SysMenuMapper;
import cn.hutool.core.collection.CollUtil;
import cn.hutool.core.util.StrUtil;


/**
 * 菜单表业务实现类
 *
 * @author Boya
 */
@Service
public class SysMenuService extends ServiceImpl<SysMenuMapper, SysMenu> {

    public List<SysMenu> selectAll() {
        SysMenuTableDef parent = SYS_MENU.as("parent");

        QueryWrapper wrapper = QueryWrapper.create();
        wrapper.select(SYS_MENU.ALL_COLUMNS);
        wrapper.select(parent.NAME.as("parentName"));
        wrapper.leftJoin(parent).on(SYS_MENU.PARENT_ID.eq(parent.MENU_ID));
        wrapper.orderBy(SYS_MENU.SORT, true);

        return list(wrapper);
    }

    public List<SysMenu> query(Long parentId, List<Integer> type, Long roleId, String status) {
        SysMenuTableDef parent = SYS_MENU.as("parent");
        QueryWrapper wrapper = QueryWrapper.create();
        wrapper.select(SYS_MENU.ALL_COLUMNS);
        wrapper.select(parent.NAME.as("parentName"));
        if (parentId != null) {
            wrapper.where(SYS_MENU.PARENT_ID.eq(parentId));
        }
        if (CollUtil.isNotEmpty(type)) {
            wrapper.where(SYS_MENU.TYPE.in(type));
        }
        if (roleId != null) {
            wrapper.leftJoin(SYS_ROLE_MENU).on(SYS_ROLE_MENU.MENU_ID.eq(SYS_MENU.MENU_ID));
            wrapper.where(SYS_ROLE_MENU.ROLE_ID.eq(roleId));
        }
        if (StrUtil.isNotEmpty(status)) {
            wrapper.where(SYS_MENU.STATUS.eq(status));
        }
        wrapper.leftJoin(parent).on(SYS_MENU.PARENT_ID.eq(parent.MENU_ID));

        wrapper.orderBy(SYS_MENU.SORT, true);
        return list(wrapper);
    }

    public List<SysMenu> selectByRoleId(Long roleId) {
        QueryWrapper wrapper = QueryWrapper.create();
        wrapper.leftJoin(SYS_ROLE_MENU).on(SYS_ROLE_MENU.MENU_ID.eq(SYS_MENU.MENU_ID));
        wrapper.where(SYS_ROLE_MENU.ROLE_ID.eq(roleId));
        wrapper.orderBy(SYS_MENU.SORT, true);
        return list(wrapper);
    }

    public List<SysMenu> selectByRoleId(List<Long> roleIds) {
        QueryWrapper wrapper = QueryWrapper.create();
        wrapper.leftJoin(SYS_ROLE_MENU).on(SYS_ROLE_MENU.MENU_ID.eq(SYS_MENU.MENU_ID));
        wrapper.where(SYS_ROLE_MENU.ROLE_ID.in(roleIds));
        wrapper.orderBy(SYS_MENU.SORT, true);
        return list(wrapper);
    }

    public List<SysMenu> queryByParentId(Long menuId) {
        QueryWrapper wrapper = QueryWrapper.create();
        wrapper.where(SYS_MENU.PARENT_ID.eq(menuId));
        wrapper.where(SYS_MENU.TYPE.ne(MenuEnum.BUTTON));
        return list(wrapper);
    }

    public List<SysMenu> queryByParentIdAndBooton(Long menuId) {
        QueryWrapper wrapper = QueryWrapper.create();
        wrapper.where(SYS_MENU.PARENT_ID.eq(menuId));
        wrapper.where(SYS_MENU.TYPE.eq(MenuEnum.BUTTON));
        return list(wrapper);
    }
}
