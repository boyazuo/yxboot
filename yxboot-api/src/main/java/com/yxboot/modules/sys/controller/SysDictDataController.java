package com.yxboot.modules.sys.controller;

import com.baomidou.mybatisplus.core.metadata.IPage;
import com.yxboot.common.api.Result;
import com.yxboot.common.aspect.SysLogOperation;
import com.yxboot.common.pagination.PageRequest;
import com.yxboot.modules.sys.entity.SysDictData;
import com.yxboot.modules.sys.service.SysDictDataService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

import java.util.List;


/**
 * 字典表 Api
 *
 * @author Boya
 */
@RestController
@RequestMapping("/sys/dict/data")
@RequiredArgsConstructor
@Tag(name = "【系统模块】字典数据表 Api")
public class SysDictDataController {
    private final SysDictDataService sysDictDataService;

    @GetMapping("/all")
    @Operation(summary = "查询全部")
    public Result All(String dictCode, Integer status) {
        List<SysDictData> listResult = sysDictDataService.query(dictCode, status);
        return Result.success("查询成功！", listResult);
    }

    @GetMapping("/list")
    @Operation(summary = "查询列表接口")
    public Result list(String dictCode, Integer status, PageRequest pageRequest) {
        IPage<SysDictData> pageResult = sysDictDataService.query(dictCode, status, pageRequest);
        return Result.success("查询成功！", pageResult);
    }

    @GetMapping("/get")
    @Operation(summary = "查询详情接口")
    public Result get(@RequestParam Long dictId) {
        SysDictData sysDictData = sysDictDataService.getById(dictId);
        return Result.success("查询成功！", sysDictData);
    }

    @PostMapping("/save")
    @SysLogOperation(value = "保存字典数据")
    @Operation(summary = "保存信息接口")
    public Result save(@RequestBody SysDictData sysDictData) {
        sysDictDataService.saveOrUpdate(sysDictData);
        return Result.success("保存成功！", sysDictData);
    }

    @DeleteMapping("/remove")
    @SysLogOperation(value = "删除字典数据")
    @Operation(summary = "删除信息接口")
    public Result remove(Long id) {
        sysDictDataService.removeById(id);
        return Result.success("删除成功！");
    }
}
