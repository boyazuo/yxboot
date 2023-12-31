package com.yxboot.modules.sys.entity;

import com.baomidou.mybatisplus.annotation.IdType;
import com.baomidou.mybatisplus.annotation.TableField;
import com.baomidou.mybatisplus.annotation.TableId;
import com.baomidou.mybatisplus.annotation.TableName;
import com.yxboot.common.enums.MenuEnum;
import com.yxboot.common.enums.StatusEnum;
import io.swagger.v3.oas.annotations.media.Schema;
import lombok.Data;
import lombok.EqualsAndHashCode;

import java.io.Serial;
import java.io.Serializable;
import java.util.Date;
import java.util.List;

/**
 * 菜单表
 *
 * @author Boya
 */
@Data
@EqualsAndHashCode(callSuper = false)
@TableName("sys_menu")
@Schema(name = "SysMenu", description = "菜单表")
public class SysMenu implements Serializable {
	@Serial
	private static final long serialVersionUID = 1L;

	/**
	 * 菜单编号
	 */
	@TableId(value = "menu_id", type = IdType.AUTO)
	@Schema(description = "菜单编号")
	private Long menuId;

	/**
	 * 菜单名称
	 */
	@Schema(description = "菜单名称")
	private String name;

	/**
	 * 菜单说明
	 */
	@Schema(description = "菜单说明")
	private String descn;

	/**
	 * 菜单编码
	 */
	@Schema(description = "菜单编码")
	private String code;

	/**
	 * 菜单类型
	 */
	@Schema(description = "菜单类型")
	private MenuEnum type;

	/**
	 * 图标
	 */
	@Schema(description = "图标")
	private String icon;

	/**
	 * 菜单路径
	 */
	@Schema(description = "菜单路径")
	private String path;

	/**
	 * 组件
	 */
	@Schema(description = "组件")
	private String component;

	/**
	 * 上级菜单
	 */
	@Schema(description = "上级菜单")
	private Long parentId;

	/**
	 * 是否显示
	 */
	@Schema(description = "是否显示")
	private Integer display;

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
	 * 子菜单
	 */
	@TableField(exist = false)
	private List<SysMenu> children;

	/**
	 * 上级菜单
	 */
	@Schema(description = "上级菜单")
	@TableField(exist = false)
	private String parentName;
}
