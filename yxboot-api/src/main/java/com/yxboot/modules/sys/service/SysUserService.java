package com.yxboot.modules.sys.service;

import cn.hutool.core.util.StrUtil;
import com.baomidou.mybatisplus.core.conditions.query.QueryWrapper;
import com.baomidou.mybatisplus.core.metadata.IPage;
import com.baomidou.mybatisplus.extension.service.impl.ServiceImpl;
import com.yxboot.common.pagination.PageRequest;
import com.yxboot.modules.sys.entity.SysUser;
import com.yxboot.modules.sys.mapper.SysUserMapper;
import org.springframework.stereotype.Service;

/**
 * 用户表业务实现类
 *
 * @author Boya
 */
@Service
public class SysUserService extends ServiceImpl<SysUserMapper, SysUser>{

    public IPage<SysUser> pageQuery(String name, String phone, Long roleId, Integer status,Integer deptId, PageRequest pageRequest){
        QueryWrapper<SysUser> wrapper = new QueryWrapper<>();
        wrapper.like(StrUtil.isNotEmpty(name), "name", name);
        wrapper.like(StrUtil.isNotEmpty(phone), "phone", phone);
        wrapper.eq(status != null, "status", status);
        wrapper.eq( deptId!=null ,"dept_id",deptId);
        wrapper.exists(roleId != null, "select * from sys_user_role where sys_user_role.user_id=sys_user.user_id and sys_user_role.role_id=" + roleId);
        wrapper.orderByDesc("user_id");
        return page(pageRequest.convertToPage(), wrapper);
    }

    public SysUser selectByUsername(String username){
        QueryWrapper<SysUser> wrapper = new QueryWrapper<>();
        wrapper.eq("username", username);
        return getOne(wrapper);
    }
}
