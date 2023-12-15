package com.yxboot.modules.sys.entity;

import com.baomidou.mybatisplus.annotation.IdType;
import com.baomidou.mybatisplus.annotation.TableField;
import com.baomidou.mybatisplus.annotation.TableId;
import com.baomidou.mybatisplus.annotation.TableName;
import com.yxboot.common.enums.StatusEnum;
import com.yxboot.common.vo.Dict;
import io.swagger.v3.oas.annotations.media.Schema;
import lombok.Data;
import lombok.EqualsAndHashCode;

import java.io.Serial;
import java.io.Serializable;
import java.util.Date;

/**
 * 系统用户表
 *
 * @author Boya
 */
@Data
@EqualsAndHashCode(callSuper = false)
@TableName(value = "sys_user",resultMap = "BaseResultMap")
@Schema(name = "SysUser", description = "系统用户表")
public class SysUser implements Serializable {
	@Serial
	private static final long serialVersionUID = 1L;

	/**
	 * 用户编号
	 */
	@TableId(value = "user_id", type = IdType.AUTO)
	@Schema(description = "用户编号")
	private Long userId;

	/**
	 * 登录账号
	 */
	@Schema(description = "登录账号")
	private String username;

	/**
	 * 密码
	 */
	@Schema(description = "密码")
	private String password;

	/**
	 * 姓名
	 */
	@Schema(description = "姓名")
	private String name;

	/**
	 * 头像
	 */
	@Schema(description = "头像")
	private String avatar;

	/**
	 * 手机号
	 */
	@Schema(description = "手机号")
	private String phone;

	/**
	 * 邮箱
	 */
	@Schema(description = "邮箱")
	private String email;

	/**
	 * 性别（0:未设置 1:男 2:女）
	 */
	@Schema(description = "性别（0:未设置 1:男 2:女）")
	private Dict sex;

	/**
	 * 所在部门
	 */
	@Schema(description = "所在部门")
	private Long deptId;

	/**
	 * 岗位
	 */
	@Schema(description = "岗位")
	private String position;

	/**
	 * 直属上级
	 */
	@Schema(description = "直属上级")
	private Long leaderId;

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
	 * 最后登录时间
	 */
	@Schema(description = "最后登录时间")
	private Date lastLoginTime;

	/**
	 * 状态（0:无效 1:有效）
	 */
	@Schema(description = "状态（0:无效 1:有效）")
	private StatusEnum status;

	/**
	 * 删除标识(0:未删除 1:已删除)
	 */
	@Schema(description = "删除标识(0:未删除 1:已删除)")
	private Integer deleted;

	@TableField(exist = false)
	private SysRole role;

	@TableField(exist = false)
	private Long roleId;

	@TableField(exist = false)
	private String  deptName;

	public Long getRoleId() {
		if (role != null) {
			return role.getRoleId();
		} else {
			return roleId;
		}
	}

	public SysRole getRole() {
		if (role != null) {
			return role;
		} else {
			SysRole sysRole = new SysRole();
			sysRole.setRoleId(roleId);
			return sysRole;
		}
	}

}
