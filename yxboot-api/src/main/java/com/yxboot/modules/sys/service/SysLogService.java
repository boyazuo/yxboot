package com.yxboot.modules.sys.service;

import com.baomidou.mybatisplus.core.conditions.query.QueryWrapper;
import com.baomidou.mybatisplus.core.metadata.IPage;
import com.baomidou.mybatisplus.extension.service.impl.ServiceImpl;
import org.springframework.stereotype.Service;
import com.yxboot.modules.sys.mapper.SysLogMapper;
import com.yxboot.modules.sys.entity.SysLog;
import com.yxboot.common.pagination.PageRequest;

/**
 * 日志表 业务实现类
 *
 * @author ceshi
 * @date 2023-01-13
 * @Email 1111@qq.com
 */
@Service
public class SysLogService extends ServiceImpl<SysLogMapper, SysLog> {
    public IPage<SysLog> pageQuery(Integer type, PageRequest pageRequest) {
        QueryWrapper<SysLog> wrapper = new QueryWrapper<>();
        wrapper.eq(type != null, "type", type);
        wrapper.orderByDesc("create_time");
        return page(pageRequest.convertToPage(), wrapper);
    }
}
