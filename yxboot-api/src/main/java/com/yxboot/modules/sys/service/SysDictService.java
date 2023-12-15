package com.yxboot.modules.sys.service;

import cn.hutool.core.util.StrUtil;
import com.baomidou.mybatisplus.core.conditions.query.QueryWrapper;
import com.baomidou.mybatisplus.core.metadata.IPage;
import com.baomidou.mybatisplus.extension.service.impl.ServiceImpl;
import com.yxboot.common.pagination.PageRequest;
import com.yxboot.modules.sys.entity.SysDict;
import com.yxboot.modules.sys.mapper.SysDictMapper;
import org.springframework.stereotype.Service;


/**
 * 字典表业务实现类
 *
 * @author Boya
 */
@Service
public class SysDictService extends ServiceImpl<SysDictMapper, SysDict>{
    public IPage<SysDict> pageQuery(String dictName, String dictCode, Integer status, PageRequest pageRequest) {
        QueryWrapper<SysDict> wrapper = new QueryWrapper<>();
        wrapper.like(StrUtil.isNotEmpty(dictName), "dict_name", dictName);
        wrapper.like(StrUtil.isNotEmpty(dictCode), "dict_code", dictCode);
        wrapper.eq(status != null, "status", status);
        return page(pageRequest.convertToPage(), wrapper);
    }

    public SysDict selectByDictCode(String dictCode) {
        QueryWrapper<SysDict> wrapper = new QueryWrapper<>();
        wrapper.lambda().eq(StrUtil.isNotEmpty(dictCode), SysDict::getDictCode, dictCode);
        return getOne(wrapper);
    }
}
