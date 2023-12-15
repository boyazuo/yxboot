package com.yxboot.modules.sys.controller;

import com.baomidou.mybatisplus.core.metadata.IPage;
import com.yxboot.common.api.Result;
import com.yxboot.common.aspect.SysLogOperation;
import com.yxboot.common.pagination.PageRequest;
import com.yxboot.modules.sys.entity.SysLog;
import com.yxboot.modules.sys.service.SysLogService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

/**
 * 日志表 Api
 *
 * @author Boya
 */
@RestController
@RequestMapping("/sys/log")
@RequiredArgsConstructor
@Tag(name = "日志表 Api")
public class SysLogController {
    private final SysLogService sysLogService;

    @GetMapping("/list")
    @Operation(summary = "日志表 查询列表接口")
    public Result list(Integer type, PageRequest pageRequest) {
        IPage<SysLog> pageResult = sysLogService.pageQuery(type, pageRequest);
        return Result.success("查询成功！", pageResult);
    }

    @GetMapping("/get")
    @Operation(summary = "查询详情接口33")
    public Result get(@RequestParam Long id) {
        SysLog sysLog = sysLogService.getById(id);
        return Result.success("查询成功！", sysLog);
    }

    @PostMapping("/save")
    @SysLogOperation(value = "保存日志信息")
    @Operation(summary = "保存信息接口")
    public Result save(@RequestBody SysLog sysLog) {
        sysLogService.saveOrUpdate(sysLog);
        return Result.success("保存成功！", sysLog);
    }

    @PostMapping("/remove")
    @SysLogOperation(value = "删除日志信息")
    @Operation(summary = "删除信息接口")
    public Result remove(Long id) {
        sysLogService.removeById(id);
        return Result.success("删除成功！");
    }
}