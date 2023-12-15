package com.yxboot.modules.sys.entity;

import com.baomidou.mybatisplus.annotation.IdType;
import com.baomidou.mybatisplus.annotation.TableId;
import com.baomidou.mybatisplus.annotation.TableName;
import io.swagger.v3.oas.annotations.media.Schema;
import lombok.Data;
import lombok.EqualsAndHashCode;
import lombok.experimental.Accessors;

import java.io.Serial;
import java.io.Serializable;
import java.util.Date;

/**
 * 附件表
 *
 * @author Boya
 */
@Data
@EqualsAndHashCode(callSuper = false)
@Accessors(chain = true)
@TableName("sys_file")
@Schema(name = "SysFile", description = "附件表")
public class SysFile implements Serializable {
	@Serial
	private static final long serialVersionUID = 1L;

	/**
	 * 附件编号
	 */
	@TableId(value = "file_id", type = IdType.AUTO)
	@Schema(description = "附件编号")
	private Long attachmentId;

	/**
	 * 原始文件名称
	 */
	@Schema(description = "原始文件名称")
	private String originName;

	/**
	 * 文件名称
	 */
	@Schema(description = "文件名称")
	private String fileName;

	/**
	 * 文件路径
	 */
	@Schema(description = "文件路径")
	private String path;

	/**
	 * 文件URL
	 */
	@Schema(description = "文件URL")
	private String url;

	/**
	 * 文件hash值
	 */
	@Schema(description = "文件hash值")
	private String hash;

	/**
	 * ContentType
	 */
	@Schema(description = "ContentType")
	private String contentType;

	/**
	 * 文件大小
	 */
	@Schema(description = "文件大小")
	private Long size;

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
	 * 状态
	 */
	@Schema(description = "状态")
	private Integer status;

}
