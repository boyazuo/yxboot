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
 * 字典数据表
 *
 * @author Boya
 */
@Data
@EqualsAndHashCode(callSuper = false)
@TableName("sys_dict_data")
@Schema(name = "SysDictData", description = "字典数据表")
public class SysDictData implements Serializable {
	@Serial
	private static final long serialVersionUID = 1L;

	/**
	 * 编号
	 */
	@TableId(value = "id", type = IdType.AUTO)
	@Schema(description = "编号")
	private Long id;

	/**
	 * 字典编码
	 */
	@Schema(description = "字典编码")
	private String dictCode;

	/**
	 * 标识
	 */
	@Schema(description = "标识")
	private String label;

	/**
	 * 值
	 */
	@Schema(description = "值")
	private String value;

	/**
	 * 排序
	 */
	@Schema(description = "排序")
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
