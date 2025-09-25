package com.yxboot.modules.sys.mapper;

import com.mybatisflex.core.BaseMapper;
import com.yxboot.modules.sys.entity.SysRole;

/**
 * 角色表 Mapper
 *
 * @author Boya
 */
public interface SysRoleMapper extends BaseMapper<SysRole> {
    SysRole selectByUserId(Long userId);
}
