package com.yxboot.modules.sys.service;

import static com.yxboot.modules.sys.entity.table.SysFileTableDef.SYS_FILE;
import org.springframework.stereotype.Service;
import com.mybatisflex.core.query.QueryWrapper;
import com.mybatisflex.spring.service.impl.ServiceImpl;
import com.yxboot.modules.sys.entity.SysFile;
import com.yxboot.modules.sys.mapper.SysFileMapper;


/**
 * 附件表业务实现类
 *
 * @author Boya
 */
@Service
public class SysFileService extends ServiceImpl<SysFileMapper, SysFile> {

  public SysFile selectByFileName(String fileName) {
    QueryWrapper query = QueryWrapper.create();
    query.where(SYS_FILE.FILE_NAME.eq(fileName));
    return getOne(query);
  }
}
