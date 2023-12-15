package com.yxboot.common.cache;

import com.alicp.jetcache.Cache;
import com.alicp.jetcache.CacheManager;
import com.alicp.jetcache.anno.CacheType;
import com.alicp.jetcache.template.QuickConfig;
import com.yxboot.config.cache.CacheConstants;
import com.yxboot.modules.sys.entity.SysUser;
import com.yxboot.modules.sys.service.SysUserService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Component;

import javax.annotation.PostConstruct;
import java.time.Duration;

/**
 * 用户缓存类
 *
 * @author Boya
 */
@Component
@RequiredArgsConstructor
public class SysUserCacheUtil {
    private final CacheManager cacheManager;
    private final SysUserService userService;

    private Cache<Long, SysUser> userCache;
    public Cache<Long, SysUser> cache() {
        return userCache;
    }

    @PostConstruct
    public void init() {
        QuickConfig qc = QuickConfig.newBuilder(CacheConstants.SYS_USER_VALUE_CACHE_KEY)
                .expire(Duration.ofDays(CacheConstants.CACHE_EXPIRE_DAYS))
                .cacheType(CacheType.BOTH)
                .localLimit(50)
                .syncLocal(true)
                .build();
        userCache = cacheManager.getOrCreateCache(qc);
    }

    public SysUser getUser(Long userId) {
        SysUser user = userCache.get(userId);
        if (user == null) {
            user = userService.getById(userId);
            userCache.put(userId, user);
        }
        return user;
    }
}
