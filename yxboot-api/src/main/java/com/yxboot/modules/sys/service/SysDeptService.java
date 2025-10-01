package com.yxboot.modules.sys.service;

import static com.yxboot.modules.sys.entity.table.SysDeptTableDef.SYS_DEPT;
import java.util.List;
import org.springframework.stereotype.Service;
import com.mybatisflex.core.paginate.Page;
import com.mybatisflex.core.query.QueryWrapper;
import com.mybatisflex.spring.service.impl.ServiceImpl;
import com.yxboot.common.pagination.PageRequest;
import com.yxboot.modules.sys.entity.SysDept;
import com.yxboot.modules.sys.mapper.SysDeptMapper;
import cn.hutool.core.util.StrUtil;

/**
 * 部门表业务实现类
 *
 * @author Boya
 */
@Service
public class SysDeptService extends ServiceImpl<SysDeptMapper, SysDept> {
    public Page<SysDept> pageQuery(String name, String status, PageRequest pageRequest) {
        QueryWrapper wrapper = QueryWrapper.create();
        if (StrUtil.isNotEmpty(name)) {
            wrapper.where(SYS_DEPT.NAME.like(name));
        }
        if (StrUtil.isNotEmpty(status)) {
            wrapper.where(SYS_DEPT.STATUS.eq(status));
        }
        return page(pageRequest.convertToPage(), wrapper);
    }

    public List<SysDept> listQuery(String name, String status) {
        QueryWrapper wrapper = QueryWrapper.create();
        if (StrUtil.isNotEmpty(name)) {
            wrapper.where(SYS_DEPT.NAME.like(name));
        }
        if (StrUtil.isNotEmpty(status)) {
            wrapper.where(SYS_DEPT.STATUS.eq(status));
        }
        return list(wrapper);
    }

    public List<SysDept> queryByParentId(Long deptId) {
        QueryWrapper wrapper = QueryWrapper.create();
        wrapper.where(SYS_DEPT.PARENT_ID.eq(deptId));
        return list(wrapper);
    }
}
