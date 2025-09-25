package com.yxboot.modules.sys.service;

import static com.yxboot.modules.sys.entity.table.SysLogTableDef.SYS_LOG;
import org.springframework.stereotype.Service;
import com.mybatisflex.core.paginate.Page;
import com.mybatisflex.core.query.QueryWrapper;
import com.mybatisflex.spring.service.impl.ServiceImpl;
import com.yxboot.common.pagination.PageRequest;
import com.yxboot.modules.sys.entity.SysLog;
import com.yxboot.modules.sys.mapper.SysLogMapper;

/**
 * 日志表 业务实现类
 *
 * @author ceshi
 * @date 2023-01-13
 * @Email 1111@qq.com
 */
@Service
public class SysLogService extends ServiceImpl<SysLogMapper, SysLog> {
    public Page<SysLog> pageQuery(Integer type, PageRequest pageRequest) {
        QueryWrapper wrapper = QueryWrapper.create();
        if (type != null) {
            wrapper.where(SYS_LOG.TYPE.eq(type));
        }
        wrapper.orderBy(SYS_LOG.CREATE_TIME, false);
        return page(pageRequest.convertToPage(), wrapper);
    }
}
