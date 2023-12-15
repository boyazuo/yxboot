package com.yxboot.modules.sys.service;

import com.baomidou.mybatisplus.core.conditions.query.QueryWrapper;
import com.baomidou.mybatisplus.extension.service.impl.ServiceImpl;
import com.yxboot.modules.sys.entity.SysUserRole;
import com.yxboot.modules.sys.mapper.SysUserRoleMapper;
import org.springframework.stereotype.Service;

import java.util.List;


/**
 * 用户角色表业务实现类
 *
 * @author Boya
 */
@Service
public class SysUserRoleService extends ServiceImpl<SysUserRoleMapper, SysUserRole>{
    public List<SysUserRole> selectByUserId(Long userId){
        QueryWrapper<SysUserRole> wrapper = new QueryWrapper<>();
        wrapper.eq("user_id", userId);
        return list(wrapper);
    }

    public boolean removeByUserId(Long userId){
        QueryWrapper<SysUserRole> wrapper = new QueryWrapper<>();
        wrapper.eq("user_id", userId);
        return remove(wrapper);
    }
}
