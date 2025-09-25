package com.yxboot.config.mybatisflex;

import javax.annotation.PostConstruct;
import org.mybatis.spring.annotation.MapperScan;
import org.springframework.context.annotation.Configuration;
import com.mybatisflex.core.audit.AuditManager;

/**
 * MyBatis-Flex配置类
 *
 * @author Boya
 */
@Configuration
@MapperScan("com.yxboot.modules.**.mapper")
public class MyBatisFlexConfig {

    @PostConstruct
    public void init() {
        // 配置审计管理器
        AuditManager.setAuditEnable(true);

        // 设置 SQL 审计收集器
        AuditManager.setMessageCollector(auditMessage -> {
            System.out.println("SQL: " + auditMessage.getFullSql());
            System.out.println("执行时间: " + auditMessage.getElapsedTime() + " ms");
        });
    }
}
