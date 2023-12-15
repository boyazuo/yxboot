package com.yxboot.modules.sys.service;

import cn.hutool.core.util.StrUtil;
import com.baomidou.mybatisplus.core.conditions.query.QueryWrapper;
import com.baomidou.mybatisplus.core.metadata.IPage;
import com.baomidou.mybatisplus.extension.service.impl.ServiceImpl;
import com.yxboot.common.pagination.PageRequest;
import com.yxboot.modules.sys.entity.SysDept;
import com.yxboot.modules.sys.entity.SysRole;
import com.yxboot.modules.sys.mapper.SysDeptMapper;
import org.springframework.stereotype.Service;

import java.util.List;

/**
 * 部门表业务实现类
 *
 * @author Boya
 */
@Service
public class SysDeptService extends ServiceImpl<SysDeptMapper, SysDept>{
    public IPage<SysDept> pageQuery(String name, Integer status, PageRequest pageRequest) {
        QueryWrapper<SysDept> wrapper = new QueryWrapper<>();
        wrapper.like(StrUtil.isNotEmpty(name), "name", name);
        wrapper.eq(status != null, "status", status);
        return page(pageRequest.convertToPage(), wrapper);
    }
    public List<SysDept> listQuery(String name, Integer status) {
        QueryWrapper<SysDept> wrapper = new QueryWrapper<>();
        wrapper.like(StrUtil.isNotEmpty(name), "name", name);
        wrapper.eq(status != null, "status", status);
        return list(wrapper);
    }

    public List<SysDept> queryByParentId(Long deptId) {
        QueryWrapper<SysDept> wrapper = new QueryWrapper<>();
        wrapper.eq("parent_id",deptId);
        return list(wrapper);
    }
}
