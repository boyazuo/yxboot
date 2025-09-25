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
 * 系统角色表
 *
 * @author Boya
 */
@Data
@EqualsAndHashCode(callSuper = false)
@Table(value = "sys_role", onInsert = MyFlexListener.class, onUpdate = MyFlexListener.class)
@Schema(name = "SysRole", description = "系统角色表")
public class SysRole implements Serializable {
	@Serial
	private static final long serialVersionUID = 1L;

	/**
	 * 角色编号
	 */
	@Id(keyType = KeyType.Auto)
	@Schema(description = "角色编号")
	private Long roleId;

	/**
	 * 角色名称
	 */
	@Schema(description = "角色名称")
	private String name;

	/**
	 * 角色编码
	 */
	@Schema(description = "角色编码")
	private String code;

	/**
	 * 角色描述
	 */
	@Schema(description = "角色描述")
	private String descn;

	/**
	 * 数据权限（1:本人 2:本区域 3:全部）
	 */
	@Schema(description = "数据权限（1:本人 2:本区域 3:全部）")
	private Integer dataType;

	/**
	 * 排序
	 */
	@Schema(description = "排序")
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
	 * 状态（0:无效 1:有效）
	 */
	@Schema(description = "状态（0:无效 1:有效）")
	private StatusEnum status;

	/**
	 * 删除标识（0:未删除 1:已删除）
	 */
	@Schema(description = "删除标识（0:未删除  1:已删除）")
	private Integer deleted;

	@Column(ignore = true)
	@Schema(description = "关联菜单")
	private List<SysMenu> menus;
}
