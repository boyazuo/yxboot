package com.yxboot.config.upload.uploader;

import com.yxboot.config.upload.FileEntity;
import org.springframework.web.multipart.MultipartFile;

/**
 * 文件上传接口
 */
public interface Uploader {

    /**
     * 上传文件
】     */
    FileEntity upload(MultipartFile file);

    FileEntity upload(MultipartFile file, String dir);

    /**
     * 删除文件
     */
    void delete(String path);

    /**
     * 重命名文件
     */
    void rename(String path, String fileName);
}
