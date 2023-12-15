package com.yxboot.modules.dev.controller;


import com.yxboot.common.api.Result;
import com.yxboot.common.aspect.SysLogOperation;
import com.yxboot.modules.dev.entity.DevGeneratorTemplate;
import com.yxboot.modules.dev.service.DevGeneratorTemplateService;
import freemarker.cache.StringTemplateLoader;
import freemarker.template.Template;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

/**
 * 代码生成模板 Api
 *
 * @author Boya
 */
@RestController
@RequestMapping("/dev/generator/template")
@RequiredArgsConstructor
@Tag(name = "代码生成模板 Api")
public class DevGeneratorTemplateController {
    private final DevGeneratorTemplateService devGeneratorTemplateService;

    @GetMapping("/list")
    @Operation(summary = "查询列表接口")
    public Result list(Integer type) {
        List<DevGeneratorTemplate> list = devGeneratorTemplateService.queryByType(type);
        return Result.success("查询成功！", list);
    }

    @GetMapping("/get")
    @Operation(summary = "查询详情接口")
    public Result get(@RequestParam Long id) {
        DevGeneratorTemplate devGeneratorTemplate = devGeneratorTemplateService.getById(id);
        return Result.success("查询成功！", devGeneratorTemplate);
    }

    @PostMapping("/save")
    @SysLogOperation(value = "代码生成模板保存信息")
    @Operation(summary = "保存信息接口")
    public Result save(@RequestBody DevGeneratorTemplate devGeneratorTemplate) {
        devGeneratorTemplateService.saveOrUpdate(devGeneratorTemplate);
        return Result.success("保存成功！", devGeneratorTemplate);
    }

    @PostMapping("/remove")
    @SysLogOperation(value = "代码生成模板删除信息")
    @Operation(summary = "删除信息接口")
    public Result remove(Long id) {
        devGeneratorTemplateService.removeById(id);
        return Result.success("删除成功！");
    }

    @PostMapping("/check")
    @Operation(summary = "模板检查接口")
    public Result inspection(@RequestBody Map<String, Object> map) {
        String content = map.getOrDefault("content", null).toString();
        try {
            freemarker.template.Configuration configuration = new freemarker.template.Configuration(freemarker.template.Configuration.getVersion());
            StringTemplateLoader stringTemplateLoader = new StringTemplateLoader();
            stringTemplateLoader.putTemplate("template", content);
            configuration.setTemplateLoader(stringTemplateLoader);
            // 得到模板
            Template template = configuration.getTemplate("template", "utf-8");
        } catch (Exception e) {
            return Result.error("模板格式错误");
        }
        return Result.success("模板格式正确");
    }
}