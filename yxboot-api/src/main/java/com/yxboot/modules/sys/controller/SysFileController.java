package com.yxboot.modules.sys.controller;

import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RequestPart;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;
import com.mybatisflex.core.paginate.Page;
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
    public Result<Page<SysFile>> list(PageRequest pageRequest) {
        Page<SysFile> pageResult = sysFileService.page(pageRequest.convertToPage());
        return Result.success("查询成功！", pageResult);
    }

    @GetMapping("/get")
    @Operation(summary = "附件表查询详情接口")
    public Result<SysFile> get(@RequestParam Long fileId) {
        SysFile sysFile = sysFileService.getById(fileId);
        return Result.success("查询成功！", sysFile);
    }

    @GetMapping("/getByPath")
    @Operation(summary = "查询详情接口")
    public Result<SysFile> getByPath(@RequestParam String path) {
        SysFile sysFile = sysFileService.selectByFileName(path);
        return Result.success("查询成功！", sysFile);
    }

    @PostMapping("/save")
    @SysLogOperation(value = "附件表保存信息")
    @Operation(summary = "保存信息接口")
    public Result<SysFile> save(@RequestBody SysFile sysFile) {
        sysFileService.saveOrUpdate(sysFile);
        return Result.success("保存成功！", sysFile);
    }


    @PostMapping("/upload")
    @SysLogOperation(value = "上传文件")
    @Operation(summary = "上传文件接口")
    public Result<FileEntity> save(@RequestPart("file") MultipartFile file) {
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
    public Result<Void> remove(Long fileId) {
        sysFileService.removeById(fileId);
        return Result.success("删除成功！");
    }
}
