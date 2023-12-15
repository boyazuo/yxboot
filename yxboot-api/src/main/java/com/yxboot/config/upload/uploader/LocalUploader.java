package com.yxboot.config.upload.uploader;

import cn.hutool.core.date.DateUtil;
import cn.hutool.core.exceptions.ExceptionUtil;
import cn.hutool.core.io.FileUtil;
import cn.hutool.core.util.IdUtil;
import cn.hutool.core.util.StrUtil;
import cn.hutool.crypto.SecureUtil;
import com.yxboot.config.upload.FileEntity;
import com.yxboot.config.upload.UploadProperties;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.web.multipart.MultipartFile;

import java.io.File;
import java.io.IOException;

/**
 * 本地上传
 *
 * @author Boya
 */
@Slf4j
@RequiredArgsConstructor
public class LocalUploader implements Uploader {
    private final UploadProperties.LocalConfig properties;

    @Override
    public FileEntity upload(MultipartFile file) {
        return upload(file, null);
    }

    @Override
    public FileEntity upload(MultipartFile file, String dir) {
        try {
            String originName = file.getOriginalFilename();
            String fileName = getFileName(originName);
            String path = getPath(dir, fileName);
            File destFile = FileUtil.file(properties.getPathPrefix() + path);

            FileEntity entity = new FileEntity();
            entity.setOriginName(originName);
            entity.setFileName(fileName);
            entity.setSize(file.getSize());
            entity.setPath(getPath(dir, fileName));
            entity.setUrl(getUrl(dir, fileName));
            entity.setHash(SecureUtil.md5(file.getInputStream()));
            entity.setContentType(FileUtil.getMimeType(originName));

            FileUtil.mkdir(destFile.getParent());
            file.transferTo(destFile);

            return entity;
        } catch (IOException e) {
            log.error(e.getMessage(), e);
            ExceptionUtil.wrapRuntimeAndThrow(e.getMessage());
        }
        return null;
    }

    @Override
    public void delete(String path) {
        FileUtil.del(properties.getPathPrefix() + path);
    }

    @Override
    public void rename(String path, String fileName) {
        File destFile = FileUtil.file(properties.getPathPrefix() + path);
        FileUtil.rename(destFile, fileName, true);
    }

    private String getPath(String dir, String fileName) {
        String currentDate = DateUtil.date().toString("yyyyMMdd");
        if (StrUtil.isNotEmpty(dir)) {
            return StrUtil.format("{}/{}/{}", dir, currentDate, fileName);
        }
        return StrUtil.format("{}/{}", currentDate, fileName);
    }

    private String getUrl(String dir, String fileName) {
        return properties.getUrlPrefix() + getPath(dir, fileName);
    }

    public String getFileName(String originName) {
        if (properties.isRewriteFileName()) {
            String ext = FileUtil.extName(originName);
            return StrUtil.format("{}.{}", IdUtil.fastSimpleUUID(), ext);
        }
        return originName;
    }
}
