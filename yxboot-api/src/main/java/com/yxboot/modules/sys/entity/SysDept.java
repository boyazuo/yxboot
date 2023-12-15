package com.yxboot.modules.sys.entity;

import com.baomidou.mybatisplus.annotation.IdType;
import com.baomidou.mybatisplus.annotation.TableField;
import com.baomidou.mybatisplus.annotation.TableId;
import com.baomidou.mybatisplus.annotation.TableName;
import com.yxboot.common.enums.StatusEnum;
import io.swagger.v3.oas.annotations.media.Schema;
import lombok.Data;
import lombok.EqualsAndHashCode;

import java.io.Serial;
import java.io.Serializable;
import java.util.Date;
import java.util.List;

/**
 * 部门表
 *
 * @author Boya
 */
@Data
@EqualsAndHashCode(callSuper = false)
@TableName("sys_dept")
@Schema(name = "SysDept", description = "部门表")
public class SysDept implements Serializable {
	@Serial
	private static final long serialVersionUID = 1L;

	/**
	 * 部门编号
	 */
	@TableId(value = "dept_id", type = IdType.AUTO)
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
	 * 删除标识
	 */
	@Schema(description = "删除标识")
	private Integer deleted;

	/**
	 * 子部门
	 */
	@TableField(exist = false)
	private List<SysDept> children;
}
