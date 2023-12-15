package com.yxboot.modules.dev.service;

import com.baomidou.mybatisplus.core.conditions.query.QueryWrapper;
import com.baomidou.mybatisplus.extension.service.impl.ServiceImpl;
import com.yxboot.modules.dev.entity.DevGeneratorTemplate;
import com.yxboot.modules.dev.mapper.DevGeneratorTemplateMapper;
import org.springframework.stereotype.Service;

import java.util.List;

/**
 * 代码生成内容 业务实现类
 *
 * @author Boya
 */
@Service
public class DevGeneratorTemplateService extends ServiceImpl<DevGeneratorTemplateMapper, DevGeneratorTemplate> {
    public List<DevGeneratorTemplate> queryByType(Integer type) {
        QueryWrapper<DevGeneratorTemplate> wrapper = new QueryWrapper<>();
        wrapper.eq(type != null, "type", type);
        return list(wrapper);
    }
}