package com.yxboot.modules.dev.service;

import cn.hutool.core.io.IoUtil;
import com.yxboot.modules.dev.entity.DevGeneratorTemplate;
import com.yxboot.modules.dev.mapper.GeneratorMapper;
import com.yxboot.modules.dev.vo.GeneratorConfig;
import com.yxboot.utils.FreemarkerGenutils;
import freemarker.template.TemplateException;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.io.ByteArrayOutputStream;
import java.io.IOException;
import java.util.List;
import java.util.Map;
import java.util.zip.ZipOutputStream;


@Service
@RequiredArgsConstructor
public class GeneratorService {
    private final GeneratorMapper generatorMapper;

    public List<Map<String, Object>> list() {
        return generatorMapper.list();
    }

    public byte[] freemarkerGeneratorCode(List<DevGeneratorTemplate> list, GeneratorConfig generatorConfig) throws TemplateException, IOException {
        ByteArrayOutputStream outputStream = new ByteArrayOutputStream();
        ZipOutputStream zip = new ZipOutputStream(outputStream);
        for (String tableName : generatorConfig.getTables()) {
            //查询表信息
            Map<String, String> table = generatorMapper.get(tableName);
            //查询列信息
            List<Map<String, String>> columns = generatorMapper.listColumns(tableName);
            //生成代码
            FreemarkerGenutils.generatorCode(table, columns, zip, generatorConfig, list);
        }
        IoUtil.close(zip);
        return outputStream.toByteArray();
    }

    public List<Map<String, Object>> freemarkerPreview(List<DevGeneratorTemplate> list, GeneratorConfig generatorConfig) throws TemplateException, IOException {
        Map<String, String> table = generatorMapper.get(generatorConfig.getTables()[0]);
        //查询列信息
        List<Map<String, String>> columns = generatorMapper.listColumns(generatorConfig.getTables()[0]);
        //生成代码
        return FreemarkerGenutils.generatorPreview(table, columns, generatorConfig, list);
    }
}
