package com.yxboot.modules.sys.entity;

import java.io.Serial;
import java.io.Serializable;
import java.util.Date;
import com.mybatisflex.annotation.Column;
import com.mybatisflex.annotation.Id;
import com.mybatisflex.annotation.KeyType;
import com.mybatisflex.annotation.Table;
import com.yxboot.common.enums.StatusEnum;
import com.yxboot.common.vo.Dict;
import com.yxboot.config.mybatisflex.MyFlexListener;
import com.yxboot.config.mybatisflex.handler.DictTypeHandler;
import io.swagger.v3.oas.annotations.media.Schema;
import lombok.Data;
import lombok.EqualsAndHashCode;

/**
 * 系统用户表
 *
 * @author Boya
 */
@Data
@EqualsAndHashCode(callSuper = false)
@Table(value = "sys_user", onInsert = MyFlexListener.class, onUpdate = MyFlexListener.class)
@Schema(name = "SysUser", description = "系统用户表")
public class SysUser implements Serializable {
	@Serial
	private static final long serialVersionUID = 1L;

	/**
	 * 用户编号
	 */
	@Id(keyType = KeyType.Auto)
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
	@Column(typeHandler = DictTypeHandler.class)
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
	 * 状态
	 */
	@Schema(description = "状态")
	private StatusEnum status;

	@Column(ignore = true)
	private Long roleId;

	@Column(ignore = true)
	private String roleName;

	@Column(ignore = true)
	private String deptName;
}
