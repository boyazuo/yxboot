package com.yxboot.modules.sys.service;

import static com.yxboot.modules.sys.entity.table.SysDictDataTableDef.SYS_DICT_DATA;
import java.util.List;
import org.springframework.stereotype.Service;
import com.mybatisflex.core.paginate.Page;
import com.mybatisflex.core.query.QueryWrapper;
import com.mybatisflex.spring.service.impl.ServiceImpl;
import com.yxboot.common.pagination.PageRequest;
import com.yxboot.modules.sys.entity.SysDictData;
import com.yxboot.modules.sys.mapper.SysDictDataMapper;
import cn.hutool.core.util.StrUtil;

/**
 * 字典数据表业务实现类
 *
 * @author Boya
 */
@Service
public class SysDictDataService extends ServiceImpl<SysDictDataMapper, SysDictData> {
    public Page<SysDictData> query(String dictCode, Integer status, PageRequest pageRequest) {
        QueryWrapper wrapper = QueryWrapper.create();
        if (StrUtil.isNotEmpty(dictCode)) {
            wrapper.where(SYS_DICT_DATA.DICT_CODE.eq(dictCode));
        }
        if (status != null) {
            wrapper.where(SYS_DICT_DATA.STATUS.eq(status));
        }
        wrapper.orderBy(SYS_DICT_DATA.SORT, true);
        return page(pageRequest.convertToPage(), wrapper);
    }

    public List<SysDictData> query(String dictCode, Integer status) {
        QueryWrapper wrapper = QueryWrapper.create();
        if (StrUtil.isNotEmpty(dictCode)) {
            wrapper.where(SYS_DICT_DATA.DICT_CODE.eq(dictCode));
        }
        if (status != null) {
            wrapper.where(SYS_DICT_DATA.STATUS.eq(status));
        }
        wrapper.orderBy(SYS_DICT_DATA.SORT, true);
        return list(wrapper);
    }

    public SysDictData selectByValue(String value) {
        if (!StrUtil.contains(value, '@')) {
            return null;
        }
        String dictCode = StrUtil.splitToArray(value, '@')[0];
        String dictValue = StrUtil.splitToArray(value, '@')[1];
        QueryWrapper wrapper = QueryWrapper.create();
        wrapper.where(SYS_DICT_DATA.DICT_CODE.eq(dictCode));
        wrapper.where(SYS_DICT_DATA.VALUE.eq(dictValue));
        return getOne(wrapper);
    }
}
