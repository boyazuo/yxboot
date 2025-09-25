package com.yxboot.modules.sys.entity;

import java.io.Serial;
import java.io.Serializable;
import com.mybatisflex.annotation.Id;
import com.mybatisflex.annotation.KeyType;
import com.mybatisflex.annotation.Table;
import com.yxboot.config.mybatisflex.MyFlexListener;
import io.swagger.v3.oas.annotations.media.Schema;
import lombok.Data;
import lombok.EqualsAndHashCode;

/**
 * 系统角色菜单表
 *
 * @author Boya
 */
@Data
@EqualsAndHashCode(callSuper = false)
@Table(value = "sys_role_menu", onInsert = MyFlexListener.class, onUpdate = MyFlexListener.class)
@Schema(name = "SysRoleMenu", description = "系统角色菜单表")
public class SysRoleMenu implements Serializable {
	@Serial
	private static final long serialVersionUID = 1L;

	/**
	 * 编号
	 */
	@Id(keyType = KeyType.Auto)
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
