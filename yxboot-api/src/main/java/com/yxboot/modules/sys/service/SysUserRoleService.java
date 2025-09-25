package com.yxboot.modules.sys.service;

import static com.yxboot.modules.sys.entity.table.SysUserRoleTableDef.SYS_USER_ROLE;
import java.util.List;
import org.springframework.stereotype.Service;
import com.mybatisflex.core.query.QueryWrapper;
import com.mybatisflex.spring.service.impl.ServiceImpl;
import com.yxboot.modules.sys.entity.SysUserRole;
import com.yxboot.modules.sys.mapper.SysUserRoleMapper;


/**
 * 用户角色表业务实现类
 *
 * @author Boya
 */
@Service
public class SysUserRoleService extends ServiceImpl<SysUserRoleMapper, SysUserRole> {
    public List<SysUserRole> selectByUserId(Long userId) {
        QueryWrapper wrapper = QueryWrapper.create();
        wrapper.where(SYS_USER_ROLE.USER_ID.eq(userId));
        return list(wrapper);
    }

    public boolean removeByUserId(Long userId) {
        QueryWrapper wrapper = QueryWrapper.create();
        wrapper.where(SYS_USER_ROLE.USER_ID.eq(userId));
        return remove(wrapper);
    }
}
