package com.yxboot.modules.sys.entity;

import java.io.Serial;
import java.io.Serializable;
import java.util.Date;
import com.mybatisflex.annotation.Id;
import com.mybatisflex.annotation.KeyType;
import com.mybatisflex.annotation.Table;
import com.yxboot.common.enums.LogTypeEnum;
import com.yxboot.config.mybatisflex.MyFlexListener;
import io.swagger.v3.oas.annotations.media.Schema;
import lombok.Data;
import lombok.EqualsAndHashCode;
import lombok.experimental.Accessors;

/**
 * 日志表
 * 
 * @author Boya
 */
@Data
@EqualsAndHashCode(callSuper = false)
@Accessors(chain = true)
@Table(value = "sys_log", onInsert = MyFlexListener.class, onUpdate = MyFlexListener.class)
@Schema(name = "SysLog", description = "日志表")
public class SysLog implements Serializable {
    @Serial
    private static final long serialVersionUID = 1L;

    /**
     *
     */
    @Id(keyType = KeyType.Auto)
    private Long id;

    /**
     * 用户
     */
    @Schema(description = "用户")
    private String username;

    /**
     * 日志类别
     */
    @Schema(description = "日志类别")
    private LogTypeEnum type;

    /**
     * 记录信息
     */
    @Schema(description = "记录信息")
    private String operation;

    /**
     * 包
     */
    @Schema(description = "包")
    private String method;

    /**
     * 参数
     */
    @Schema(description = "参数")
    private String params;

    /**
     * ip
     */
    @Schema(description = "ip")
    private String ip;

    /**
     * 创建时间
     */
    @Schema(description = "创建时间")
    private Date createTime;

}
