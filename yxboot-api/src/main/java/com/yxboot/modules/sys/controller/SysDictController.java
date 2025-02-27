package com.yxboot.modules.sys.controller;

import cn.hutool.core.util.StrUtil;
import com.baomidou.mybatisplus.core.metadata.IPage;
import com.yxboot.common.api.Result;
import com.yxboot.common.aspect.SysLogOperation;
import com.yxboot.common.pagination.PageRequest;
import com.yxboot.modules.sys.entity.SysDict;
import com.yxboot.modules.sys.service.SysDictService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

/**
 * 字典表 Api
 *
 * @author Boya
 */
@RestController
@RequestMapping("/sys/dict")
@RequiredArgsConstructor
@Tag(name = "【系统模块】字典表 Api")
public class SysDictController {
    private final SysDictService sysDictService;

    @GetMapping("/list")
    @Operation(summary = "查询列表接口")
    public Result list(String dictName, String dictCode, Integer status, PageRequest pageRequest) {
        IPage<SysDict> pageResult = sysDictService.pageQuery(dictName, dictCode, status, pageRequest);
        return Result.success("查询成功！", pageResult);
    }

    @GetMapping("/get")
    @Operation(summary = "查询详情接口")
    public Result get(@RequestParam Long dictId) {
        SysDict sysDict = sysDictService.getById(dictId);
        return Result.success("查询成功！", sysDict);
    }

    @PostMapping("/save")
    @SysLogOperation(value = "保存字典信息")
    @Operation(summary = "保存信息接口")
    public Result save(@RequestBody SysDict sysDict) {
        if (StrUtil.isEmpty(sysDict.getDictCode())) {
            return Result.error("字典编码不能为空");
        }
        SysDict dict = sysDictService.selectByDictCode(sysDict.getDictCode());
        if (dict != null) {
            return Result.error("此字典编码已存在，请修改后再试");
        }
        sysDictService.saveOrUpdate(sysDict);
        return Result.success("保存成功！", sysDict);
    }

    @DeleteMapping("/remove")
    @SysLogOperation(value = "删除字典信息")
    @Operation(summary = "删除信息接口")
    public Result remove(Long dictId) {
        sysDictService.removeById(dictId);
        return Result.success("删除成功！");
    }
}
