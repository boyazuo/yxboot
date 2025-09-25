package com.yxboot.modules.sys.service;

import static com.yxboot.modules.sys.entity.table.SysDeptTableDef.SYS_DEPT;
import static com.yxboot.modules.sys.entity.table.SysRoleTableDef.SYS_ROLE;
import static com.yxboot.modules.sys.entity.table.SysUserRoleTableDef.SYS_USER_ROLE;
import static com.yxboot.modules.sys.entity.table.SysUserTableDef.SYS_USER;
import org.springframework.stereotype.Service;
import com.mybatisflex.core.paginate.Page;
import com.mybatisflex.core.query.QueryWrapper;
import com.mybatisflex.spring.service.impl.ServiceImpl;
import com.yxboot.common.pagination.PageRequest;
import com.yxboot.modules.sys.entity.SysUser;
import com.yxboot.modules.sys.mapper.SysUserMapper;
import cn.hutool.core.util.StrUtil;


/**
 * 用户表业务实现类
 *
 * @author Boya
 */
@Service
public class SysUserService extends ServiceImpl<SysUserMapper, SysUser> {

    public Page<SysUser> pageQuery(String name, String phone, Long roleId, Integer status, Integer deptId,
            PageRequest pageRequest) {
        QueryWrapper wrapper = QueryWrapper.create();
        wrapper.select(SYS_USER.ALL_COLUMNS);
        wrapper.select(SYS_ROLE.ROLE_ID, SYS_ROLE.NAME.as("roleName"));
        wrapper.select(SYS_DEPT.DEPT_ID, SYS_DEPT.NAME.as("deptName"));
        if (StrUtil.isNotEmpty(name)) {
            wrapper.where(SYS_USER.NAME.like(name));
        }
        if (StrUtil.isNotEmpty(phone)) {
            wrapper.where(SYS_USER.PHONE.like(phone));
        }
        if (status != null) {
            wrapper.where(SYS_USER.STATUS.eq(status));
        }
        if (roleId != null) {
            wrapper.where(SYS_USER_ROLE.ROLE_ID.eq(roleId));
        }
        if (deptId != null) {
            wrapper.where(SYS_USER.DEPT_ID.eq(deptId));
        }
        wrapper.leftJoin(SYS_USER_ROLE).on(SYS_USER_ROLE.USER_ID.eq(SYS_USER.USER_ID));
        wrapper.leftJoin(SYS_ROLE).on(SYS_ROLE.ROLE_ID.eq(SYS_USER_ROLE.ROLE_ID));
        wrapper.leftJoin(SYS_DEPT).on(SYS_DEPT.DEPT_ID.eq(SYS_USER.DEPT_ID));
        wrapper.orderBy(SYS_USER.USER_ID, false);

        return page(pageRequest.convertToPage(), wrapper);
    }

    public SysUser selectById(Long userId) {
        QueryWrapper wrapper = QueryWrapper.create();
        wrapper.select(SYS_USER.ALL_COLUMNS);
        wrapper.select(SYS_ROLE.ROLE_ID, SYS_ROLE.NAME.as("roleName"));
        wrapper.select(SYS_DEPT.DEPT_ID, SYS_DEPT.NAME.as("deptName"));
        wrapper.where(SYS_USER.USER_ID.eq(userId));
        wrapper.leftJoin(SYS_USER_ROLE).on(SYS_USER_ROLE.USER_ID.eq(SYS_USER.USER_ID));
        wrapper.leftJoin(SYS_ROLE).on(SYS_ROLE.ROLE_ID.eq(SYS_USER_ROLE.ROLE_ID));
        wrapper.leftJoin(SYS_DEPT).on(SYS_DEPT.DEPT_ID.eq(SYS_USER.DEPT_ID));
        return getOne(wrapper);
    }

    public SysUser selectByUsername(String username) {
        QueryWrapper wrapper = QueryWrapper.create()
                .where(SYS_USER.USERNAME.eq(username));

        return getOne(wrapper);
    }
}
