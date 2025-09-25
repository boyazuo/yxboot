package com.yxboot.modules.sys.controller;

import java.util.Collection;
import java.util.List;
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
import com.yxboot.modules.sys.entity.SysDept;
import com.yxboot.modules.sys.service.SysDeptService;
import com.yxboot.utils.TreeUtil;
import cn.hutool.core.collection.CollUtil;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import lombok.RequiredArgsConstructor;

/**
 * 部门表 Api
 *
 * @author Boya
 */
@RestController
@RequestMapping("/sys/dept")
@RequiredArgsConstructor
@SuppressWarnings("rawtypes")
@Tag(name = "【系统模块】部门表 Api")
public class SysDeptController {
    private final SysDeptService sysDeptService;

    @GetMapping("/list")
    @Operation(summary = "查询列表接口")
    public Result<Page<SysDept>> list(String name, Integer status, PageRequest pageRequest) {
        Page<SysDept> pageResult = sysDeptService.pageQuery(name, status, pageRequest);
        return Result.success("查询成功！", pageResult);
    }

    @GetMapping("/all")
    @Operation(summary = "查询列表（不分页）")
    public Result<List<SysDept>> listAll(String name, Integer status) {
        List<SysDept> list = sysDeptService.listQuery(name, status);
        return Result.success("查询成功！", list);
    }

    @GetMapping("/get")
    @Operation(summary = "查询详情接口")
    public Result<SysDept> get(@RequestParam Long deptId) {
        SysDept sysDept = sysDeptService.getById(deptId);
        return Result.success("查询成功！", sysDept);
    }

    @PostMapping("/save")
    @SysLogOperation(value = "保存部门信息")
    @Operation(summary = "保存信息接口")
    public Result<SysDept> save(@RequestBody SysDept sysDept) {
        sysDeptService.saveOrUpdate(sysDept);
        return Result.success("保存成功！", sysDept);
    }

    @DeleteMapping("/remove")
    @SysLogOperation(value = "删除部门信息")
    @Operation(summary = "删除信息接口")
    public Result<Void> remove(Long deptId) {
        List<SysDept> sysDepts = sysDeptService.queryByParentId(deptId);
        if (CollUtil.isNotEmpty(sysDepts)) {
            return Result.error("删除失败！当前部门下有子级部门不可删除");
        }
        sysDeptService.removeById(deptId);
        return Result.success("删除成功！");
    }

    @GetMapping("/tree")
    @Operation(summary = "查询列表接口,返回树形结构")
    public Result<Collection<SysDept>> tree() {
        List<SysDept> list = sysDeptService.list();
        return Result.success("查询成功！", TreeUtil.deptTrees(list));
    }

}
