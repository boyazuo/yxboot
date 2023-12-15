package com.yxboot.modules.sys.entity;

import com.baomidou.mybatisplus.annotation.*;
import com.yxboot.common.enums.StatusEnum;
import io.swagger.v3.oas.annotations.media.Schema;
import lombok.Data;
import lombok.EqualsAndHashCode;

import java.io.Serial;
import java.io.Serializable;
import java.util.Date;

/**
 * 字典表
 *
 * @author Boya
 */
@Data
@EqualsAndHashCode(callSuper = false)
@TableName("sys_dict")
@Schema(name = "SysDict", description = "字典表")
public class SysDict implements Serializable {
	@Serial
	private static final long serialVersionUID = 1L;

	/**
	 * 字典编号
	 */
	@TableId(value = "dict_id", type = IdType.AUTO)
	@Schema(description = "字典编号")
	private Long dictId;

	/**
	 * 字典名称
	 */
	@Schema(description = "字典名称")
	private String dictName;

	/**
	 * 字典编码
	 */
	@Schema(description = "字典编码")
	private String dictCode;

	/**
	 * 字典说明
	 */
	@Schema(description = "字典说明")
	private String descn;

	/**
	 * 排序字段
	 */
	@Schema(description = "排序字段")
	private Integer sort;

	/**
	 * 创建人
	 */
	@Schema(description = "创建人")
	@TableField(fill = FieldFill.INSERT)
	private Long createUserId;

	/**
	 * 创建时间
	 */
	@Schema(description = "创建时间")
	@TableField(fill = FieldFill.INSERT)
	private Date createTime;

	/**
	 * 更新人
	 */
	@Schema(description = "更新人")
	@TableField(fill = FieldFill.INSERT_UPDATE)
	private Long updateUserId;

	/**
	 * 更新时间
	 */
	@Schema(description = "更新时间")
	@TableField(fill = FieldFill.INSERT_UPDATE)
	private Date updateTime;

	/**
	 * 状态
	 */
	@Schema(description = "状态")
	private StatusEnum status;

	/**
	 * 删除标识
	 */
	@Schema(description = "删除标识")
	private Integer deleted;

}
