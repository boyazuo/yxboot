package com.yxboot.config.upload.uploader;

import cn.hutool.core.date.DateUtil;
import cn.hutool.core.exceptions.ExceptionUtil;
import cn.hutool.core.io.FileUtil;
import cn.hutool.core.util.IdUtil;
import cn.hutool.core.util.StrUtil;
import cn.hutool.crypto.SecureUtil;
import com.aliyun.oss.ClientConfiguration;
import com.aliyun.oss.OSSClient;
import com.aliyun.oss.common.auth.CredentialsProvider;
import com.aliyun.oss.common.auth.DefaultCredentialProvider;
import com.yxboot.config.upload.FileEntity;
import com.yxboot.config.upload.UploadProperties;
import lombok.extern.slf4j.Slf4j;
import org.springframework.web.multipart.MultipartFile;

/**
 * 阿里云OSS上传
 *
 * @author Boya
 */
@Slf4j
public class OssUploader implements Uploader {
    private UploadProperties.OssConfig properties;
    private OSSClient ossClient;

    public OssUploader(UploadProperties.OssConfig properties) {
        // 创建ClientConfiguration。ClientConfiguration是OSSClient的配置类，可配置代理、连接超时、最大连接数等参数。
        ClientConfiguration conf = new ClientConfiguration();
        // 设置OSSClient允许打开的最大HTTP连接数，默认为1024个。
        conf.setMaxConnections(1024);
        // 设置Socket层传输数据的超时时间，默认为50000毫秒。
        conf.setSocketTimeout(50000);
        // 设置建立连接的超时时间，默认为50000毫秒。
        conf.setConnectionTimeout(50000);
        // 设置从连接池中获取连接的超时时间（单位：毫秒），默认不超时。
        conf.setConnectionRequestTimeout(1000);
        // 设置连接空闲超时时间。超时则关闭连接，默认为60000毫秒。
        conf.setIdleConnectionTime(60000);
        // 设置失败请求重试次数，默认为3次。
        conf.setMaxErrorRetry(5);
        CredentialsProvider credentialsProvider = new DefaultCredentialProvider(properties.getAccessKey(), properties.getSecretKey());
        this.ossClient = new OSSClient(properties.getEndpoint(), credentialsProvider, conf);
        this.properties = properties;
    }

    @Override
    public FileEntity upload(MultipartFile file) {
        return upload(file, null);
    }

    @Override
    public FileEntity upload(MultipartFile file, String dir) {
        try {
            String originName = file.getOriginalFilename();
            String fileName = getFileName(originName); //  不重写使用默认名, 重写使用 uuid.原始后缀
            String path = getPath(dir, fileName); // 获取存储路径: /yyyyMMdd/文件名
            makeBucket(properties.getBucketName());
            ossClient.putObject(properties.getBucketName(), path, file.getInputStream());
            FileEntity entity = new FileEntity();
            entity.setOriginName(originName);
            entity.setFileName(fileName);
            entity.setSize(file.getSize());
            entity.setPath(getPath(dir, fileName));
            entity.setUrl(getUrl(dir, fileName));
            entity.setHash(SecureUtil.md5(file.getInputStream()));
            entity.setContentType(FileUtil.getMimeType(originName));
            return entity;
        } catch (Exception e) {
            log.error(e.getMessage(), e);
            ExceptionUtil.wrapRuntimeAndThrow("Upload Error!");
        }
        return null;
    }


    @Override
    public void delete(String path) {
        ossClient.deleteObject(properties.getBucketName(), path);
    }

    @Override
    public void rename(String path, String fileName) {
        String bucketName = properties.getBucketName();
        String newPath = StrUtil.subBefore(path, '/', true) + StrUtil.SLASH + fileName;
        ossClient.copyObject(bucketName, path, bucketName, newPath);
        this.delete(path);
    }

    public String getPath(String dir, String fileName) {
        String currentDate = DateUtil.date().toString("yyyyMMdd");
        if (StrUtil.isNotEmpty(dir)) {
            return dir + StrUtil.SLASH + currentDate + StrUtil.SLASH + fileName;
        }
        return currentDate + StrUtil.SLASH + fileName;
    }

    public String getUrl(String dir, String fileName) {
        return getOssHost(properties.getBucketName()).concat(StrUtil.SLASH).concat(getPath(dir, fileName));
    }

    public String getFileName(String originName) {
        if (properties.isRewriteFileName()) {
            String ext = FileUtil.extName(originName);
            return StrUtil.format("{}.{}", IdUtil.fastSimpleUUID(), ext);
        }
        return originName;
    }

    public void makeBucket(String bucketName) {
        if (!bucketExists(bucketName)) {
            ossClient.createBucket(bucketName);
        }
    }

    public boolean bucketExists(String bucketName) {
        return ossClient.doesBucketExist(bucketName);
    }

    public String getOssHost(String bucketName) {
        String prefix = properties.getEndpoint().contains("https://") ? "https://" : "http://";
        return prefix + bucketName + StrUtil.DOT + properties.getEndpoint().replaceFirst(prefix, StrUtil.EMPTY);
    }
}
