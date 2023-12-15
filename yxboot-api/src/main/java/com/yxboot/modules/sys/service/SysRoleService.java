package com.yxboot.modules.sys.service;

import cn.hutool.core.util.StrUtil;
import com.baomidou.mybatisplus.core.conditions.query.QueryWrapper;
import com.baomidou.mybatisplus.core.metadata.IPage;
import com.baomidou.mybatisplus.extension.service.impl.ServiceImpl;
import com.yxboot.common.pagination.PageRequest;
import com.yxboot.modules.sys.entity.SysRole;
import com.yxboot.modules.sys.mapper.SysRoleMapper;
import org.springframework.stereotype.Service;

import java.util.List;


/**
 * 角色表业务实现类
 *
 * @author Boya
 */
@Service
public class SysRoleService extends ServiceImpl<SysRoleMapper, SysRole> {
    public IPage<SysRole> pageQuery(String name, Integer status, PageRequest pageRequest) {
        QueryWrapper<SysRole> wrapper = new QueryWrapper<>();
        wrapper.like(StrUtil.isNotEmpty(name), "name", name);
        wrapper.eq(status != null, "status", status);
        return page(pageRequest.convertToPage(), wrapper);
    }

    public List<SysRole> query(String name, Integer status) {
        QueryWrapper<SysRole> wrapper = new QueryWrapper<>();
        wrapper.like(StrUtil.isNotEmpty(name), "name", name);
        wrapper.eq(status != null, "status", status);
        return list(wrapper);
    }
}
