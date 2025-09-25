package com.yxboot.modules.sys.service;

import static com.yxboot.modules.sys.entity.table.SysDictTableDef.SYS_DICT;
import org.springframework.stereotype.Service;
import com.mybatisflex.core.paginate.Page;
import com.mybatisflex.core.query.QueryWrapper;
import com.mybatisflex.spring.service.impl.ServiceImpl;
import com.yxboot.common.pagination.PageRequest;
import com.yxboot.modules.sys.entity.SysDict;
import com.yxboot.modules.sys.mapper.SysDictMapper;
import cn.hutool.core.util.StrUtil;


/**
 * 字典表业务实现类
 *
 * @author Boya
 */
@Service
public class SysDictService extends ServiceImpl<SysDictMapper, SysDict> {
    public Page<SysDict> pageQuery(String dictName, String dictCode, Integer status, PageRequest pageRequest) {
        QueryWrapper wrapper = QueryWrapper.create();
        if (StrUtil.isNotEmpty(dictName)) {
            wrapper.where(SYS_DICT.DICT_NAME.like(dictName));
        }
        if (StrUtil.isNotEmpty(dictCode)) {
            wrapper.where(SYS_DICT.DICT_CODE.like(dictCode));
        }
        if (status != null) {
            wrapper.where(SYS_DICT.STATUS.eq(status));
        }
        return page(pageRequest.convertToPage(), wrapper);
    }

    public SysDict selectByDictCode(String dictCode) {
        QueryWrapper wrapper = QueryWrapper.create();
        if (StrUtil.isNotEmpty(dictCode)) {
            wrapper.where(SYS_DICT.DICT_CODE.eq(dictCode));
        }
        return getOne(wrapper);
    }
}
