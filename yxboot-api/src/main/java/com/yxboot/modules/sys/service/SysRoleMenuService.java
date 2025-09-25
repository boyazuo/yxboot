package com.yxboot.modules.sys.service;

import static com.yxboot.modules.sys.entity.table.SysRoleMenuTableDef.SYS_ROLE_MENU;
import org.springframework.stereotype.Service;
import com.mybatisflex.core.query.QueryWrapper;
import com.mybatisflex.spring.service.impl.ServiceImpl;
import com.yxboot.modules.sys.entity.SysRoleMenu;
import com.yxboot.modules.sys.mapper.SysRoleMenuMapper;


/**
 * 角色菜单表业务实现类
 *
 * @author Boya
 */
@Service
public class SysRoleMenuService extends ServiceImpl<SysRoleMenuMapper, SysRoleMenu> {
    public boolean removeByRoleId(Long roleId) {
        QueryWrapper wrapper = QueryWrapper.create();
        wrapper.where(SYS_ROLE_MENU.ROLE_ID.eq(roleId));
        return remove(wrapper);
    }
}
