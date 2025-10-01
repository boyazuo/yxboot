package com.yxboot.modules.sys.entity;

import java.io.Serial;
import java.io.Serializable;
import java.util.Date;
import com.mybatisflex.annotation.Id;
import com.mybatisflex.annotation.KeyType;
import com.mybatisflex.annotation.Table;
import com.yxboot.common.enums.StatusEnum;
import com.yxboot.config.mybatisflex.MyFlexListener;
import io.swagger.v3.oas.annotations.media.Schema;
import lombok.Data;
import lombok.EqualsAndHashCode;

/**
 * 字典表
 *
 * @author Boya
 */
@Data
@EqualsAndHashCode(callSuper = false)
@Table(value = "sys_dict", onInsert = MyFlexListener.class, onUpdate = MyFlexListener.class)
@Schema(name = "SysDict", description = "字典表")
public class SysDict implements Serializable {
	@Serial
	private static final long serialVersionUID = 1L;

	/**
	 * 字典编号
	 */
	@Id(keyType = KeyType.Auto)
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
	private Long createUserId;

	/**
	 * 创建时间
	 */
	@Schema(description = "创建时间")
	private Date createTime;

	/**
	 * 更新人
	 */
	@Schema(description = "更新人")
	private Long updateUserId;

	/**
	 * 更新时间
	 */
	@Schema(description = "更新时间")
	private Date updateTime;

	/**
	 * 状态
	 */
	@Schema(description = "状态")
	private StatusEnum status;

}
