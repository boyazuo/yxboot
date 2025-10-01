SET NAMES utf8mb4;
SET FOREIGN_KEY_CHECKS = 0;

-- ----------------------------
-- Table structure for sys_dept
-- ----------------------------
DROP TABLE IF EXISTS `sys_dept`;
CREATE TABLE `sys_dept` (
  `dept_id` bigint(20) NOT NULL AUTO_INCREMENT COMMENT '部门编号',
  `name` varchar(100) DEFAULT NULL COMMENT '部门名称',
  `parent_id` bigint(20) DEFAULT NULL COMMENT '上级部门',
  `sort` int(11) DEFAULT NULL COMMENT '排序',
  `remark` varchar(200) DEFAULT NULL COMMENT '备注',
  `create_user_id` bigint(20) DEFAULT NULL COMMENT '创建人',
  `create_time` datetime DEFAULT NULL COMMENT '创建时间',
  `update_user_id` bigint(20) DEFAULT NULL COMMENT '更新人',
  `update_time` datetime DEFAULT NULL COMMENT '更新时间',
  `status` varchar(20) DEFAULT NULL COMMENT '状态',
  PRIMARY KEY (`dept_id`)
) ENGINE=InnoDB AUTO_INCREMENT=60 DEFAULT CHARSET=utf8mb4 COMMENT='部门表';

-- ----------------------------
-- Records of sys_dept
-- ----------------------------
BEGIN;
INSERT INTO `sys_dept` (`dept_id`, `name`, `parent_id`, `sort`, `remark`, `create_user_id`, `create_time`, `update_user_id`, `update_time`, `status`) VALUES (56, '研发部', NULL, NULL, NULL, NULL, NULL, NULL, NULL, 'normal');
INSERT INTO `sys_dept` (`dept_id`, `name`, `parent_id`, `sort`, `remark`, `create_user_id`, `create_time`, `update_user_id`, `update_time`, `status`) VALUES (58, '销售部', NULL, NULL, '', NULL, NULL, NULL, NULL, 'normal');
INSERT INTO `sys_dept` (`dept_id`, `name`, `parent_id`, `sort`, `remark`, `create_user_id`, `create_time`, `update_user_id`, `update_time`, `status`) VALUES (59, '111', 57, NULL, '33838', NULL, NULL, NULL, NULL, 'normal');
COMMIT;

-- ----------------------------
-- Table structure for sys_dict
-- ----------------------------
DROP TABLE IF EXISTS `sys_dict`;
CREATE TABLE `sys_dict` (
  `dict_id` bigint(20) NOT NULL AUTO_INCREMENT COMMENT '字典编号',
  `dict_name` varchar(100) DEFAULT NULL COMMENT '字典名称',
  `dict_code` varchar(100) DEFAULT NULL COMMENT '字典编码',
  `descn` varchar(200) DEFAULT NULL COMMENT '字典说明',
  `sort` int(11) DEFAULT NULL COMMENT '排序字段',
  `create_user_id` bigint(20) DEFAULT NULL COMMENT '创建人',
  `create_time` datetime DEFAULT NULL COMMENT '创建时间',
  `update_user_id` bigint(20) DEFAULT NULL COMMENT '更新人',
  `update_time` datetime DEFAULT NULL COMMENT '更新时间',
  `status` varchar(20) DEFAULT NULL COMMENT '状态',
  PRIMARY KEY (`dict_id`)
) ENGINE=InnoDB AUTO_INCREMENT=6 DEFAULT CHARSET=utf8mb4 COMMENT='字典表';

-- ----------------------------
-- Records of sys_dict
-- ----------------------------
BEGIN;
INSERT INTO `sys_dict` (`dict_id`, `dict_name`, `dict_code`, `descn`, `sort`, `create_user_id`, `create_time`, `update_user_id`, `update_time`, `status`) VALUES (1, '用户性别', 'user_sex', '', NULL, 1, '2022-12-05 10:39:24', NULL, NULL, 'normal');
COMMIT;

-- ----------------------------
-- Table structure for sys_dict_data
-- ----------------------------
DROP TABLE IF EXISTS `sys_dict_data`;
CREATE TABLE `sys_dict_data` (
  `id` bigint(20) NOT NULL AUTO_INCREMENT COMMENT '编号',
  `dict_code` varchar(100) DEFAULT NULL COMMENT '字典编码',
  `label` varchar(100) DEFAULT NULL COMMENT '标识',
  `value` varchar(200) DEFAULT NULL COMMENT '值',
  `sort` int(11) DEFAULT NULL COMMENT '排序',
  `create_user_id` bigint(20) DEFAULT NULL COMMENT '创建人',
  `create_time` datetime DEFAULT NULL COMMENT '创建时间',
  `update_user_id` bigint(20) DEFAULT NULL COMMENT '更新人',
  `update_time` datetime DEFAULT NULL COMMENT '更新时间',
  `status` varchar(20) DEFAULT NULL COMMENT '状态',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=utf8mb4 COMMENT='字典数据表';

-- ----------------------------
-- Records of sys_dict_data
-- ----------------------------
BEGIN;
INSERT INTO `sys_dict_data` (`id`, `dict_code`, `label`, `value`, `sort`, `create_user_id`, `create_time`, `update_user_id`, `update_time`, `status`) VALUES (1, 'user_sex', '男', '1', NULL, NULL, NULL, 1, '2022-12-05 11:44:28', 'normal');
INSERT INTO `sys_dict_data` (`id`, `dict_code`, `label`, `value`, `sort`, `create_user_id`, `create_time`, `update_user_id`, `update_time`, `status`) VALUES (2, 'user_sex', '女', '2', NULL, NULL, NULL, 2, '2023-05-06 15:55:27', 'normal');
INSERT INTO `sys_dict_data` (`id`, `dict_code`, `label`, `value`, `sort`, `create_user_id`, `create_time`, `update_user_id`, `update_time`, `status`) VALUES (3, 'user_sex', '保密', '0', NULL, NULL, NULL, 1, '2024-02-14 18:50:57', 'normal');
COMMIT;

-- ----------------------------
-- Table structure for sys_file
-- ----------------------------
DROP TABLE IF EXISTS `sys_file`;
CREATE TABLE `sys_file` (
  `file_id` bigint(20) NOT NULL AUTO_INCREMENT COMMENT '附件编号',
  `origin_name` varchar(200) DEFAULT NULL COMMENT '原始文件名称',
  `file_name` varchar(200) DEFAULT NULL COMMENT '文件名称',
  `url` varchar(500) DEFAULT NULL COMMENT '文件URL',
  `path` varchar(500) DEFAULT NULL COMMENT '文件路径',
  `hash` varchar(100) DEFAULT NULL COMMENT '文件hash值',
  `content_type` varchar(100) DEFAULT NULL COMMENT 'ContentType',
  `size` bigint(20) DEFAULT NULL COMMENT '文件大小',
  `create_user_id` bigint(20) DEFAULT NULL COMMENT '创建人',
  `create_time` datetime DEFAULT NULL COMMENT '创建时间',
  `status` varchar(20) DEFAULT NULL COMMENT '状态',
  PRIMARY KEY (`file_id`) USING BTREE
) ENGINE=InnoDB AUTO_INCREMENT=9 DEFAULT CHARSET=utf8mb4 COMMENT='附件表';

-- ----------------------------
-- Records of sys_file
-- ----------------------------
BEGIN;
INSERT INTO `sys_file` (`file_id`, `origin_name`, `file_name`, `url`, `path`, `hash`, `content_type`, `size`, `create_user_id`, `create_time`, `status`) VALUES (2, '889ff067jw1dvcljidmquj.jpg', '889ff067jw1dvcljidmquj.jpg', 'http://yxboot.boyait.org/images/20231214/889ff067jw1dvcljidmquj.jpg', '20231214/889ff067jw1dvcljidmquj.jpg', '0beec3c2e5a9b0dc78d5bb49f5cfcd14', 'image/jpeg', 52288, NULL, NULL, NULL);
INSERT INTO `sys_file` (`file_id`, `origin_name`, `file_name`, `url`, `path`, `hash`, `content_type`, `size`, `create_user_id`, `create_time`, `status`) VALUES (3, '889ff067jw1dvcljidmquj_看图王.jpg', '889ff067jw1dvcljidmquj_看图王.jpg', 'http://yxboot.boyait.org/images/20231214/889ff067jw1dvcljidmquj_看图王.jpg', '20231214/889ff067jw1dvcljidmquj_看图王.jpg', '1f335b964590f16b199d134056120fd8', 'image/jpeg', 197000, NULL, NULL, NULL);
INSERT INTO `sys_file` (`file_id`, `origin_name`, `file_name`, `url`, `path`, `hash`, `content_type`, `size`, `create_user_id`, `create_time`, `status`) VALUES (7, 'logo1.png', 'logo1.png', 'http://yxboot.boyait.org/images/20231214/logo1.png', '20231214/logo1.png', '750dc69f60ecd82b7b7f1d87665c99ee', 'image/png', 165531, NULL, NULL, NULL);
INSERT INTO `sys_file` (`file_id`, `origin_name`, `file_name`, `url`, `path`, `hash`, `content_type`, `size`, `create_user_id`, `create_time`, `status`) VALUES (8, '931d9fa7-8d17-4347-81cc-82ed51fe2d97.webp', '931d9fa7-8d17-4347-81cc-82ed51fe2d97.webp', 'http://admin.yxboot.com/images/20240322/931d9fa7-8d17-4347-81cc-82ed51fe2d97.webp', '20240322/931d9fa7-8d17-4347-81cc-82ed51fe2d97.webp', 'c601f6720e80a25fbdfcb22ef6273402', 'image/webp', 423224, NULL, NULL, NULL);
COMMIT;

-- ----------------------------
-- Table structure for sys_log
-- ----------------------------
DROP TABLE IF EXISTS `sys_log`;
CREATE TABLE `sys_log` (
  `id` bigint(20) NOT NULL AUTO_INCREMENT COMMENT '编号',
  `username` varchar(255) DEFAULT NULL COMMENT '用户',
  `type` varchar(20) DEFAULT NULL COMMENT '日志类别',
  `operation` varchar(255) DEFAULT NULL COMMENT '记录信息',
  `method` varchar(255) DEFAULT NULL COMMENT '包',
  `params` text COMMENT '参数',
  `ip` varchar(255) DEFAULT NULL COMMENT 'ip',
  `create_time` datetime DEFAULT NULL COMMENT '创建时间',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8mb4 COMMENT='日志表';

-- ----------------------------
-- Records of sys_log
-- ----------------------------
BEGIN;
INSERT INTO `sys_log` (`id`, `username`, `type`, `operation`, `method`, `params`, `ip`, `create_time`) VALUES (1, 'admin', 'operate', '保存角色信息', 'com.yxboot.modules.sys.controller.SysRoleController.save', '{sysRole=SysRole(roleId=1, name=管理员, code=null, descn=系统管理员, dataType=null, sort=null, createUserId=null, createTime=null, updateUserId=null, updateTime=null, status=NORMAL, menus=[SysMenu(menuId=123, name=null, descn=null, code=null, type=null, icon=null, path=null, component=null, parentId=null, display=null, sort=null, createUserId=null, createTime=null, updateUserId=null, updateTime=null, status=null, children=null, parentName=null), SysMenu(menuId=111, name=null, descn=null, code=null, type=null, icon=null, path=null, component=null, parentId=null, display=null, sort=null, createUserId=null, createTime=null, updateUserId=null, updateTime=null, status=null, children=null, parentName=null), SysMenu(menuId=104, name=null, descn=null, code=null, type=null, icon=null, path=null, component=null, parentId=null, display=null, sort=null, createUserId=null, createTime=null, updateUserId=null, updateTime=null, status=null, children=null, parentName=null), SysMenu(menuId=77, name=null, descn=null, code=null, type=null, icon=null, path=null, component=null, parentId=null, display=null, sort=null, createUserId=null, createTime=null, updateUserId=null, updateTime=null, status=null, children=null, parentName=null), SysMenu(menuId=127, name=null, descn=null, code=null, type=null, icon=null, path=null, component=null, parentId=null, display=null, sort=null, createUserId=null, createTime=null, updateUserId=null, updateTime=null, status=null, children=null, parentName=null), SysMenu(menuId=115, name=null, descn=null, code=null, type=null, icon=null, path=null, component=null, parentId=null, display=null, sort=null, createUserId=null, createTime=null, updateUserId=null, updateTime=null, status=null, children=null, parentName=null), SysMenu(menuId=108, name=null, descn=null, code=null, type=null, icon=null, path=null, component=null, parentId=null, display=null, sort=null, createUserId=null, createTime=null, updateUserId=null, updateTime=null, status=null, children=null, parentName=null), SysMenu(menuId=81, name=null, descn=null, code=null, type=null, icon=null, path=null, component=null, parentId=null, display=null, sort=null, createUserId=null, createTime=null, updateUserId=null, updateTime=null, status=null, children=null, parentName=null), SysMenu(menuId=124, name=null, descn=null, code=null, type=null, icon=null, path=null, component=null, parentId=null, display=null, sort=null, createUserId=null, createTime=null, updateUserId=null, updateTime=null, status=null, children=null, parentName=null), SysMenu(menuId=112, name=null, descn=null, code=null, type=null, icon=null, path=null, component=null, parentId=null, display=null, sort=null, createUserId=null, createTime=null, updateUserId=null, updateTime=null, status=null, children=null, parentName=null), SysMenu(menuId=105, name=null, descn=null, code=null, type=null, icon=null, path=null, component=null, parentId=null, display=null, sort=null, createUserId=null, createTime=null, updateUserId=null, updateTime=null, status=null, children=null, parentName=null), SysMenu(menuId=78, name=null, descn=null, code=null, type=null, icon=null, path=null, component=null, parentId=null, display=null, sort=null, createUserId=null, createTime=null, updateUserId=null, updateTime=null, status=null, children=null, parentName=null), SysMenu(menuId=128, name=null, descn=null, code=null, type=null, icon=null, path=null, component=null, parentId=null, display=null, sort=null, createUserId=null, createTime=null, updateUserId=null, updateTime=null, status=null, children=null, parentName=null), SysMenu(menuId=116, name=null, descn=null, code=null, type=null, icon=null, path=null, component=null, parentId=null, display=null, sort=null, createUserId=null, createTime=null, updateUserId=null, updateTime=null, status=null, children=null, parentName=null), SysMenu(menuId=109, name=null, descn=null, code=null, type=null, icon=null, path=null, component=null, parentId=null, display=null, sort=null, createUserId=null, createTime=null, updateUserId=null, updateTime=null, status=null, children=null, parentName=null), SysMenu(menuId=82, name=null, descn=null, code=null, type=null, icon=null, path=null, component=null, parentId=null, display=null, sort=null, createUserId=null, createTime=null, updateUserId=null, updateTime=null, status=null, children=null, parentName=null), SysMenu(menuId=125, name=null, descn=null, code=null, type=null, icon=null, path=null, component=null, parentId=null, display=null, sort=null, createUserId=null, createTime=null, updateUserId=null, updateTime=null, status=null, children=null, parentName=null), SysMenu(menuId=113, name=null, descn=null, code=null, type=null, icon=null, path=null, component=null, parentId=null, display=null, sort=null, createUserId=null, createTime=null, updateUserId=null, updateTime=null, status=null, children=null, parentName=null), SysMenu(menuId=106, name=null, descn=null, code=null, type=null, icon=null, path=null, component=null, parentId=null, display=null, sort=null, createUserId=null, createTime=null, updateUserId=null, updateTime=null, status=null, children=null, parentName=null), SysMenu(menuId=79, name=null, descn=null, code=null, type=null, icon=null, path=null, component=null, parentId=null, display=null, sort=null, createUserId=null, createTime=null, updateUserId=null, updateTime=null, status=null, children=null, parentName=null), SysMenu(menuId=110, name=null, descn=null, code=null, type=null, icon=null, path=null, component=null, parentId=null, display=null, sort=null, createUserId=null, createTime=null, updateUserId=null, updateTime=null, status=null, children=null, parentName=null), SysMenu(menuId=83, name=null, descn=null, code=null, type=null, icon=null, path=null, component=null, parentId=null, display=null, sort=null, createUserId=null, createTime=null, updateUserId=null, updateTime=null, status=null, children=null, parentName=null), SysMenu(menuId=114, name=null, descn=null, code=null, type=null, icon=null, path=null, component=null, parentId=null, display=null, sort=null, createUserId=null, createTime=null, updateUserId=null, updateTime=null, status=null, children=null, parentName=null), SysMenu(menuId=107, name=null, descn=null, code=null, type=null, icon=null, path=null, component=null, parentId=null, display=null, sort=null, createUserId=null, createTime=null, updateUserId=null, updateTime=null, status=null, children=null, parentName=null), SysMenu(menuId=80, name=null, descn=null, code=null, type=null, icon=null, path=null, component=null, parentId=null, display=null, sort=null, createUserId=null, createTime=null, updateUserId=null, updateTime=null, status=null, children=null, parentName=null), SysMenu(menuId=65, name=null, descn=null, code=null, type=null, icon=null, path=null, component=null, parentId=null, display=null, sort=null, createUserId=null, createTime=null, updateUserId=null, updateTime=null, status=null, children=null, parentName=null), SysMenu(menuId=4, name=null, descn=null, code=null, type=null, icon=null, path=null, component=null, parentId=null, display=null, sort=null, createUserId=null, createTime=null, updateUserId=null, updateTime=null, status=null, children=null, parentName=null), SysMenu(menuId=44, name=null, descn=null, code=null, type=null, icon=null, path=null, component=null, parentId=null, display=null, sort=null, createUserId=null, createTime=null, updateUserId=null, updateTime=null, status=null, children=null, parentName=null), SysMenu(menuId=2, name=null, descn=null, code=null, type=null, icon=null, path=null, component=null, parentId=null, display=null, sort=null, createUserId=null, createTime=null, updateUserId=null, updateTime=null, status=null, children=null, parentName=null), SysMenu(menuId=3, name=null, descn=null, code=null, type=null, icon=null, path=null, component=null, parentId=null, display=null, sort=null, createUserId=null, createTime=null, updateUserId=null, updateTime=null, status=null, children=null, parentName=null), SysMenu(menuId=5, name=null, descn=null, code=null, type=null, icon=null, path=null, component=null, parentId=null, display=null, sort=null, createUserId=null, createTime=null, updateUserId=null, updateTime=null, status=null, children=null, parentName=null), SysMenu(menuId=126, name=null, descn=null, code=null, type=null, icon=null, path=null, component=null, parentId=null, display=null, sort=null, createUserId=null, createTime=null, updateUserId=null, updateTime=null, status=null, children=null, parentName=null), SysMenu(menuId=122, name=null, descn=null, code=null, type=null, icon=null, path=null, component=null, parentId=null, display=null, sort=null, createUserId=null, createTime=null, updateUserId=null, updateTime=null, status=null, children=null, parentName=null), SysMenu(menuId=1, name=null, descn=null, code=null, type=null, icon=null, path=null, component=null, parentId=null, display=null, sort=null, createUserId=null, createTime=null, updateUserId=null, updateTime=null, status=null, children=null, parentName=null), SysMenu(menuId=64, name=null, descn=null, code=null, type=null, icon=null, path=null, component=null, parentId=null, display=null, sort=null, createUserId=null, createTime=null, updateUserId=null, updateTime=null, status=null, children=null, parentName=null)])}', '0:0:0:0:0:0:0:1', '2025-10-01 16:28:15');
INSERT INTO `sys_log` (`id`, `username`, `type`, `operation`, `method`, `params`, `ip`, `create_time`) VALUES (2, 'admin', 'operate', '保存角色信息', 'com.yxboot.modules.sys.controller.SysRoleController.save', '{sysRole=SysRole(roleId=1, name=管理员, code=null, descn=系统管理员, dataType=null, sort=null, createUserId=null, createTime=null, updateUserId=null, updateTime=null, status=NORMAL, menus=[SysMenu(menuId=123, name=null, descn=null, code=null, type=null, icon=null, path=null, component=null, parentId=null, display=null, sort=null, createUserId=null, createTime=null, updateUserId=null, updateTime=null, status=null, children=null, parentName=null), SysMenu(menuId=111, name=null, descn=null, code=null, type=null, icon=null, path=null, component=null, parentId=null, display=null, sort=null, createUserId=null, createTime=null, updateUserId=null, updateTime=null, status=null, children=null, parentName=null), SysMenu(menuId=104, name=null, descn=null, code=null, type=null, icon=null, path=null, component=null, parentId=null, display=null, sort=null, createUserId=null, createTime=null, updateUserId=null, updateTime=null, status=null, children=null, parentName=null), SysMenu(menuId=77, name=null, descn=null, code=null, type=null, icon=null, path=null, component=null, parentId=null, display=null, sort=null, createUserId=null, createTime=null, updateUserId=null, updateTime=null, status=null, children=null, parentName=null), SysMenu(menuId=127, name=null, descn=null, code=null, type=null, icon=null, path=null, component=null, parentId=null, display=null, sort=null, createUserId=null, createTime=null, updateUserId=null, updateTime=null, status=null, children=null, parentName=null), SysMenu(menuId=115, name=null, descn=null, code=null, type=null, icon=null, path=null, component=null, parentId=null, display=null, sort=null, createUserId=null, createTime=null, updateUserId=null, updateTime=null, status=null, children=null, parentName=null), SysMenu(menuId=108, name=null, descn=null, code=null, type=null, icon=null, path=null, component=null, parentId=null, display=null, sort=null, createUserId=null, createTime=null, updateUserId=null, updateTime=null, status=null, children=null, parentName=null), SysMenu(menuId=81, name=null, descn=null, code=null, type=null, icon=null, path=null, component=null, parentId=null, display=null, sort=null, createUserId=null, createTime=null, updateUserId=null, updateTime=null, status=null, children=null, parentName=null), SysMenu(menuId=124, name=null, descn=null, code=null, type=null, icon=null, path=null, component=null, parentId=null, display=null, sort=null, createUserId=null, createTime=null, updateUserId=null, updateTime=null, status=null, children=null, parentName=null), SysMenu(menuId=112, name=null, descn=null, code=null, type=null, icon=null, path=null, component=null, parentId=null, display=null, sort=null, createUserId=null, createTime=null, updateUserId=null, updateTime=null, status=null, children=null, parentName=null), SysMenu(menuId=105, name=null, descn=null, code=null, type=null, icon=null, path=null, component=null, parentId=null, display=null, sort=null, createUserId=null, createTime=null, updateUserId=null, updateTime=null, status=null, children=null, parentName=null), SysMenu(menuId=78, name=null, descn=null, code=null, type=null, icon=null, path=null, component=null, parentId=null, display=null, sort=null, createUserId=null, createTime=null, updateUserId=null, updateTime=null, status=null, children=null, parentName=null), SysMenu(menuId=128, name=null, descn=null, code=null, type=null, icon=null, path=null, component=null, parentId=null, display=null, sort=null, createUserId=null, createTime=null, updateUserId=null, updateTime=null, status=null, children=null, parentName=null), SysMenu(menuId=116, name=null, descn=null, code=null, type=null, icon=null, path=null, component=null, parentId=null, display=null, sort=null, createUserId=null, createTime=null, updateUserId=null, updateTime=null, status=null, children=null, parentName=null), SysMenu(menuId=109, name=null, descn=null, code=null, type=null, icon=null, path=null, component=null, parentId=null, display=null, sort=null, createUserId=null, createTime=null, updateUserId=null, updateTime=null, status=null, children=null, parentName=null), SysMenu(menuId=82, name=null, descn=null, code=null, type=null, icon=null, path=null, component=null, parentId=null, display=null, sort=null, createUserId=null, createTime=null, updateUserId=null, updateTime=null, status=null, children=null, parentName=null), SysMenu(menuId=125, name=null, descn=null, code=null, type=null, icon=null, path=null, component=null, parentId=null, display=null, sort=null, createUserId=null, createTime=null, updateUserId=null, updateTime=null, status=null, children=null, parentName=null), SysMenu(menuId=113, name=null, descn=null, code=null, type=null, icon=null, path=null, component=null, parentId=null, display=null, sort=null, createUserId=null, createTime=null, updateUserId=null, updateTime=null, status=null, children=null, parentName=null), SysMenu(menuId=106, name=null, descn=null, code=null, type=null, icon=null, path=null, component=null, parentId=null, display=null, sort=null, createUserId=null, createTime=null, updateUserId=null, updateTime=null, status=null, children=null, parentName=null), SysMenu(menuId=79, name=null, descn=null, code=null, type=null, icon=null, path=null, component=null, parentId=null, display=null, sort=null, createUserId=null, createTime=null, updateUserId=null, updateTime=null, status=null, children=null, parentName=null), SysMenu(menuId=110, name=null, descn=null, code=null, type=null, icon=null, path=null, component=null, parentId=null, display=null, sort=null, createUserId=null, createTime=null, updateUserId=null, updateTime=null, status=null, children=null, parentName=null), SysMenu(menuId=83, name=null, descn=null, code=null, type=null, icon=null, path=null, component=null, parentId=null, display=null, sort=null, createUserId=null, createTime=null, updateUserId=null, updateTime=null, status=null, children=null, parentName=null), SysMenu(menuId=114, name=null, descn=null, code=null, type=null, icon=null, path=null, component=null, parentId=null, display=null, sort=null, createUserId=null, createTime=null, updateUserId=null, updateTime=null, status=null, children=null, parentName=null), SysMenu(menuId=107, name=null, descn=null, code=null, type=null, icon=null, path=null, component=null, parentId=null, display=null, sort=null, createUserId=null, createTime=null, updateUserId=null, updateTime=null, status=null, children=null, parentName=null), SysMenu(menuId=80, name=null, descn=null, code=null, type=null, icon=null, path=null, component=null, parentId=null, display=null, sort=null, createUserId=null, createTime=null, updateUserId=null, updateTime=null, status=null, children=null, parentName=null), SysMenu(menuId=65, name=null, descn=null, code=null, type=null, icon=null, path=null, component=null, parentId=null, display=null, sort=null, createUserId=null, createTime=null, updateUserId=null, updateTime=null, status=null, children=null, parentName=null), SysMenu(menuId=4, name=null, descn=null, code=null, type=null, icon=null, path=null, component=null, parentId=null, display=null, sort=null, createUserId=null, createTime=null, updateUserId=null, updateTime=null, status=null, children=null, parentName=null), SysMenu(menuId=44, name=null, descn=null, code=null, type=null, icon=null, path=null, component=null, parentId=null, display=null, sort=null, createUserId=null, createTime=null, updateUserId=null, updateTime=null, status=null, children=null, parentName=null), SysMenu(menuId=2, name=null, descn=null, code=null, type=null, icon=null, path=null, component=null, parentId=null, display=null, sort=null, createUserId=null, createTime=null, updateUserId=null, updateTime=null, status=null, children=null, parentName=null), SysMenu(menuId=3, name=null, descn=null, code=null, type=null, icon=null, path=null, component=null, parentId=null, display=null, sort=null, createUserId=null, createTime=null, updateUserId=null, updateTime=null, status=null, children=null, parentName=null), SysMenu(menuId=5, name=null, descn=null, code=null, type=null, icon=null, path=null, component=null, parentId=null, display=null, sort=null, createUserId=null, createTime=null, updateUserId=null, updateTime=null, status=null, children=null, parentName=null), SysMenu(menuId=126, name=null, descn=null, code=null, type=null, icon=null, path=null, component=null, parentId=null, display=null, sort=null, createUserId=null, createTime=null, updateUserId=null, updateTime=null, status=null, children=null, parentName=null), SysMenu(menuId=122, name=null, descn=null, code=null, type=null, icon=null, path=null, component=null, parentId=null, display=null, sort=null, createUserId=null, createTime=null, updateUserId=null, updateTime=null, status=null, children=null, parentName=null), SysMenu(menuId=1, name=null, descn=null, code=null, type=null, icon=null, path=null, component=null, parentId=null, display=null, sort=null, createUserId=null, createTime=null, updateUserId=null, updateTime=null, status=null, children=null, parentName=null), SysMenu(menuId=64, name=null, descn=null, code=null, type=null, icon=null, path=null, component=null, parentId=null, display=null, sort=null, createUserId=null, createTime=null, updateUserId=null, updateTime=null, status=null, children=null, parentName=null)])}', '0:0:0:0:0:0:0:1', '2025-10-01 16:30:27');
INSERT INTO `sys_log` (`id`, `username`, `type`, `operation`, `method`, `params`, `ip`, `create_time`) VALUES (3, 'admin', 'operate', '保存角色信息', 'com.yxboot.modules.sys.controller.SysRoleController.save', '{sysRole=SysRole(roleId=2, name=开发人员, code=null, descn=开发人员, dataType=null, sort=null, createUserId=null, createTime=null, updateUserId=null, updateTime=null, status=NORMAL, menus=[SysMenu(menuId=126, name=null, descn=null, code=null, type=null, icon=null, path=null, component=null, parentId=null, display=null, sort=null, createUserId=null, createTime=null, updateUserId=null, updateTime=null, status=null, children=null, parentName=null), SysMenu(menuId=127, name=null, descn=null, code=null, type=null, icon=null, path=null, component=null, parentId=null, display=null, sort=null, createUserId=null, createTime=null, updateUserId=null, updateTime=null, status=null, children=null, parentName=null), SysMenu(menuId=128, name=null, descn=null, code=null, type=null, icon=null, path=null, component=null, parentId=null, display=null, sort=null, createUserId=null, createTime=null, updateUserId=null, updateTime=null, status=null, children=null, parentName=null), SysMenu(menuId=122, name=null, descn=null, code=null, type=null, icon=null, path=null, component=null, parentId=null, display=null, sort=null, createUserId=null, createTime=null, updateUserId=null, updateTime=null, status=null, children=null, parentName=null), SysMenu(menuId=123, name=null, descn=null, code=null, type=null, icon=null, path=null, component=null, parentId=null, display=null, sort=null, createUserId=null, createTime=null, updateUserId=null, updateTime=null, status=null, children=null, parentName=null), SysMenu(menuId=124, name=null, descn=null, code=null, type=null, icon=null, path=null, component=null, parentId=null, display=null, sort=null, createUserId=null, createTime=null, updateUserId=null, updateTime=null, status=null, children=null, parentName=null), SysMenu(menuId=125, name=null, descn=null, code=null, type=null, icon=null, path=null, component=null, parentId=null, display=null, sort=null, createUserId=null, createTime=null, updateUserId=null, updateTime=null, status=null, children=null, parentName=null), SysMenu(menuId=1, name=null, descn=null, code=null, type=null, icon=null, path=null, component=null, parentId=null, display=null, sort=null, createUserId=null, createTime=null, updateUserId=null, updateTime=null, status=null, children=null, parentName=null), SysMenu(menuId=4, name=null, descn=null, code=null, type=null, icon=null, path=null, component=null, parentId=null, display=null, sort=null, createUserId=null, createTime=null, updateUserId=null, updateTime=null, status=null, children=null, parentName=null), SysMenu(menuId=44, name=null, descn=null, code=null, type=null, icon=null, path=null, component=null, parentId=null, display=null, sort=null, createUserId=null, createTime=null, updateUserId=null, updateTime=null, status=null, children=null, parentName=null), SysMenu(menuId=2, name=null, descn=null, code=null, type=null, icon=null, path=null, component=null, parentId=null, display=null, sort=null, createUserId=null, createTime=null, updateUserId=null, updateTime=null, status=null, children=null, parentName=null), SysMenu(menuId=3, name=null, descn=null, code=null, type=null, icon=null, path=null, component=null, parentId=null, display=null, sort=null, createUserId=null, createTime=null, updateUserId=null, updateTime=null, status=null, children=null, parentName=null), SysMenu(menuId=5, name=null, descn=null, code=null, type=null, icon=null, path=null, component=null, parentId=null, display=null, sort=null, createUserId=null, createTime=null, updateUserId=null, updateTime=null, status=null, children=null, parentName=null), SysMenu(menuId=104, name=null, descn=null, code=null, type=null, icon=null, path=null, component=null, parentId=null, display=null, sort=null, createUserId=null, createTime=null, updateUserId=null, updateTime=null, status=null, children=null, parentName=null), SysMenu(menuId=105, name=null, descn=null, code=null, type=null, icon=null, path=null, component=null, parentId=null, display=null, sort=null, createUserId=null, createTime=null, updateUserId=null, updateTime=null, status=null, children=null, parentName=null), SysMenu(menuId=106, name=null, descn=null, code=null, type=null, icon=null, path=null, component=null, parentId=null, display=null, sort=null, createUserId=null, createTime=null, updateUserId=null, updateTime=null, status=null, children=null, parentName=null), SysMenu(menuId=107, name=null, descn=null, code=null, type=null, icon=null, path=null, component=null, parentId=null, display=null, sort=null, createUserId=null, createTime=null, updateUserId=null, updateTime=null, status=null, children=null, parentName=null), SysMenu(menuId=108, name=null, descn=null, code=null, type=null, icon=null, path=null, component=null, parentId=null, display=null, sort=null, createUserId=null, createTime=null, updateUserId=null, updateTime=null, status=null, children=null, parentName=null), SysMenu(menuId=109, name=null, descn=null, code=null, type=null, icon=null, path=null, component=null, parentId=null, display=null, sort=null, createUserId=null, createTime=null, updateUserId=null, updateTime=null, status=null, children=null, parentName=null), SysMenu(menuId=78, name=null, descn=null, code=null, type=null, icon=null, path=null, component=null, parentId=null, display=null, sort=null, createUserId=null, createTime=null, updateUserId=null, updateTime=null, status=null, children=null, parentName=null), SysMenu(menuId=79, name=null, descn=null, code=null, type=null, icon=null, path=null, component=null, parentId=null, display=null, sort=null, createUserId=null, createTime=null, updateUserId=null, updateTime=null, status=null, children=null, parentName=null), SysMenu(menuId=80, name=null, descn=null, code=null, type=null, icon=null, path=null, component=null, parentId=null, display=null, sort=null, createUserId=null, createTime=null, updateUserId=null, updateTime=null, status=null, children=null, parentName=null), SysMenu(menuId=81, name=null, descn=null, code=null, type=null, icon=null, path=null, component=null, parentId=null, display=null, sort=null, createUserId=null, createTime=null, updateUserId=null, updateTime=null, status=null, children=null, parentName=null), SysMenu(menuId=110, name=null, descn=null, code=null, type=null, icon=null, path=null, component=null, parentId=null, display=null, sort=null, createUserId=null, createTime=null, updateUserId=null, updateTime=null, status=null, children=null, parentName=null), SysMenu(menuId=111, name=null, descn=null, code=null, type=null, icon=null, path=null, component=null, parentId=null, display=null, sort=null, createUserId=null, createTime=null, updateUserId=null, updateTime=null, status=null, children=null, parentName=null), SysMenu(menuId=112, name=null, descn=null, code=null, type=null, icon=null, path=null, component=null, parentId=null, display=null, sort=null, createUserId=null, createTime=null, updateUserId=null, updateTime=null, status=null, children=null, parentName=null), SysMenu(menuId=113, name=null, descn=null, code=null, type=null, icon=null, path=null, component=null, parentId=null, display=null, sort=null, createUserId=null, createTime=null, updateUserId=null, updateTime=null, status=null, children=null, parentName=null), SysMenu(menuId=114, name=null, descn=null, code=null, type=null, icon=null, path=null, component=null, parentId=null, display=null, sort=null, createUserId=null, createTime=null, updateUserId=null, updateTime=null, status=null, children=null, parentName=null), SysMenu(menuId=115, name=null, descn=null, code=null, type=null, icon=null, path=null, component=null, parentId=null, display=null, sort=null, createUserId=null, createTime=null, updateUserId=null, updateTime=null, status=null, children=null, parentName=null), SysMenu(menuId=116, name=null, descn=null, code=null, type=null, icon=null, path=null, component=null, parentId=null, display=null, sort=null, createUserId=null, createTime=null, updateUserId=null, updateTime=null, status=null, children=null, parentName=null), SysMenu(menuId=77, name=null, descn=null, code=null, type=null, icon=null, path=null, component=null, parentId=null, display=null, sort=null, createUserId=null, createTime=null, updateUserId=null, updateTime=null, status=null, children=null, parentName=null), SysMenu(menuId=82, name=null, descn=null, code=null, type=null, icon=null, path=null, component=null, parentId=null, display=null, sort=null, createUserId=null, createTime=null, updateUserId=null, updateTime=null, status=null, children=null, parentName=null), SysMenu(menuId=83, name=null, descn=null, code=null, type=null, icon=null, path=null, component=null, parentId=null, display=null, sort=null, createUserId=null, createTime=null, updateUserId=null, updateTime=null, status=null, children=null, parentName=null), SysMenu(menuId=64, name=null, descn=null, code=null, type=null, icon=null, path=null, component=null, parentId=null, display=null, sort=null, createUserId=null, createTime=null, updateUserId=null, updateTime=null, status=null, children=null, parentName=null), SysMenu(menuId=65, name=null, descn=null, code=null, type=null, icon=null, path=null, component=null, parentId=null, display=null, sort=null, createUserId=null, createTime=null, updateUserId=null, updateTime=null, status=null, children=null, parentName=null)])}', '0:0:0:0:0:0:0:1', '2025-10-01 16:30:46');
COMMIT;

-- ----------------------------
-- Table structure for sys_menu
-- ----------------------------
DROP TABLE IF EXISTS `sys_menu`;
CREATE TABLE `sys_menu` (
  `menu_id` bigint(20) NOT NULL AUTO_INCREMENT COMMENT '菜单编号',
  `name` varchar(50) DEFAULT NULL COMMENT '菜单名称',
  `descn` varchar(200) DEFAULT NULL COMMENT '菜单说明',
  `code` varchar(50) DEFAULT NULL COMMENT '菜单编码',
  `type` varchar(20) DEFAULT NULL COMMENT '菜单类型',
  `icon` varchar(50) DEFAULT NULL COMMENT '图标',
  `path` varchar(100) DEFAULT NULL COMMENT '菜单路径',
  `component` varchar(100) DEFAULT NULL COMMENT '组件',
  `parent_id` bigint(20) DEFAULT NULL COMMENT '上级菜单',
  `display` int(11) DEFAULT NULL COMMENT '是否显示',
  `sort` int(11) DEFAULT NULL COMMENT '排序',
  `create_user_id` bigint(20) DEFAULT NULL COMMENT '创建人',
  `create_time` datetime DEFAULT NULL COMMENT '创建时间',
  `update_user_id` bigint(20) DEFAULT NULL COMMENT '更新人',
  `update_time` datetime DEFAULT NULL COMMENT '更新时间',
  `status` varchar(20) DEFAULT NULL COMMENT '状态',
  PRIMARY KEY (`menu_id`)
) ENGINE=InnoDB AUTO_INCREMENT=131 DEFAULT CHARSET=utf8mb4 COMMENT='菜单表';

-- ----------------------------
-- Records of sys_menu
-- ----------------------------
BEGIN;
INSERT INTO `sys_menu` (`menu_id`, `name`, `descn`, `code`, `type`, `icon`, `path`, `component`, `parent_id`, `display`, `sort`, `create_user_id`, `create_time`, `update_user_id`, `update_time`, `status`) VALUES (1, '系统管理', NULL, NULL, 'menu', 'ant-design:setting-outlined', '/sys', 'LAYOUT', NULL, 1, 15, NULL, NULL, NULL, NULL, 'normal');
INSERT INTO `sys_menu` (`menu_id`, `name`, `descn`, `code`, `type`, `icon`, `path`, `component`, `parent_id`, `display`, `sort`, `create_user_id`, `create_time`, `update_user_id`, `update_time`, `status`) VALUES (2, '系统菜单管理', NULL, NULL, 'menu', 'ant-design:menu-outlined', '/sys/menu', '/sys/menu/menu.vue', 1, 1, 4, NULL, NULL, NULL, NULL, 'normal');
INSERT INTO `sys_menu` (`menu_id`, `name`, `descn`, `code`, `type`, `icon`, `path`, `component`, `parent_id`, `display`, `sort`, `create_user_id`, `create_time`, `update_user_id`, `update_time`, `status`) VALUES (3, '系统角色管理', NULL, NULL, 'menu', 'ant-design:smile-outlined', '/sys/role', '/sys/role/role.vue', 1, 1, 5, NULL, NULL, NULL, NULL, 'normal');
INSERT INTO `sys_menu` (`menu_id`, `name`, `descn`, `code`, `type`, `icon`, `path`, `component`, `parent_id`, `display`, `sort`, `create_user_id`, `create_time`, `update_user_id`, `update_time`, `status`) VALUES (4, '系统用户管理', NULL, NULL, 'menu', 'ant-design:team-outlined', '/sys/user', '/sys/user/user.vue', 1, 1, 1, NULL, NULL, NULL, NULL, 'normal');
INSERT INTO `sys_menu` (`menu_id`, `name`, `descn`, `code`, `type`, `icon`, `path`, `component`, `parent_id`, `display`, `sort`, `create_user_id`, `create_time`, `update_user_id`, `update_time`, `status`) VALUES (5, '字典管理', NULL, NULL, 'menu', 'ant-design:read-outlined', '/sys/dict', '/sys/dict/dict.vue', 1, 1, 6, NULL, NULL, NULL, NULL, 'normal');
INSERT INTO `sys_menu` (`menu_id`, `name`, `descn`, `code`, `type`, `icon`, `path`, `component`, `parent_id`, `display`, `sort`, `create_user_id`, `create_time`, `update_user_id`, `update_time`, `status`) VALUES (44, '系统部门管理', '', NULL, 'menu', 'ant-design:apartment-outlined', '/sys/dept', '/sys/dept/dept.vue', 1, 1, 2, NULL, NULL, NULL, NULL, 'normal');
INSERT INTO `sys_menu` (`menu_id`, `name`, `descn`, `code`, `type`, `icon`, `path`, `component`, `parent_id`, `display`, `sort`, `create_user_id`, `create_time`, `update_user_id`, `update_time`, `status`) VALUES (64, '开发工具', NULL, NULL, 'menu', 'ant-design:tool-outlined', '/dev', 'LAYOUT', NULL, 1, 20, NULL, NULL, NULL, NULL, 'normal');
INSERT INTO `sys_menu` (`menu_id`, `name`, `descn`, `code`, `type`, `icon`, `path`, `component`, `parent_id`, `display`, `sort`, `create_user_id`, `create_time`, `update_user_id`, `update_time`, `status`) VALUES (65, '接口文档', NULL, NULL, 'menu', 'ant-design:file-protect-outlined', 'http://admin.yxboot.com:9000/doc.html', '/dev', 64, 1, 1, NULL, NULL, NULL, NULL, 'normal');
INSERT INTO `sys_menu` (`menu_id`, `name`, `descn`, `code`, `type`, `icon`, `path`, `component`, `parent_id`, `display`, `sort`, `create_user_id`, `create_time`, `update_user_id`, `update_time`, `status`) VALUES (77, '新增部门', NULL, 'sysDept:create', 'button', NULL, NULL, NULL, 44, 1, NULL, NULL, NULL, NULL, NULL, 'normal');
INSERT INTO `sys_menu` (`menu_id`, `name`, `descn`, `code`, `type`, `icon`, `path`, `component`, `parent_id`, `display`, `sort`, `create_user_id`, `create_time`, `update_user_id`, `update_time`, `status`) VALUES (78, '新增用户', NULL, 'user:create', 'button', NULL, NULL, NULL, 4, 1, NULL, NULL, NULL, NULL, NULL, 'normal');
INSERT INTO `sys_menu` (`menu_id`, `name`, `descn`, `code`, `type`, `icon`, `path`, `component`, `parent_id`, `display`, `sort`, `create_user_id`, `create_time`, `update_user_id`, `update_time`, `status`) VALUES (79, '编辑用户', '', 'user:edit', 'button', '', NULL, NULL, 4, 1, NULL, NULL, NULL, NULL, NULL, 'normal');
INSERT INTO `sys_menu` (`menu_id`, `name`, `descn`, `code`, `type`, `icon`, `path`, `component`, `parent_id`, `display`, `sort`, `create_user_id`, `create_time`, `update_user_id`, `update_time`, `status`) VALUES (80, '删除用户', '', 'user:remove', 'button', '', NULL, NULL, 4, 1, NULL, NULL, NULL, NULL, NULL, 'normal');
INSERT INTO `sys_menu` (`menu_id`, `name`, `descn`, `code`, `type`, `icon`, `path`, `component`, `parent_id`, `display`, `sort`, `create_user_id`, `create_time`, `update_user_id`, `update_time`, `status`) VALUES (81, '重置密码', NULL, 'user:resetPassword', 'button', NULL, NULL, NULL, 4, 1, NULL, NULL, NULL, NULL, NULL, 'normal');
INSERT INTO `sys_menu` (`menu_id`, `name`, `descn`, `code`, `type`, `icon`, `path`, `component`, `parent_id`, `display`, `sort`, `create_user_id`, `create_time`, `update_user_id`, `update_time`, `status`) VALUES (82, '编辑部门', '', 'sysDept:edit', 'button', '', NULL, NULL, 44, 1, NULL, NULL, NULL, NULL, NULL, 'normal');
INSERT INTO `sys_menu` (`menu_id`, `name`, `descn`, `code`, `type`, `icon`, `path`, `component`, `parent_id`, `display`, `sort`, `create_user_id`, `create_time`, `update_user_id`, `update_time`, `status`) VALUES (83, '删除部门', '', 'sysDept:remove', 'button', '', NULL, NULL, 44, 1, NULL, NULL, NULL, NULL, NULL, 'normal');
INSERT INTO `sys_menu` (`menu_id`, `name`, `descn`, `code`, `type`, `icon`, `path`, `component`, `parent_id`, `display`, `sort`, `create_user_id`, `create_time`, `update_user_id`, `update_time`, `status`) VALUES (104, '新增菜单', '', 'sysMenu:create', 'button', '', NULL, NULL, 2, 1, NULL, NULL, NULL, NULL, NULL, 'normal');
INSERT INTO `sys_menu` (`menu_id`, `name`, `descn`, `code`, `type`, `icon`, `path`, `component`, `parent_id`, `display`, `sort`, `create_user_id`, `create_time`, `update_user_id`, `update_time`, `status`) VALUES (105, '编辑菜单', '', 'sysMenu:edit', 'button', '', NULL, NULL, 2, 1, NULL, NULL, NULL, NULL, NULL, 'normal');
INSERT INTO `sys_menu` (`menu_id`, `name`, `descn`, `code`, `type`, `icon`, `path`, `component`, `parent_id`, `display`, `sort`, `create_user_id`, `create_time`, `update_user_id`, `update_time`, `status`) VALUES (106, '删除菜单', '', 'sysMenu:remove', 'button', '', NULL, NULL, 2, 1, NULL, NULL, NULL, NULL, NULL, 'normal');
INSERT INTO `sys_menu` (`menu_id`, `name`, `descn`, `code`, `type`, `icon`, `path`, `component`, `parent_id`, `display`, `sort`, `create_user_id`, `create_time`, `update_user_id`, `update_time`, `status`) VALUES (107, '新增角色', '', 'sysRole:create', 'button', '', NULL, NULL, 3, 1, NULL, NULL, NULL, NULL, NULL, 'normal');
INSERT INTO `sys_menu` (`menu_id`, `name`, `descn`, `code`, `type`, `icon`, `path`, `component`, `parent_id`, `display`, `sort`, `create_user_id`, `create_time`, `update_user_id`, `update_time`, `status`) VALUES (108, '编辑角色', '', 'sysRole:edit', 'button', '', NULL, NULL, 3, 1, NULL, NULL, NULL, NULL, NULL, 'normal');
INSERT INTO `sys_menu` (`menu_id`, `name`, `descn`, `code`, `type`, `icon`, `path`, `component`, `parent_id`, `display`, `sort`, `create_user_id`, `create_time`, `update_user_id`, `update_time`, `status`) VALUES (109, '删除角色', '', 'sysRole:remove', 'button', '', NULL, NULL, 3, 1, NULL, NULL, NULL, NULL, NULL, 'normal');
INSERT INTO `sys_menu` (`menu_id`, `name`, `descn`, `code`, `type`, `icon`, `path`, `component`, `parent_id`, `display`, `sort`, `create_user_id`, `create_time`, `update_user_id`, `update_time`, `status`) VALUES (110, '新增字典', '', 'sysDict:create', 'button', '', NULL, NULL, 5, 1, NULL, NULL, NULL, NULL, NULL, 'normal');
INSERT INTO `sys_menu` (`menu_id`, `name`, `descn`, `code`, `type`, `icon`, `path`, `component`, `parent_id`, `display`, `sort`, `create_user_id`, `create_time`, `update_user_id`, `update_time`, `status`) VALUES (111, '编辑字典', '', 'sysDict:edit', 'button', '', NULL, NULL, 5, 1, NULL, NULL, NULL, NULL, NULL, 'normal');
INSERT INTO `sys_menu` (`menu_id`, `name`, `descn`, `code`, `type`, `icon`, `path`, `component`, `parent_id`, `display`, `sort`, `create_user_id`, `create_time`, `update_user_id`, `update_time`, `status`) VALUES (112, '删除字典', '', 'sysDict:remove', 'button', '', NULL, NULL, 5, 1, NULL, NULL, NULL, NULL, NULL, 'normal');
INSERT INTO `sys_menu` (`menu_id`, `name`, `descn`, `code`, `type`, `icon`, `path`, `component`, `parent_id`, `display`, `sort`, `create_user_id`, `create_time`, `update_user_id`, `update_time`, `status`) VALUES (113, '新增字典数据', '', 'sysDict:createData', 'button', '', NULL, NULL, 5, 1, NULL, NULL, NULL, NULL, NULL, 'normal');
INSERT INTO `sys_menu` (`menu_id`, `name`, `descn`, `code`, `type`, `icon`, `path`, `component`, `parent_id`, `display`, `sort`, `create_user_id`, `create_time`, `update_user_id`, `update_time`, `status`) VALUES (114, '编辑字典数据', '', 'sysDict:editData', 'button', '', NULL, NULL, 5, 1, NULL, NULL, NULL, NULL, NULL, 'normal');
INSERT INTO `sys_menu` (`menu_id`, `name`, `descn`, `code`, `type`, `icon`, `path`, `component`, `parent_id`, `display`, `sort`, `create_user_id`, `create_time`, `update_user_id`, `update_time`, `status`) VALUES (115, '删除字典数据', '', 'sysDict:removeData', 'button', '', NULL, NULL, 5, 1, NULL, NULL, NULL, NULL, NULL, 'normal');
INSERT INTO `sys_menu` (`menu_id`, `name`, `descn`, `code`, `type`, `icon`, `path`, `component`, `parent_id`, `display`, `sort`, `create_user_id`, `create_time`, `update_user_id`, `update_time`, `status`) VALUES (116, '查看字典数据', '', 'sysDict:dictData', 'button', '', NULL, NULL, 5, 1, NULL, NULL, NULL, NULL, NULL, 'normal');
INSERT INTO `sys_menu` (`menu_id`, `name`, `descn`, `code`, `type`, `icon`, `path`, `component`, `parent_id`, `display`, `sort`, `create_user_id`, `create_time`, `update_user_id`, `update_time`, `status`) VALUES (122, '组件展示', NULL, NULL, 'menu', 'ant-design:appstore-add-outlined', '/demo', 'LAYOUT', NULL, 1, 11, NULL, NULL, NULL, NULL, 'normal');
INSERT INTO `sys_menu` (`menu_id`, `name`, `descn`, `code`, `type`, `icon`, `path`, `component`, `parent_id`, `display`, `sort`, `create_user_id`, `create_time`, `update_user_id`, `update_time`, `status`) VALUES (123, '按钮', '', NULL, 'menu', 'teenyicons:button-outline', '/demo/button', '/demo/button/button.vue', 122, 1, NULL, NULL, NULL, NULL, NULL, 'normal');
INSERT INTO `sys_menu` (`menu_id`, `name`, `descn`, `code`, `type`, `icon`, `path`, `component`, `parent_id`, `display`, `sort`, `create_user_id`, `create_time`, `update_user_id`, `update_time`, `status`) VALUES (124, '表单', NULL, NULL, 'menu', 'vaadin:input', '/demo/form', '/demo/form/form.vue', 122, 1, NULL, NULL, NULL, NULL, NULL, 'normal');
INSERT INTO `sys_menu` (`menu_id`, `name`, `descn`, `code`, `type`, `icon`, `path`, `component`, `parent_id`, `display`, `sort`, `create_user_id`, `create_time`, `update_user_id`, `update_time`, `status`) VALUES (125, '警告提示', NULL, NULL, 'menu', 'ant-design:warning-outlined', '/demo/alert', '/demo/alert/alert.vue', 122, 1, NULL, NULL, NULL, NULL, NULL, 'normal');
INSERT INTO `sys_menu` (`menu_id`, `name`, `descn`, `code`, `type`, `icon`, `path`, `component`, `parent_id`, `display`, `sort`, `create_user_id`, `create_time`, `update_user_id`, `update_time`, `status`) VALUES (126, 'Dashboard', NULL, NULL, 'menu', 'ant-design:dashboard-outlined', '/dashboard', 'LAYOUT', NULL, 1, 10, NULL, NULL, NULL, NULL, 'normal');
INSERT INTO `sys_menu` (`menu_id`, `name`, `descn`, `code`, `type`, `icon`, `path`, `component`, `parent_id`, `display`, `sort`, `create_user_id`, `create_time`, `update_user_id`, `update_time`, `status`) VALUES (127, '工作台', '', NULL, 'menu', NULL, '/dashboard/workplace', '/dashboard/workplace/workplace.vue', 126, 1, NULL, NULL, NULL, NULL, NULL, 'normal');
INSERT INTO `sys_menu` (`menu_id`, `name`, `descn`, `code`, `type`, `icon`, `path`, `component`, `parent_id`, `display`, `sort`, `create_user_id`, `create_time`, `update_user_id`, `update_time`, `status`) VALUES (128, '分析页', '', NULL, 'menu', NULL, '/dashboard/analysis', '/dashboard/analysis/analysis.vue', 126, 1, NULL, NULL, NULL, NULL, NULL, 'normal');
COMMIT;

-- ----------------------------
-- Table structure for sys_role
-- ----------------------------
DROP TABLE IF EXISTS `sys_role`;
CREATE TABLE `sys_role` (
  `role_id` bigint(20) NOT NULL AUTO_INCREMENT COMMENT '角色编号',
  `name` varchar(20) DEFAULT NULL COMMENT '角色名称',
  `code` varchar(20) DEFAULT NULL COMMENT '角色编码',
  `descn` varchar(100) DEFAULT NULL COMMENT '角色描述',
  `data_type` int(11) DEFAULT NULL COMMENT '数据权限（1:本人 2:本区域 3:全部）',
  `sort` int(11) DEFAULT NULL COMMENT '排序',
  `create_user_id` bigint(20) DEFAULT NULL COMMENT '创建人',
  `create_time` datetime DEFAULT NULL COMMENT '创建时间',
  `update_user_id` bigint(20) DEFAULT NULL COMMENT '更新人',
  `update_time` datetime DEFAULT NULL COMMENT '更新时间',
  `status` varchar(20) DEFAULT NULL COMMENT '状态（0:无效 1:有效）',
  PRIMARY KEY (`role_id`) USING BTREE
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8mb4 ROW_FORMAT=DYNAMIC COMMENT='系统角色表';

-- ----------------------------
-- Records of sys_role
-- ----------------------------
BEGIN;
INSERT INTO `sys_role` (`role_id`, `name`, `code`, `descn`, `data_type`, `sort`, `create_user_id`, `create_time`, `update_user_id`, `update_time`, `status`) VALUES (1, '管理员', NULL, '系统管理员', NULL, NULL, NULL, NULL, NULL, NULL, 'normal');
INSERT INTO `sys_role` (`role_id`, `name`, `code`, `descn`, `data_type`, `sort`, `create_user_id`, `create_time`, `update_user_id`, `update_time`, `status`) VALUES (2, '开发人员', NULL, '开发人员', NULL, NULL, NULL, NULL, NULL, NULL, 'normal');
COMMIT;

-- ----------------------------
-- Table structure for sys_role_menu
-- ----------------------------
DROP TABLE IF EXISTS `sys_role_menu`;
CREATE TABLE `sys_role_menu` (
  `id` bigint(20) NOT NULL AUTO_INCREMENT COMMENT '编号',
  `role_id` bigint(20) DEFAULT NULL COMMENT '角色编号',
  `menu_id` bigint(20) DEFAULT NULL COMMENT '菜单编号',
  PRIMARY KEY (`id`) USING BTREE,
  KEY `role_id` (`role_id`) USING BTREE,
  KEY `menu_id` (`menu_id`) USING BTREE
) ENGINE=InnoDB AUTO_INCREMENT=71 DEFAULT CHARSET=utf8mb4 ROW_FORMAT=DYNAMIC COMMENT='系统角色菜单表';

-- ----------------------------
-- Records of sys_role_menu
-- ----------------------------
BEGIN;
INSERT INTO `sys_role_menu` (`id`, `role_id`, `menu_id`) VALUES (1, 1, 123);
INSERT INTO `sys_role_menu` (`id`, `role_id`, `menu_id`) VALUES (2, 1, 111);
INSERT INTO `sys_role_menu` (`id`, `role_id`, `menu_id`) VALUES (3, 1, 104);
INSERT INTO `sys_role_menu` (`id`, `role_id`, `menu_id`) VALUES (4, 1, 77);
INSERT INTO `sys_role_menu` (`id`, `role_id`, `menu_id`) VALUES (5, 1, 127);
INSERT INTO `sys_role_menu` (`id`, `role_id`, `menu_id`) VALUES (6, 1, 115);
INSERT INTO `sys_role_menu` (`id`, `role_id`, `menu_id`) VALUES (7, 1, 108);
INSERT INTO `sys_role_menu` (`id`, `role_id`, `menu_id`) VALUES (8, 1, 81);
INSERT INTO `sys_role_menu` (`id`, `role_id`, `menu_id`) VALUES (9, 1, 124);
INSERT INTO `sys_role_menu` (`id`, `role_id`, `menu_id`) VALUES (10, 1, 112);
INSERT INTO `sys_role_menu` (`id`, `role_id`, `menu_id`) VALUES (11, 1, 105);
INSERT INTO `sys_role_menu` (`id`, `role_id`, `menu_id`) VALUES (12, 1, 78);
INSERT INTO `sys_role_menu` (`id`, `role_id`, `menu_id`) VALUES (13, 1, 128);
INSERT INTO `sys_role_menu` (`id`, `role_id`, `menu_id`) VALUES (14, 1, 116);
INSERT INTO `sys_role_menu` (`id`, `role_id`, `menu_id`) VALUES (15, 1, 109);
INSERT INTO `sys_role_menu` (`id`, `role_id`, `menu_id`) VALUES (16, 1, 82);
INSERT INTO `sys_role_menu` (`id`, `role_id`, `menu_id`) VALUES (17, 1, 125);
INSERT INTO `sys_role_menu` (`id`, `role_id`, `menu_id`) VALUES (18, 1, 113);
INSERT INTO `sys_role_menu` (`id`, `role_id`, `menu_id`) VALUES (19, 1, 106);
INSERT INTO `sys_role_menu` (`id`, `role_id`, `menu_id`) VALUES (20, 1, 79);
INSERT INTO `sys_role_menu` (`id`, `role_id`, `menu_id`) VALUES (21, 1, 110);
INSERT INTO `sys_role_menu` (`id`, `role_id`, `menu_id`) VALUES (22, 1, 83);
INSERT INTO `sys_role_menu` (`id`, `role_id`, `menu_id`) VALUES (23, 1, 114);
INSERT INTO `sys_role_menu` (`id`, `role_id`, `menu_id`) VALUES (24, 1, 107);
INSERT INTO `sys_role_menu` (`id`, `role_id`, `menu_id`) VALUES (25, 1, 80);
INSERT INTO `sys_role_menu` (`id`, `role_id`, `menu_id`) VALUES (26, 1, 65);
INSERT INTO `sys_role_menu` (`id`, `role_id`, `menu_id`) VALUES (27, 1, 4);
INSERT INTO `sys_role_menu` (`id`, `role_id`, `menu_id`) VALUES (28, 1, 44);
INSERT INTO `sys_role_menu` (`id`, `role_id`, `menu_id`) VALUES (29, 1, 2);
INSERT INTO `sys_role_menu` (`id`, `role_id`, `menu_id`) VALUES (30, 1, 3);
INSERT INTO `sys_role_menu` (`id`, `role_id`, `menu_id`) VALUES (31, 1, 5);
INSERT INTO `sys_role_menu` (`id`, `role_id`, `menu_id`) VALUES (32, 1, 126);
INSERT INTO `sys_role_menu` (`id`, `role_id`, `menu_id`) VALUES (33, 1, 122);
INSERT INTO `sys_role_menu` (`id`, `role_id`, `menu_id`) VALUES (34, 1, 1);
INSERT INTO `sys_role_menu` (`id`, `role_id`, `menu_id`) VALUES (35, 1, 64);
INSERT INTO `sys_role_menu` (`id`, `role_id`, `menu_id`) VALUES (36, 2, 126);
INSERT INTO `sys_role_menu` (`id`, `role_id`, `menu_id`) VALUES (37, 2, 127);
INSERT INTO `sys_role_menu` (`id`, `role_id`, `menu_id`) VALUES (38, 2, 128);
INSERT INTO `sys_role_menu` (`id`, `role_id`, `menu_id`) VALUES (39, 2, 122);
INSERT INTO `sys_role_menu` (`id`, `role_id`, `menu_id`) VALUES (40, 2, 123);
INSERT INTO `sys_role_menu` (`id`, `role_id`, `menu_id`) VALUES (41, 2, 124);
INSERT INTO `sys_role_menu` (`id`, `role_id`, `menu_id`) VALUES (42, 2, 125);
INSERT INTO `sys_role_menu` (`id`, `role_id`, `menu_id`) VALUES (43, 2, 1);
INSERT INTO `sys_role_menu` (`id`, `role_id`, `menu_id`) VALUES (44, 2, 4);
INSERT INTO `sys_role_menu` (`id`, `role_id`, `menu_id`) VALUES (45, 2, 44);
INSERT INTO `sys_role_menu` (`id`, `role_id`, `menu_id`) VALUES (46, 2, 2);
INSERT INTO `sys_role_menu` (`id`, `role_id`, `menu_id`) VALUES (47, 2, 3);
INSERT INTO `sys_role_menu` (`id`, `role_id`, `menu_id`) VALUES (48, 2, 5);
INSERT INTO `sys_role_menu` (`id`, `role_id`, `menu_id`) VALUES (49, 2, 104);
INSERT INTO `sys_role_menu` (`id`, `role_id`, `menu_id`) VALUES (50, 2, 105);
INSERT INTO `sys_role_menu` (`id`, `role_id`, `menu_id`) VALUES (51, 2, 106);
INSERT INTO `sys_role_menu` (`id`, `role_id`, `menu_id`) VALUES (52, 2, 107);
INSERT INTO `sys_role_menu` (`id`, `role_id`, `menu_id`) VALUES (53, 2, 108);
INSERT INTO `sys_role_menu` (`id`, `role_id`, `menu_id`) VALUES (54, 2, 109);
INSERT INTO `sys_role_menu` (`id`, `role_id`, `menu_id`) VALUES (55, 2, 78);
INSERT INTO `sys_role_menu` (`id`, `role_id`, `menu_id`) VALUES (56, 2, 79);
INSERT INTO `sys_role_menu` (`id`, `role_id`, `menu_id`) VALUES (57, 2, 80);
INSERT INTO `sys_role_menu` (`id`, `role_id`, `menu_id`) VALUES (58, 2, 81);
INSERT INTO `sys_role_menu` (`id`, `role_id`, `menu_id`) VALUES (59, 2, 110);
INSERT INTO `sys_role_menu` (`id`, `role_id`, `menu_id`) VALUES (60, 2, 111);
INSERT INTO `sys_role_menu` (`id`, `role_id`, `menu_id`) VALUES (61, 2, 112);
INSERT INTO `sys_role_menu` (`id`, `role_id`, `menu_id`) VALUES (62, 2, 113);
INSERT INTO `sys_role_menu` (`id`, `role_id`, `menu_id`) VALUES (63, 2, 114);
INSERT INTO `sys_role_menu` (`id`, `role_id`, `menu_id`) VALUES (64, 2, 115);
INSERT INTO `sys_role_menu` (`id`, `role_id`, `menu_id`) VALUES (65, 2, 116);
INSERT INTO `sys_role_menu` (`id`, `role_id`, `menu_id`) VALUES (66, 2, 77);
INSERT INTO `sys_role_menu` (`id`, `role_id`, `menu_id`) VALUES (67, 2, 82);
INSERT INTO `sys_role_menu` (`id`, `role_id`, `menu_id`) VALUES (68, 2, 83);
INSERT INTO `sys_role_menu` (`id`, `role_id`, `menu_id`) VALUES (69, 2, 64);
INSERT INTO `sys_role_menu` (`id`, `role_id`, `menu_id`) VALUES (70, 2, 65);
COMMIT;

-- ----------------------------
-- Table structure for sys_user
-- ----------------------------
DROP TABLE IF EXISTS `sys_user`;
CREATE TABLE `sys_user` (
  `user_id` bigint(20) NOT NULL AUTO_INCREMENT COMMENT '用户编号',
  `username` varchar(50) DEFAULT NULL COMMENT '登录账号',
  `password` varchar(64) DEFAULT NULL COMMENT '密码',
  `name` varchar(50) DEFAULT NULL COMMENT '姓名',
  `avatar` varchar(200) DEFAULT NULL COMMENT '头像',
  `phone` varchar(20) DEFAULT NULL COMMENT '手机号',
  `email` varchar(100) DEFAULT NULL COMMENT '邮箱',
  `sex` varchar(100) DEFAULT NULL COMMENT '性别（0:未设置 1:男 2:女）',
  `dept_id` bigint(20) DEFAULT NULL COMMENT '所在部门',
  `position` varchar(50) DEFAULT NULL COMMENT '岗位',
  `leader_id` bigint(20) DEFAULT NULL COMMENT '直属上级',
  `create_user_id` bigint(20) DEFAULT NULL COMMENT '创建人',
  `create_time` datetime DEFAULT NULL COMMENT '创建时间',
  `update_user_id` bigint(20) DEFAULT NULL COMMENT '更新人',
  `update_time` datetime DEFAULT NULL COMMENT '更新时间',
  `last_login_time` datetime DEFAULT NULL COMMENT '最后登录时间',
  `status` varchar(20) DEFAULT NULL COMMENT '状态（0:无效 1:有效）',
  PRIMARY KEY (`user_id`) USING BTREE
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8mb4 ROW_FORMAT=DYNAMIC COMMENT='系统用户表';

-- ----------------------------
-- Records of sys_user
-- ----------------------------
BEGIN;
INSERT INTO `sys_user` (`user_id`, `username`, `password`, `name`, `avatar`, `phone`, `email`, `sex`, `dept_id`, `position`, `leader_id`, `create_user_id`, `create_time`, `update_user_id`, `update_time`, `last_login_time`, `status`) VALUES (1, 'admin', '$2a$10$nHW4XKBj5J1U7so0gDSt2.iOVdsZHKEf.I3TUWlWSuPc0kM99JuOa', 'YXBoot Admin', 'http://admin.yxboot.com/images/20240322/931d9fa7-8d17-4347-81cc-82ed51fe2d97.webp', '18612345678', 'admin@yxboot.com', 'user_sex@1', 56, NULL, NULL, NULL, NULL, NULL, NULL, NULL, 'normal');
INSERT INTO `sys_user` (`user_id`, `username`, `password`, `name`, `avatar`, `phone`, `email`, `sex`, `dept_id`, `position`, `leader_id`, `create_user_id`, `create_time`, `update_user_id`, `update_time`, `last_login_time`, `status`) VALUES (2, 'yxboot', '$2a$10$IQAPQ0sw5gKjh8IsWWTssui0a3MF6mJ8tJqOT7uqiCiqifOpeQ5ga', '看看YXBoot', 'http://yxboot.boyait.org/images/20231214/logo1.png', '15145678910', 'dev@yxboot.com', 'user_sex@1', 56, NULL, NULL, NULL, NULL, NULL, NULL, NULL, 'normal');
INSERT INTO `sys_user` (`user_id`, `username`, `password`, `name`, `avatar`, `phone`, `email`, `sex`, `dept_id`, `position`, `leader_id`, `create_user_id`, `create_time`, `update_user_id`, `update_time`, `last_login_time`, `status`) VALUES (3, 'test', '$2a$10$Kno5PYg9ZeFr/qpZlzASy.rVK1Ext2pnmqCgji5bm8dkd9swwmGqW', 'Test22', NULL, '18612345678', NULL, 'user_sex@2', 56, NULL, NULL, NULL, NULL, NULL, NULL, NULL, 'normal');
COMMIT;

-- ----------------------------
-- Table structure for sys_user_role
-- ----------------------------
DROP TABLE IF EXISTS `sys_user_role`;
CREATE TABLE `sys_user_role` (
  `id` bigint(20) NOT NULL AUTO_INCREMENT COMMENT '编号',
  `user_id` bigint(20) DEFAULT NULL COMMENT '用户编号',
  `role_id` bigint(20) DEFAULT NULL COMMENT '角色编号',
  PRIMARY KEY (`id`) USING BTREE,
  KEY `user_id` (`user_id`) USING BTREE,
  KEY `role_id` (`role_id`) USING BTREE
) ENGINE=InnoDB AUTO_INCREMENT=26 DEFAULT CHARSET=utf8mb4 ROW_FORMAT=DYNAMIC COMMENT='系统用户角色表';

-- ----------------------------
-- Records of sys_user_role
-- ----------------------------
BEGIN;
INSERT INTO `sys_user_role` (`id`, `user_id`, `role_id`) VALUES (17, 1, 1);
INSERT INTO `sys_user_role` (`id`, `user_id`, `role_id`) VALUES (22, 2, 2);
INSERT INTO `sys_user_role` (`id`, `user_id`, `role_id`) VALUES (25, 3, 1);
COMMIT;

SET FOREIGN_KEY_CHECKS = 1;
