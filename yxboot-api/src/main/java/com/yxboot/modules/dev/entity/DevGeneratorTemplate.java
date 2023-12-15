package com.yxboot.modules.dev.entity;

import com.baomidou.mybatisplus.annotation.IdType;
import com.baomidou.mybatisplus.annotation.TableId;
import com.baomidou.mybatisplus.annotation.TableName;
import com.yxboot.common.enums.TemplateTypeEnum;
import io.swagger.v3.oas.annotations.media.Schema;
import lombok.Data;
import lombok.EqualsAndHashCode;

import java.io.Serializable;
import java.util.Date;

/**
 * 代码生成模板
 *
 * @author Baoy
 */
@Data
@EqualsAndHashCode(callSuper = false)
@TableName("dev_generator_template")
@Schema(name = "DevGeneratorTemplate", description = "代码生成模板")
public class DevGeneratorTemplate implements Serializable {
    private static final long serialVersionUID = 1L;

    /**
     * 模板id
     */
    @TableId(value = "id", type = IdType.AUTO)
    private Long id;

    /**
     * 模板名称
     */
    @Schema(description = "模板名称")
    private String name;

    /**
     * 模板类型1前端模板 2后端模板
     */
    @Schema(description = "模板类型1前端模板 2后端模板")
    private TemplateTypeEnum type;

    /**
     * 模板内容
     */
    @Schema(description = "模板内容")
    private String content;

    /**
     * 模板语言
     */
    @Schema(description = "模板语言")
    private String language;

    /**
     * 排序
     */
    @Schema(description = "排序")
    private Integer sort;

    /**
     *  创建人
     */
    @Schema(description = "创建人")
    private Long createUserId;

    /**
     * 创建时间
     */
    @Schema(description = "创建时间")
    private Date createTime;

    /**
     *  更新人
     */
    @Schema(description = "更新人")
    private Long updateUserId;

    /**
     *  更新时间
     */
    @Schema(description = "更新时间")
    private Date updateTime;

    /**
     *  状态
     */
    @Schema(description = "状态")
    private Integer status;
}