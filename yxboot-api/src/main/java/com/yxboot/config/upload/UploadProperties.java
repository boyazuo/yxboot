package com.yxboot.config.upload;

import lombok.Data;
import org.springframework.boot.context.properties.ConfigurationProperties;
import org.springframework.stereotype.Component;

import java.util.Map;


@Data
@Component
@ConfigurationProperties(prefix = "yxboot.upload")
public class UploadProperties {
    /**
     * 上传类型
     * local 本地
     * oss 阿里云
     * cos 腾讯云
     */
    private String model;

    /**
     * 本地配置
     */
    private LocalConfig local;

    /**
     * oss配置
     */
    private OssConfig oss;

    /**
     * 腾讯云配置
     */
    private CosConfig cos;

    @Data
    public static class LocalConfig {
        private boolean enable;
        private String pathPrefix;
        private String urlPrefix;
        private boolean rewriteFileName;
    }

    @Data
    public static class OssConfig {
        private boolean enable;
        private String endpoint;

        /**
         * Access key就像用户ID，可以唯一标识你的账户
         */
        private String accessKey;

        /**
         * Secret key是你账户的密码
         */
        private String secretKey;

        /**
         * 默认的存储桶名称
         */
        private String bucketName = "yunxing";

        private boolean rewriteFileName;
    }

    @Data
    public static class CosConfig{
        private String region;
        private String secretId;
        private String secretKey;
        private Map<String,String> bucketName;
        private String publicUrl;
    }
}