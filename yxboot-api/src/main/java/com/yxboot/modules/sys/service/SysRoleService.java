package com.yxboot.modules.sys.service;

import static com.yxboot.modules.sys.entity.table.SysRoleTableDef.SYS_ROLE;
import java.util.List;
import org.springframework.stereotype.Service;
import com.mybatisflex.core.paginate.Page;
import com.mybatisflex.core.query.QueryWrapper;
import com.mybatisflex.spring.service.impl.ServiceImpl;
import com.yxboot.common.pagination.PageRequest;
import com.yxboot.modules.sys.entity.SysRole;
import com.yxboot.modules.sys.mapper.SysRoleMapper;
import cn.hutool.core.util.StrUtil;


/**
 * 角色表业务实现类
 *
 * @author Boya
 */
@Service
public class SysRoleService extends ServiceImpl<SysRoleMapper, SysRole> {
    public Page<SysRole> pageQuery(String name, String status, PageRequest pageRequest) {
        QueryWrapper wrapper = QueryWrapper.create();
        if (StrUtil.isNotEmpty(name)) {
            wrapper.where(SYS_ROLE.NAME.like(name));
        }
        if (StrUtil.isNotEmpty(status)) {
            wrapper.where(SYS_ROLE.STATUS.eq(status));
        }
        return page(pageRequest.convertToPage(), wrapper);
    }

    public List<SysRole> query(String name, String status) {
        QueryWrapper wrapper = QueryWrapper.create();
        if (StrUtil.isNotEmpty(name)) {
            wrapper.where(SYS_ROLE.NAME.like(name));
        }
        if (StrUtil.isNotEmpty(status)) {
            wrapper.where(SYS_ROLE.STATUS.eq(status));
        }
        return list(wrapper);
    }
}
