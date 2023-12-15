package com.yxboot.modules.sys.service;

import com.baomidou.mybatisplus.core.conditions.query.QueryWrapper;
import com.baomidou.mybatisplus.extension.service.impl.ServiceImpl;
import com.yxboot.modules.sys.entity.SysRoleMenu;
import com.yxboot.modules.sys.mapper.SysRoleMenuMapper;
import org.springframework.stereotype.Service;


/**
 * 角色菜单表业务实现类
 *
 * @author Boya
 */
@Service
public class SysRoleMenuService extends ServiceImpl<SysRoleMenuMapper, SysRoleMenu>{
    public boolean removeByRoleId(Long roleId){
        QueryWrapper<SysRoleMenu> wrapper = new QueryWrapper<>();
        wrapper.eq("role_id", roleId);
        return remove(wrapper);
    }
}
