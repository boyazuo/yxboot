package com.yxboot.config.upload;

import com.yxboot.config.upload.uploader.LocalUploader;
import com.yxboot.config.upload.uploader.OssUploader;
import com.yxboot.config.upload.uploader.Uploader;
import lombok.RequiredArgsConstructor;
import org.springframework.boot.autoconfigure.condition.ConditionalOnMissingBean;
import org.springframework.boot.autoconfigure.condition.ConditionalOnProperty;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

/**
 * 文件上传配置类
 *
 * @author  Boya
 */
@Configuration
@RequiredArgsConstructor
public class UploadConfig {
    private final UploadProperties properties;

    @Bean("uploader")
    @ConditionalOnMissingBean(Uploader.class)
    public Uploader uploader() {
        switch (properties.getModel()) {
            case "local":
                return new LocalUploader(properties.getLocal());
            case "oss":
                return new OssUploader(properties.getOss());
            default:
                return null;
        }
    }

    @Bean("localUploader")
    @ConditionalOnProperty(name = "yxboot.upload.local.enable", havingValue = "true")
    public LocalUploader localUploader(){
        return new LocalUploader(properties.getLocal());
    }

    @Bean("ossUploader")
    @ConditionalOnProperty(name = "yxboot.upload.oss.enable", havingValue = "true")
    public OssUploader ossUploader(){
        return new OssUploader(properties.getOss());
    }
}
