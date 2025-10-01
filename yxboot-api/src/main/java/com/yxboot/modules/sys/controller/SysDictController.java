package com.yxboot.modules.sys.controller;

import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import com.mybatisflex.core.paginate.Page;
import com.yxboot.common.api.Result;
import com.yxboot.common.aspect.SysLogOperation;
import com.yxboot.common.pagination.PageRequest;
import com.yxboot.modules.sys.entity.SysDict;
import com.yxboot.modules.sys.service.SysDictService;
import cn.hutool.core.util.StrUtil;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import lombok.RequiredArgsConstructor;

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
    public Result<Page<SysDict>> list(String dictName, String dictCode, String status, PageRequest pageRequest) {
        Page<SysDict> pageResult = sysDictService.pageQuery(dictName, dictCode, status, pageRequest);
        return Result.success("查询成功！", pageResult);
    }

    @GetMapping("/get")
    @Operation(summary = "查询详情接口")
    public Result<SysDict> get(@RequestParam Long dictId) {
        SysDict sysDict = sysDictService.getById(dictId);
        return Result.success("查询成功！", sysDict);
    }

    @PostMapping("/save")
    @SysLogOperation(value = "保存字典信息")
    @Operation(summary = "保存信息接口")
    public Result<SysDict> save(@RequestBody SysDict sysDict) {
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
    public Result<Void> remove(Long dictId) {
        sysDictService.removeById(dictId);
        return Result.success("删除成功！");
    }
}
