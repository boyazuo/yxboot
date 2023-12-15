package com.yxboot.config.cache;

import com.alicp.jetcache.anno.config.EnableMethodCache;
import com.alicp.jetcache.anno.support.JetCacheBaseBeans;
import org.springframework.context.annotation.Configuration;
import org.springframework.context.annotation.Import;

@Configuration
@EnableMethodCache(basePackages = "com.yxboot")
@Import(JetCacheBaseBeans.class)
public class JetCacheConfig {

}
