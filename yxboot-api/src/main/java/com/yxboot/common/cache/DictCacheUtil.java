package com.yxboot.common.cache;

import cn.hutool.core.collection.CollUtil;
import com.alicp.jetcache.Cache;
import com.alicp.jetcache.CacheManager;
import com.alicp.jetcache.anno.CacheType;
import com.alicp.jetcache.template.QuickConfig;
import com.yxboot.config.cache.CacheConstants;
import com.yxboot.modules.sys.entity.SysDictData;
import com.yxboot.modules.sys.service.SysDictDataService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Component;

import javax.annotation.PostConstruct;
import java.time.Duration;

/**
 * 字典缓存类
 *
 * @author Boya
 */
@Component
@RequiredArgsConstructor
public class DictCacheUtil {
    private final CacheManager cacheManager;
    private final SysDictDataService dictService;

    private Cache<String, SysDictData> dictCache;
    public Cache<String, SysDictData> cache() {
        return dictCache;
    }

    @PostConstruct
    public void init() {
        QuickConfig qc = QuickConfig.newBuilder(CacheConstants.SYS_DICT_VALUE_CACHE_KEY)
                .expire(Duration.ofDays(CacheConstants.CACHE_EXPIRE_DAYS))
                .cacheType(CacheType.BOTH)
                .localLimit(50)
                .syncLocal(true)
                .build();
        dictCache = cacheManager.getOrCreateCache(qc);
    }

    public SysDictData getDict(String dictValue) {
        SysDictData dict = dictCache.get(dictValue);
        if (dict == null) {
            dict = dictService.selectByValue(dictValue);
            dictCache.put(dictValue, dict);
        }
        return dict;
    }

    public void clearCache(String dictValue) {
        dictCache.remove(dictValue);
    }

    public void clearCache(String[] dictValues) {
        dictCache.removeAll(CollUtil.newHashSet(dictValues));
    }
}
