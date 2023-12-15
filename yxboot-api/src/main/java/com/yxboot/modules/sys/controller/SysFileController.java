package com.yxboot.modules.sys.controller;

import com.baomidou.mybatisplus.core.conditions.query.QueryWrapper;
import com.baomidou.mybatisplus.core.metadata.IPage;
import com.baomidou.mybatisplus.core.toolkit.Wrappers;
import com.yxboot.common.api.Result;
import com.yxboot.common.aspect.SysLogOperation;
import com.yxboot.common.pagination.PageRequest;
import com.yxboot.config.upload.FileEntity;
import com.yxboot.config.upload.uploader.Uploader;
import com.yxboot.modules.sys.entity.SysFile;
import com.yxboot.modules.sys.service.SysFileService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;


/**
 * 附件表 Api
 *
 * @author Boya
 */
@RestController
@RequestMapping("/sys/file")
@RequiredArgsConstructor
@Tag(name = "【系统模块】附件表 Api")
public class SysFileController {
    private final SysFileService sysFileService;
    private final Uploader uploader;

    @GetMapping("/list")
    @Operation(summary = "查询列表接口")
    public Result list(PageRequest pageRequest) {
        IPage<SysFile> pageResult = sysFileService.page(pageRequest.convertToPage());
        return Result.success("查询成功！", pageResult);
    }

    @GetMapping("/get")
    @Operation(summary = "附件表查询详情接口")
    public Result get(@RequestParam Long attachmentId) {
        SysFile coreAttachment = sysFileService.getById(attachmentId);
        return Result.success("查询成功！", coreAttachment );
    }

    @GetMapping("/getByPath")
    @Operation(summary = "查询详情接口")
    public Result getByPath(@RequestParam String path) {
        QueryWrapper<SysFile> query = Wrappers.query();
        query.eq("file_name", path);
        SysFile coreAttachment = sysFileService.getOne(query, false);
        return Result.success("查询成功！", coreAttachment );
    }

    @PostMapping("/save")
    @SysLogOperation(value = "附件表保存信息")
    @Operation(summary = "保存信息接口")
    public Result save(@RequestBody SysFile coreAttachment) {
        sysFileService.saveOrUpdate(coreAttachment);
        return Result.success("保存成功！", coreAttachment);
    }


    @PostMapping("/upload")
    @SysLogOperation(value = "上传文件")
    @Operation(summary = "上传文件接口")
    public Result save(@RequestPart("file") MultipartFile file) {
        FileEntity fileEntity = uploader.upload(file);
        SysFile sysFile = new SysFile();
        sysFile.setOriginName(file.getOriginalFilename());
        sysFile.setFileName(fileEntity.getFileName());
        sysFile.setPath(fileEntity.getPath());
        sysFile.setUrl(fileEntity.getUrl());
        sysFile.setContentType(fileEntity.getContentType());
        sysFile.setSize(fileEntity.getSize());
        sysFile.setHash(fileEntity.getHash());
        sysFileService.saveOrUpdate(sysFile);
        return Result.success("保存成功！", fileEntity);
    }

    @DeleteMapping("/remove")
    @SysLogOperation(value = "删除附件信息")
    @Operation(summary = "删除信息接口")
    public Result remove(Long attachmentId) {
        sysFileService.removeById(attachmentId);
        return Result.success("删除成功！");
    }
}
