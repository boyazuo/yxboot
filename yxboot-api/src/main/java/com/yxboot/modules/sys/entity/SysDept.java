package com.yxboot.modules.sys.entity;

import java.io.Serial;
import java.io.Serializable;
import java.util.Date;
import java.util.List;
import com.mybatisflex.annotation.Column;
import com.mybatisflex.annotation.Id;
import com.mybatisflex.annotation.KeyType;
import com.mybatisflex.annotation.Table;
import com.yxboot.common.enums.StatusEnum;
import com.yxboot.config.mybatisflex.MyFlexListener;
import io.swagger.v3.oas.annotations.media.Schema;
import lombok.Data;
import lombok.EqualsAndHashCode;

/**
 * 部门表
 *
 * @author Boya
 */
@Data
@EqualsAndHashCode(callSuper = false)
@Table(value = "sys_dept", onInsert = MyFlexListener.class, onUpdate = MyFlexListener.class)
@Schema(name = "SysDept", description = "部门表")
public class SysDept implements Serializable {
	@Serial
	private static final long serialVersionUID = 1L;

	/**
	 * 部门编号
	 */
	@Id(keyType = KeyType.Auto)
	@Schema(description = "部门编号")
	private Long deptId;

	/**
	 * 部门名称
	 */
	@Schema(description = "部门名称")
	private String name;

	/**
	 * 上级部门
	 */
	@Schema(description = "上级部门")
	private Long parentId;

	/**
	 * 排序
	 */
	@Schema(description = "排序")
	private Integer sort;

	/**
	 * 备注
	 */
	@Schema(description = "备注")
	private String remark;

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

	/**
	 * 子部门
	 */
	@Column(ignore = true)
	private List<SysDept> children;
}
