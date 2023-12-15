package com.yxboot.modules.sys.service;

import cn.hutool.core.util.StrUtil;
import com.baomidou.mybatisplus.core.conditions.query.QueryWrapper;
import com.baomidou.mybatisplus.core.metadata.IPage;
import com.baomidou.mybatisplus.extension.service.impl.ServiceImpl;
import com.yxboot.common.pagination.PageRequest;
import com.yxboot.modules.sys.entity.SysDictData;
import com.yxboot.modules.sys.mapper.SysDictDataMapper;
import org.springframework.stereotype.Service;

import java.util.List;

/**
 * 字典数据表业务实现类
 *
 * @author Boya
 */
@Service
public class SysDictDataService extends ServiceImpl<SysDictDataMapper, SysDictData> {
    public IPage<SysDictData> query(String dictCode, Integer status, PageRequest pageRequest) {
        QueryWrapper<SysDictData> wrapper = new QueryWrapper<>();
        wrapper.eq(StrUtil.isNotEmpty(dictCode), "dict_code", dictCode);
        wrapper.eq(status != null, "status", status);
        wrapper.orderByAsc("sort");
        return page(pageRequest.convertToPage(), wrapper);
    }

    public List<SysDictData> query(String dictCode, Integer status){
        QueryWrapper<SysDictData> wrapper = new QueryWrapper<>();
        wrapper.eq(StrUtil.isNotEmpty(dictCode), "dict_code", dictCode);
        wrapper.eq(status != null, "status", status);
        wrapper.orderByAsc("sort");
        return list(wrapper);
    }

    public SysDictData selectByValue(String value) {
        if (!StrUtil.contains(value, '@')) {
            return null;
        }
        String dictCode = StrUtil.splitToArray(value, '@')[0];
        String dictValue = StrUtil.splitToArray(value, '@')[1];
        QueryWrapper<SysDictData> wrapper = new QueryWrapper<>();
        wrapper.eq( "dict_code", dictCode);
        wrapper.eq("value", dictValue);
        return getOne(wrapper, false);
    }
}
