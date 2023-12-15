package com.yxboot.modules.sys.mapper;

import com.baomidou.mybatisplus.core.mapper.BaseMapper;
import com.yxboot.modules.sys.entity.SysRole;

/**
 * 角色表 Mapper
 *
 * @author Boya
 */
public interface SysRoleMapper extends BaseMapper<SysRole> {
    SysRole selectByUserId(Long userId);
}
