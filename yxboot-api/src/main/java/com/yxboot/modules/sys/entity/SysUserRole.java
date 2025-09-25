package com.yxboot.modules.sys.entity;

import java.io.Serial;
import java.io.Serializable;
import com.mybatisflex.annotation.Id;
import com.mybatisflex.annotation.KeyType;
import com.mybatisflex.annotation.Table;
import io.swagger.v3.oas.annotations.media.Schema;
import lombok.Data;
import lombok.EqualsAndHashCode;

/**
 * 系统用户角色表
 *
 * @author Boya
 */
@Data
@EqualsAndHashCode(callSuper = false)
@Table(value = "sys_user_role")
@Schema(name = "SysUserRole", description = "系统用户角色表")
public class SysUserRole implements Serializable {
	@Serial
	private static final long serialVersionUID = 1L;

	/**
	 * 编号
	 */
	@Id(keyType = KeyType.Auto)
	@Schema(description = "编号")
	private Long id;

	/**
	 * 用户编号
	 */
	@Schema(description = "用户编号")
	private Long userId;

	/**
	 * 角色编号
	 */
	@Schema(description = "角色编号")
	private Long roleId;

}
