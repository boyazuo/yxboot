package com.yxboot.modules.dev.controller;

import cn.hutool.core.io.IoUtil;
import cn.hutool.core.util.StrUtil;
import com.yxboot.common.api.Result;
import com.yxboot.common.aspect.SysLogOperation;
import com.yxboot.modules.dev.entity.DevGeneratorTemplate;
import com.yxboot.modules.dev.service.DevGeneratorTemplateService;
import com.yxboot.modules.dev.service.GeneratorService;
import com.yxboot.modules.dev.vo.GeneratorConfig;
import freemarker.template.TemplateException;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import jakarta.servlet.http.HttpServletResponse;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import java.io.IOException;
import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

@RestController
@RequestMapping("/dev/generator")
@RequiredArgsConstructor
@Tag(name = "【开发工具】代码生成 Api")
public class DevGeneratorController {
    private final GeneratorService generatorService;
    private final DevGeneratorTemplateService devGeneratorTemplateService;

    @GetMapping("/list")
    @Operation(summary = "查询全部数据表接口")
    public Result list(@RequestParam(value = "tableName", required = false) String tableName) {
        List<Map<String, Object>> list = generatorService.list();
        if (tableName != null) {
            list = list.stream().filter(stringObjectMap -> stringObjectMap.get("tableName").toString().contains(tableName)).collect(Collectors.toList());
        }
        return Result.success("查询成功！", list);
    }

    @GetMapping("/code")
    @SysLogOperation(value = "单表生成代码")
    @Operation(summary = "根据单表生成代码")
    public void codeV2(GeneratorConfig generatorConfig, HttpServletResponse response) throws IOException, TemplateException {
        Integer type = generatorConfig.getType();
        List<DevGeneratorTemplate> list = devGeneratorTemplateService.queryByType(type);
        byte[] data = generatorService.freemarkerGeneratorCode(list, generatorConfig);
        response.reset();
        response.setHeader("Content-Disposition", "attachment; filename=yxboot.zip");
        response.addHeader("Content-Length", StrUtil.toString(data.length));
        response.setContentType("application/octet-stream; charset=UTF-8");
        IoUtil.write(response.getOutputStream(), true, data);
    }

    @GetMapping("/batchCode")
    @SysLogOperation(value = "多表批量生成代码")
    @Operation(summary = "根据多表批量生成代码")
    public void batchCodeV2(GeneratorConfig generatorConfig, HttpServletResponse response) throws IOException, TemplateException {
        Integer type = generatorConfig.getType();
        List<DevGeneratorTemplate> list = devGeneratorTemplateService.queryByType(type);
        byte[] data = generatorService.freemarkerGeneratorCode(list, generatorConfig);
        response.reset();
        response.setHeader("Content-Disposition", "attachment; filename=yxboot.zip");
        response.addHeader("Content-Length", StrUtil.toString(data.length));
        response.setContentType("application/octet-stream; charset=UTF-8");
        IoUtil.write(response.getOutputStream(), true, data);
    }

    @SysLogOperation(value = "模板预览")
    @GetMapping("/preview")
    @Operation(summary = "模板预览")
    public Result preview(GeneratorConfig generatorConfig) throws TemplateException, IOException {
        generatorConfig.setAuthor("YXBoot");
        generatorConfig.setPkg("com.yxboot.modules");
        generatorConfig.setEmail("email@yxboot.com");
        Integer type = generatorConfig.getType();
        List<DevGeneratorTemplate> list = devGeneratorTemplateService.queryByType(type);
        List<Map<String, Object>> mapList = generatorService.freemarkerPreview(list, generatorConfig);
        return Result.success("预览成功", mapList);
    }
}