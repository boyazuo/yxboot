package com.yxboot.config.upload;

import lombok.Data;

/**
 * 文件上传实体类
 * 
 * @author Boya
 */
@Data
public class FileEntity {
    private String originName;
    private String fileName;
    private Long size;
    private String path;
    private String url;
    private String hash;
    private String contentType;
}
