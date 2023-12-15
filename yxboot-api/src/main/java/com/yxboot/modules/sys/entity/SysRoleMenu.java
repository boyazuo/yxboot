package com.yxboot.modules.sys.entity;

import com.baomidou.mybatisplus.annotation.IdType;
import com.baomidou.mybatisplus.annotation.TableId;
import com.baomidou.mybatisplus.annotation.TableName;
import io.swagger.v3.oas.annotations.media.Schema;
import lombok.Data;
import lombok.EqualsAndHashCode;

import java.io.Serial;
import java.io.Serializable;

/**
 * 系统角色菜单表
 *
 * @author Boya
 */
@Data
@EqualsAndHashCode(callSuper = false)
@TableName("sys_role_menu")
@Schema(name = "SysRoleMenu", description = "系统角色菜单表")
public class SysRoleMenu implements Serializable {
	@Serial
	private static final long serialVersionUID = 1L;

	/**
	 * 编号
	 */
	@TableId(value = "id", type = IdType.AUTO)
	@Schema(description = "编号")
	private Long id;

	/**
	 * 角色编号
	 */
	@Schema(description = "角色编号")
	private Long roleId;

	/**
	 * 菜单编号
	 */
	@Schema(description = "菜单编号")
	private Long menuId;

}
