/*
 Navicat Premium Data Transfer

 Source Server Type    : MySQL
 Source Server Version : 50732
 Source Schema         : yxboot

 Target Server Type    : MySQL
 Target Server Version : 50732
 File Encoding         : 65001

 Date: 15/12/2023 10:02:17
*/

SET NAMES utf8mb4;
SET FOREIGN_KEY_CHECKS = 0;

-- ----------------------------
-- Table structure for dev_generator_template
-- ----------------------------
DROP TABLE IF EXISTS `dev_generator_template`;
CREATE TABLE `dev_generator_template` (
  `id` bigint(20) NOT NULL AUTO_INCREMENT COMMENT '模板id',
  `name` varchar(100) DEFAULT NULL COMMENT '模板名称',
  `type` int(11) DEFAULT NULL COMMENT '模板类型1前端模板 2后端模板',
  `content` text COMMENT '模板内容',
  `language` varchar(100) DEFAULT NULL COMMENT '模板语言',
  `sort` int(11) DEFAULT NULL COMMENT '排序',
  `create_user_id` bigint(20) DEFAULT NULL COMMENT '创建人',
  `create_time` datetime DEFAULT NULL COMMENT '创建时间',
  `update_user_id` bigint(20) DEFAULT NULL COMMENT '更新人',
  `update_time` datetime DEFAULT NULL COMMENT '更新时间',
  `status` int(11) DEFAULT NULL COMMENT '状态',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=10 DEFAULT CHARSET=utf8mb4 COMMENT='代码生成模板';

-- ----------------------------
-- Records of dev_generator_template
-- ----------------------------
BEGIN;
INSERT INTO `dev_generator_template` VALUES (1, 'Entity.java', 2, 'package ${package}.${tablePrefix}.entity;\n\nimport com.baomidou.mybatisplus.annotation.IdType;\nimport com.baomidou.mybatisplus.annotation.TableId;\nimport com.baomidou.mybatisplus.annotation.TableName;\nimport io.swagger.v3.oas.annotations.media.Schema;\nimport lombok.Data;\nimport lombok.EqualsAndHashCode;\nimport lombok.experimental.Accessors;\n\nimport java.io.Serial;\nimport java.io.Serializable;\nimport java.util.Date;\n\n/**\n * ${comments}\n * @author ${author}\n * @date ${datetime}\n */\n@Data\n@EqualsAndHashCode(callSuper = false)\n@Accessors(chain = true)\n@TableName(\"${tableName}\")\n@Schema(name =\"${className}\", description = \"${comments}\")\npublic class ${className} implements Serializable {\n	@Serial\n	private static final long serialVersionUID = 1L;\n\n<#list columns as column >\n	/**\n	* ${column.comments}\n	 */\n	<#if column.name == pk.name>\n	@TableId(value = \"${column.name}\", type = IdType.AUTO)\n	 private ${column.attrType} ${column.attrname};\n	<#else>\n	@Schema(description = \"${column.comments}\")\n	private ${column.attrType} ${column.attrname};\n	</#if>\n\n</#list>\n}', 'java', 1, NULL, NULL, NULL, NULL, NULL);
INSERT INTO `dev_generator_template` VALUES (2, 'Controller.java', 2, 'package ${package}.${tablePrefix}.controller;\r\n\r\nimport com.baomidou.mybatisplus.core.metadata.IPage;\r\nimport com.yxboot.common.api.Result;\r\nimport com.yxboot.common.aspect.SysLogOperation;\r\nimport com.yxboot.common.pagination.PageRequest;\r\nimport ${package}.${tablePrefix}.entity.${className};\r\nimport ${package}.${tablePrefix}.service.${className}Service;\r\nimport io.swagger.v3.oas.annotations.Operation;\r\nimport io.swagger.v3.oas.annotations.tags.Tag;\r\nimport lombok.RequiredArgsConstructor;\r\nimport org.springframework.web.bind.annotation.*;\r\n\r\n/**\r\n * ${comments} Api\r\n * @author ${author}\r\n * @date ${datetime}\r\n */\r\n@RestController\r\n@RequestMapping(\"/${tablePrefix}/${tablesuffix}\")\r\n@RequiredArgsConstructor\r\n@Tag(name = \"${comments} Api\")\r\npublic class ${className}Controller {\r\n    private final ${className}Service ${classname}Service;\r\n\r\n    @GetMapping(\"/list\")\r\n    @Operation(summary = \"${comments} 查询列表接口\")\r\n    public Result list(PageRequest pageRequest) {\r\n        IPage<${className}> pageResult = ${classname}Service.pageQuery(pageRequest);\r\n        return Result.success(\"查询成功！\", pageResult);\r\n    }\r\n\r\n    @GetMapping(\"/get\")\r\n    @Operation(summary = \"查询详情接口\")\r\n    public Result get(@RequestParam Long ${pk.attrname}) {\r\n        ${className} ${classname} = ${classname}Service.getById(${pk.attrname});\r\n        return Result.success(\"查询成功！\", ${classname});\r\n    }\r\n\r\n    @PostMapping(\"/save\")\r\n    @SysLogOperation(value = \"保存信息接口\")\r\n    @Operation(summary = \"保存信息接口\")\r\n    public Result save(@RequestBody ${className} ${classname}) {\r\n        ${classname}Service.saveOrUpdate(${classname});\r\n        return Result.success(\"保存成功！\", ${classname});\r\n    }\r\n\r\n    @DeleteMapping(\"/remove\")\r\n    @SysLogOperation(value = \"删除信息接口\")\r\n    @Operation(summary = \"删除信息接口\")\r\n    public Result remove(Long ${pk.attrname}) {\r\n        ${classname}Service.removeById(${pk.attrname});\r\n        return Result.success(\"删除成功！\");\r\n    }\r\n}', 'java', 2, NULL, NULL, NULL, NULL, NULL);
INSERT INTO `dev_generator_template` VALUES (3, 'Mapper.java', 2, 'package ${package}.${tablePrefix}.mapper;\n\nimport ${package}.${tablePrefix}.entity.${className};\nimport com.baomidou.mybatisplus.core.mapper.BaseMapper;\n\n/**\n * ${comments} Mapper\n * @author ${author}\n * @date ${datetime}\n */\npublic interface ${className}Mapper extends BaseMapper<${className}> {\n\n}', 'java', 3, NULL, NULL, NULL, NULL, NULL);
INSERT INTO `dev_generator_template` VALUES (4, 'Mapper.xml', 2, '<?xml version=\"1.0\" encoding=\"UTF-8\" ?>\r\n<!DOCTYPE mapper PUBLIC \"-//mybatis.org//DTD Mapper 3.0//EN\" \"http://mybatis.org/dtd/mybatis-3-mapper.dtd\">\r\n<mapper namespace=\"${package}.${tablePrefix}.mapper.${className}Mapper\">\r\n\r\n</mapper>\r\n', 'java', 4, NULL, NULL, NULL, NULL, NULL);
INSERT INTO `dev_generator_template` VALUES (5, 'Service.java', 2, 'package ${package}.${tablePrefix}.service;\r\n\r\nimport com.baomidou.mybatisplus.core.conditions.query.QueryWrapper;\r\nimport com.baomidou.mybatisplus.core.metadata.IPage;\r\nimport com.baomidou.mybatisplus.extension.service.impl.ServiceImpl;\r\nimport org.springframework.stereotype.Service;\r\nimport ${package}.${tablePrefix}.mapper.${className}Mapper;\r\nimport ${package}.${tablePrefix}.entity.${className};\r\nimport com.yxboot.common.pagination.PageRequest;\r\n\r\n/**\r\n * ${comments} 业务实现类\r\n * @author ${author}\r\n * @date ${datetime}\r\n */\r\n@Service\r\npublic class ${className}Service extends ServiceImpl<${className}Mapper, ${className}> {\r\n    public IPage<${className}> pageQuery(PageRequest pageRequest) {\r\n        QueryWrapper<${className}> wrapper = new QueryWrapper<>();\r\n        return page(pageRequest.convertToPage(), wrapper);\r\n    }\r\n}', 'java', 5, NULL, NULL, NULL, NULL, NULL);
INSERT INTO `dev_generator_template` VALUES (6, 'data.ts', 1, '/**\n * ${comments}\n * @date ${datetime}\n * @author ${author}\n * @Email ${email}\n */\nimport { FormSchema } from \'@/components/Form\'\nimport { BasicColumn } from \'@/components/Table\'\nimport { statusEnum } from \'@/utils/formEnums\'\nimport { required } from \'@/utils/formRules\'\n\nexport const tableColumns: BasicColumn[] = [\n  <#list columns as column >\n  <#if column.attrname == \"status\">\n  { dataIndex: \'statusDesc\', title: \'状态\', width: 80 },\n  <#else>\n  { dataIndex: \'${column.attrname}\', title: \'${column.comments}\', width: 80 },\n  </#if>\n  </#list>\n]\n\nexport const searchFormSchema: FormSchema[] = [\n  {\n    field: \'status\',\n    label: \'状态\',\n    component: \'Select\',\n    defaultValue: 1,\n    componentProps: { allowClear: true, options: statusEnum }\n  }\n]\n\nexport const editFormSchema: FormSchema[] = [\n  <#list columns as column >\n  <#if column.name == pk.name>\n  { field: \'${column.attrname}\', label: \'${column.comments}\', component: \'InputNumber\', show: false },\n  <#elseif column.attrname == \"status\">\n  {\n    field: \'status\',\n    label: \'状态\',\n    component: \'Select\',\n    rules: [required(\'请选择状态\')],\n    defaultValue: 1,\n    componentProps: { options: statusEnum }\n  },\n  <#else>\n  { field: \'${column.attrname}\', label: \'${column.comments}\', component: \'Input\' },\n  </#if>\n  </#list>\n]', 'ts', 1, NULL, NULL, NULL, NULL, NULL);
INSERT INTO `dev_generator_template` VALUES (7, 'Drawer.vue', 1, '<template>\n  <BasicDrawer :title=\"getTitle\" @register=\"register\" @ok=\"handleSubmit\">\n    <BasicForm @register=\"registerForm\" />\n  </BasicDrawer>\n</template>\n<script lang=\"ts\" setup>\n  /**\n   * ${comments}\n   * @date ${datetime}\n   * @author ${author}\n   * @Email ${email}\n   */\n  import { message } from \'ant-design-vue\'\n  import { useDrawerInner } from \'@/components/Drawer\'\n  import { useForm } from \'@/components/Form\'\n  import { save${ tableSuffix } } from \'@/api/${tablePrefix}/${tablesuffix}\'\n  import { editFormSchema } from \'./${tablesuffix}.data\'\n\n  const emit = defineEmits([\'success\'])\n\n  const isUpdate = ref(true)\n  const getTitle = computed(() => (!unref(isUpdate) ? \'新增\' : \'编辑\'))\n\n  const [register, { setDrawerProps, closeDrawer }] = useDrawerInner(async (data) => {\n    await resetFields()\n    setDrawerProps({ confirmLoading: false })\n    isUpdate.value = !!data?.isUpdate\n    if (unref(isUpdate)) {\n      setFieldsValue({ ...data.record })\n    }\n  })\n\n  const [registerForm, { resetFields, setFieldsValue, validate }] = useForm({\n    schemas: editFormSchema,\n    showActionButtonGroup: false,\n    labelWidth: 120\n  })\n\n  const handleSubmit = async () => {\n    try {\n      const values = await validate()\n      const params = { ...values }\n      save${ tableSuffix }(params).then((res) => {\n        if (res.code === 0) {\n          emit(\'success\')\n          message.success(res.msg)\n          closeDrawer()\n        } else {\n          message.error(res.msg)\n        }\n      })\n    } catch (error) {\n      console.error(\'validate failed!\', error)\n    }\n  }\n</script>', 'vue', 2, NULL, NULL, NULL, NULL, NULL);
INSERT INTO `dev_generator_template` VALUES (8, 'Entity.vue', 1, '<template>\n  <div class=\"page\">\n    <BasicTable @register=\"registerTable\">\n      <template #toolbar>\n        <a-button type=\"primary\" @click=\"handleCreate\">新增</a-button>\n      </template>\n      <template #action=\"{ record }\">\n        <TableAction\n          :actions=\"[\n            {\n              icon: \'clarity:note-edit-line\',\n              tooltip: \'编辑\',\n              onClick: handleEdit.bind(null, record)\n            },\n            {\n              icon: \'ant-design:delete-outlined\',\n              tooltip: \'删除\',\n              color: \'error\',\n              popConfirm: {\n                title: \'是否删除该条记录？\',\n                confirm: handleRemove.bind(null, record)\n              }\n            }\n          ]\"\n        />\n      </template>\n    </BasicTable>\n    <EditDrawer @register=\"registerEditDrawer\" @success=\"handleSuccess\" />\n  </div>\n</template>\n<script lang=\"ts\" setup>\n  /**\n   * ${comments}\n   * @date ${datetime}\n   * @author ${author}\n   * @Email ${email}\n   */\n  import { message } from \'ant-design-vue\'\n  import { useTable } from \'@/components/Table\'\n  import { useDrawer } from \'@/components/Drawer\'\n  import EditDrawer from \'./${tableSuffix}Drawer.vue\'\n  import { list${ tableSuffix }, remove${ tableSuffix } } from \'@/api/${tablePrefix}/${tablesuffix}\'\n  import { tableColumns, searchFormSchema } from \'./${tablesuffix}.data\'\n\n  const [registerTable, { reload: reloadList }] = useTable({\n    title: \'${comments}列表\',\n    titleHelpMessage: \'列表\',\n    api: list${ tableSuffix },\n    rowKey: \'${pk.attrname}\',\n    columns: tableColumns,\n    useSearchForm: true,\n    formConfig: {\n      labelWidth: 120,\n      schemas: searchFormSchema\n    },\n    showIndexColumn: true,\n    actionColumn: {\n      width: 120\n    }\n  })\n\n  const [registerEditDrawer, { openDrawer: openEditDrawer }] = useDrawer()\n\n  const handleCreate = () => {\n    openEditDrawer(true, { isUpdate: false })\n  }\n\n  const handleEdit = (record: any) => {\n    openEditDrawer(true, { record, isUpdate: true })\n  }\n\n  const handleRemove = ({ ${ pk.attrname } }) => {\n    remove${ tableSuffix }({ ${ pk.attrname } }).then((res) => {\n      if (res.code === 0) {\n        message.success(\'删除成功！\')\n        reloadList()\n      }\n    })\n  }\n\n  const handleSuccess = () => {\n    reloadList()\n  }\n</script>', 'vue', 3, NULL, NULL, NULL, NULL, NULL);
INSERT INTO `dev_generator_template` VALUES (9, 'api.ts', 1, 'import { http } from \'@/utils/http/axios\'\nimport { BasicResultModel } from \'../model/basicModel\'\n\n/**\n * ${comments}\n * @date ${datetime}\n * @author ${author}\n * @Email ${email}\n */\nenum Api {\n  list = \'/${tablePrefix}/${tablesuffix}/list\',\n  get = \'/${tablePrefix}/${tablesuffix}/get\',\n  save = \'/${tablePrefix}/${tablesuffix}/save\',\n  remove = \'/${tablePrefix}/${tablesuffix}/remove\'\n}\n\nexport const list${tableSuffix} = (params: any) => http.get<BasicResultModel>({ url: Api.list, params })\nexport const get${tableSuffix} = (params: any) => http.get<BasicResultModel>({ url: Api.get, params })\nexport const save${tableSuffix} = (data: any) => http.post<BasicResultModel>({ url: Api.save, data })\nexport const remove${tableSuffix} = (params: any) => http.delete<BasicResultModel>({ url: Api.remove, params })', 'ts', 4, NULL, NULL, NULL, NULL, NULL);
COMMIT;

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
  `status` int(11) DEFAULT NULL COMMENT '状态',
  `deleted` int(11) DEFAULT '0' COMMENT '删除标识',
  PRIMARY KEY (`dept_id`)
) ENGINE=InnoDB AUTO_INCREMENT=59 DEFAULT CHARSET=utf8mb4 COMMENT='部门表';

-- ----------------------------
-- Records of sys_dept
-- ----------------------------
BEGIN;
INSERT INTO `sys_dept` VALUES (56, '研发部', NULL, NULL, NULL, NULL, NULL, NULL, NULL, 1, 0);
INSERT INTO `sys_dept` VALUES (57, '质量管理部', 56, NULL, NULL, NULL, NULL, NULL, NULL, 1, 0);
INSERT INTO `sys_dept` VALUES (58, '销售部', NULL, NULL, '', NULL, NULL, NULL, NULL, 1, 0);
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
  `status` int(11) DEFAULT NULL COMMENT '状态',
  `deleted` int(11) DEFAULT '0' COMMENT '删除标识',
  PRIMARY KEY (`dict_id`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8mb4 COMMENT='字典表';

-- ----------------------------
-- Records of sys_dict
-- ----------------------------
BEGIN;
INSERT INTO `sys_dict` VALUES (1, '用户性别', 'UserSex', '', NULL, 1, '2022-12-05 10:39:24', NULL, NULL, 1, 0);
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
  `status` int(11) DEFAULT NULL COMMENT '状态',
  `deleted` int(11) DEFAULT '0' COMMENT '删除标识',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8mb4 COMMENT='字典数据表';

-- ----------------------------
-- Records of sys_dict_data
-- ----------------------------
BEGIN;
INSERT INTO `sys_dict_data` VALUES (1, 'UserSex', '男', '1', NULL, NULL, NULL, 1, '2022-12-05 11:44:28', 1, 0);
INSERT INTO `sys_dict_data` VALUES (2, 'UserSex', '女', '2', NULL, NULL, NULL, 2, '2023-05-06 15:55:27', 1, 0);
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
  `status` int(11) DEFAULT NULL COMMENT '状态',
  PRIMARY KEY (`file_id`) USING BTREE
) ENGINE=InnoDB AUTO_INCREMENT=8 DEFAULT CHARSET=utf8mb4 COMMENT='附件表';

-- ----------------------------
-- Records of sys_file
-- ----------------------------
BEGIN;
INSERT INTO `sys_file` VALUES (2, '889ff067jw1dvcljidmquj.jpg', '889ff067jw1dvcljidmquj.jpg', 'http://admin.yxboot.com/images/20231214/889ff067jw1dvcljidmquj.jpg', '20231214/889ff067jw1dvcljidmquj.jpg', '0beec3c2e5a9b0dc78d5bb49f5cfcd14', 'image/jpeg', 52288, NULL, NULL, NULL);
INSERT INTO `sys_file` VALUES (3, '889ff067jw1dvcljidmquj_看图王.jpg', '889ff067jw1dvcljidmquj_看图王.jpg', 'http://admin.yxboot.com/images/20231214/889ff067jw1dvcljidmquj_看图王.jpg', '20231214/889ff067jw1dvcljidmquj_看图王.jpg', '1f335b964590f16b199d134056120fd8', 'image/jpeg', 197000, NULL, NULL, NULL);
INSERT INTO `sys_file` VALUES (7, 'logo1.png', 'logo1.png', 'http://admin.yxboot.com/images/20231214/logo1.png', '20231214/logo1.png', '750dc69f60ecd82b7b7f1d87665c99ee', 'image/png', 165531, NULL, NULL, NULL);
COMMIT;

-- ----------------------------
-- Table structure for sys_log
-- ----------------------------
DROP TABLE IF EXISTS `sys_log`;
CREATE TABLE `sys_log` (
  `id` bigint(20) NOT NULL AUTO_INCREMENT COMMENT '编号',
  `username` varchar(255) DEFAULT NULL COMMENT '用户',
  `type` int(11) DEFAULT NULL COMMENT '日志类别',
  `operation` varchar(255) DEFAULT NULL COMMENT '记录信息',
  `method` varchar(255) DEFAULT NULL COMMENT '包',
  `params` text COMMENT '参数',
  `ip` varchar(255) DEFAULT NULL COMMENT 'ip',
  `create_time` datetime DEFAULT NULL COMMENT '创建时间',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COMMENT='日志表';

-- ----------------------------
-- Records of sys_log
-- ----------------------------
BEGIN;
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
  `type` int(11) DEFAULT NULL COMMENT '菜单类型',
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
  `status` int(11) DEFAULT NULL COMMENT '状态',
  `deleted` int(11) DEFAULT '0' COMMENT '删除标识',
  PRIMARY KEY (`menu_id`)
) ENGINE=InnoDB AUTO_INCREMENT=122 DEFAULT CHARSET=utf8mb4 COMMENT='菜单表';

-- ----------------------------
-- Records of sys_menu
-- ----------------------------
BEGIN;
INSERT INTO `sys_menu` VALUES (1, '系统管理', NULL, NULL, 2, 'ant-design:setting-outlined', '', 'LAYOUT', NULL, NULL, 15, NULL, NULL, NULL, NULL, 1, 0);
INSERT INTO `sys_menu` VALUES (2, '系统菜单管理', NULL, NULL, 2, 'ant-design:menu-outlined', '/sys/menu', '/sys/menu/menu.vue', 1, NULL, 4, NULL, NULL, NULL, NULL, 1, 0);
INSERT INTO `sys_menu` VALUES (3, '系统角色管理', NULL, NULL, 2, 'ant-design:smile-outlined', '/sys/role', '/sys/role/role.vue', 1, NULL, 5, NULL, NULL, NULL, NULL, 1, 0);
INSERT INTO `sys_menu` VALUES (4, '系统用户管理', NULL, NULL, 2, 'ant-design:team-outlined', '/sys/user', '/sys/user/user.vue', 1, NULL, 1, NULL, NULL, NULL, NULL, 1, 0);
INSERT INTO `sys_menu` VALUES (5, '字典管理', NULL, NULL, 2, 'ant-design:read-outlined', '/sys/dict', '/sys/dict/dict.vue', 1, NULL, 6, NULL, NULL, NULL, NULL, 1, 0);
INSERT INTO `sys_menu` VALUES (44, '系统部门管理', '', NULL, 2, 'ant-design:apartment-outlined', '/sys/dept', '/sys/dept/dept.vue', 1, NULL, 2, NULL, NULL, NULL, NULL, 1, 0);
INSERT INTO `sys_menu` VALUES (64, '开发工具', NULL, NULL, 2, 'ant-design:tool-outlined', '', 'LAYOUT', NULL, NULL, 20, NULL, NULL, NULL, NULL, 1, 0);
INSERT INTO `sys_menu` VALUES (65, '接口文档', NULL, NULL, 2, 'ant-design:file-protect-outlined', 'http://admin.yxboot.com:9000/doc.html', '/dev', 64, NULL, 1, NULL, NULL, NULL, NULL, 1, 0);
INSERT INTO `sys_menu` VALUES (70, '代码生成', '', NULL, 2, 'ant-design:rocket-outlined', '/dev/generator', '/dev/generator/generator.vue', 64, NULL, 2, NULL, NULL, NULL, NULL, 1, 0);
INSERT INTO `sys_menu` VALUES (74, '关于我们', '', NULL, 2, 'ant-design:coffee-outlined', '/sys/about', '/sys/about/index.vue', NULL, NULL, 21, NULL, NULL, NULL, NULL, 1, 0);
INSERT INTO `sys_menu` VALUES (77, '新增部门', NULL, 'sysDept:create', 3, NULL, NULL, NULL, 44, NULL, NULL, NULL, NULL, NULL, NULL, 1, 0);
INSERT INTO `sys_menu` VALUES (78, '新增用户', NULL, 'user:create', 3, NULL, NULL, NULL, 4, NULL, NULL, NULL, NULL, NULL, NULL, 1, 0);
INSERT INTO `sys_menu` VALUES (79, '编辑用户', '', 'user:edit', 3, '', NULL, NULL, 4, NULL, NULL, NULL, NULL, NULL, NULL, 1, 0);
INSERT INTO `sys_menu` VALUES (80, '删除用户', '', 'user:remove', 3, '', NULL, NULL, 4, NULL, NULL, NULL, NULL, NULL, NULL, 1, 0);
INSERT INTO `sys_menu` VALUES (81, '重置密码', NULL, 'user:resetPassword', 3, NULL, NULL, NULL, 4, NULL, NULL, NULL, NULL, NULL, NULL, 1, 0);
INSERT INTO `sys_menu` VALUES (82, '编辑部门', '', 'sysDept:edit', 3, '', NULL, NULL, 44, NULL, NULL, NULL, NULL, NULL, NULL, 1, 0);
INSERT INTO `sys_menu` VALUES (83, '删除部门', '', 'sysDept:remove', 3, '', NULL, NULL, 44, NULL, NULL, NULL, NULL, NULL, NULL, 1, 0);
INSERT INTO `sys_menu` VALUES (84, '首页', '', NULL, 2, 'ant-design:home-outlined', '/index', '/sys/home/index.vue', NULL, NULL, 10, NULL, NULL, NULL, NULL, 1, 0);
INSERT INTO `sys_menu` VALUES (104, '新增菜单', '', 'sysMenu:create', 3, '', NULL, NULL, 2, NULL, NULL, NULL, NULL, NULL, NULL, 1, 0);
INSERT INTO `sys_menu` VALUES (105, '编辑菜单', '', 'sysMenu:edit', 3, '', NULL, NULL, 2, NULL, NULL, NULL, NULL, NULL, NULL, 1, 0);
INSERT INTO `sys_menu` VALUES (106, '删除菜单', '', 'sysMenu:remove', 3, '', NULL, NULL, 2, NULL, NULL, NULL, NULL, NULL, NULL, 1, 0);
INSERT INTO `sys_menu` VALUES (107, '新增角色', '', 'sysRole:create', 3, '', NULL, NULL, 3, NULL, NULL, NULL, NULL, NULL, NULL, 1, 0);
INSERT INTO `sys_menu` VALUES (108, '编辑角色', '', 'sysRole:edit', 3, '', NULL, NULL, 3, NULL, NULL, NULL, NULL, NULL, NULL, 1, 0);
INSERT INTO `sys_menu` VALUES (109, '删除角色', '', 'sysRole:remove', 3, '', NULL, NULL, 3, NULL, NULL, NULL, NULL, NULL, NULL, 1, 0);
INSERT INTO `sys_menu` VALUES (110, '新增字典', '', 'sysDict:create', 3, '', NULL, NULL, 5, NULL, NULL, NULL, NULL, NULL, NULL, 1, 0);
INSERT INTO `sys_menu` VALUES (111, '编辑字典', '', 'sysDict:edit', 3, '', NULL, NULL, 5, NULL, NULL, NULL, NULL, NULL, NULL, 1, 0);
INSERT INTO `sys_menu` VALUES (112, '删除字典', '', 'sysDict:remove', 3, '', NULL, NULL, 5, NULL, NULL, NULL, NULL, NULL, NULL, 1, 0);
INSERT INTO `sys_menu` VALUES (113, '新增字典数据', '', 'sysDict:createData', 3, '', NULL, NULL, 5, NULL, NULL, NULL, NULL, NULL, NULL, 1, 0);
INSERT INTO `sys_menu` VALUES (114, '编辑字典数据', '', 'sysDict:editData', 3, '', NULL, NULL, 5, NULL, NULL, NULL, NULL, NULL, NULL, 1, 0);
INSERT INTO `sys_menu` VALUES (115, '删除字典数据', '', 'sysDict:removeData', 3, '', NULL, NULL, 5, NULL, NULL, NULL, NULL, NULL, NULL, 1, 0);
INSERT INTO `sys_menu` VALUES (116, '查看字典数据', '', 'sysDict:dictData', 3, '', NULL, NULL, 5, NULL, NULL, NULL, NULL, NULL, NULL, 1, 0);
INSERT INTO `sys_menu` VALUES (117, '模板配置', NULL, 'generator:config', 3, NULL, NULL, NULL, 70, NULL, 1, NULL, NULL, NULL, NULL, 1, 0);
INSERT INTO `sys_menu` VALUES (118, '批量生成', NULL, 'generator:batch', 3, NULL, NULL, NULL, 70, NULL, 2, NULL, NULL, NULL, NULL, 1, 0);
INSERT INTO `sys_menu` VALUES (119, '预览', NULL, 'generator:preview', 3, NULL, NULL, NULL, 70, NULL, 3, NULL, NULL, NULL, NULL, 1, 0);
INSERT INTO `sys_menu` VALUES (120, '生成代码', NULL, 'generator:code', 3, NULL, NULL, NULL, 70, NULL, 4, NULL, NULL, NULL, NULL, 1, 0);
INSERT INTO `sys_menu` VALUES (121, '测试', '', NULL, 2, '', '/test', '/test/icon.vue', 64, NULL, NULL, NULL, NULL, NULL, NULL, 1, 1);
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
  `status` int(11) DEFAULT NULL COMMENT '状态（0:无效 1:有效）',
  `deleted` int(11) DEFAULT '0' COMMENT '删除标识（0:未删除  1:已删除）',
  PRIMARY KEY (`role_id`) USING BTREE
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8mb4 ROW_FORMAT=DYNAMIC COMMENT='系统角色表';

-- ----------------------------
-- Records of sys_role
-- ----------------------------
BEGIN;
INSERT INTO `sys_role` VALUES (1, '管理员', NULL, '系统管理员', NULL, NULL, NULL, NULL, NULL, NULL, 1, 0);
INSERT INTO `sys_role` VALUES (2, '开发人员', NULL, '开发人员', NULL, NULL, NULL, NULL, NULL, NULL, 1, 0);
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
) ENGINE=InnoDB AUTO_INCREMENT=2109 DEFAULT CHARSET=utf8mb4 ROW_FORMAT=DYNAMIC COMMENT='系统角色菜单表';

-- ----------------------------
-- Records of sys_role_menu
-- ----------------------------
BEGIN;
INSERT INTO `sys_role_menu` VALUES (1689, 1, 77);
INSERT INTO `sys_role_menu` VALUES (1690, 1, 78);
INSERT INTO `sys_role_menu` VALUES (1691, 1, 79);
INSERT INTO `sys_role_menu` VALUES (1692, 1, 80);
INSERT INTO `sys_role_menu` VALUES (1693, 1, 81);
INSERT INTO `sys_role_menu` VALUES (1694, 1, 82);
INSERT INTO `sys_role_menu` VALUES (1695, 1, 83);
INSERT INTO `sys_role_menu` VALUES (1696, 1, 104);
INSERT INTO `sys_role_menu` VALUES (1697, 1, 105);
INSERT INTO `sys_role_menu` VALUES (1698, 1, 106);
INSERT INTO `sys_role_menu` VALUES (1699, 1, 107);
INSERT INTO `sys_role_menu` VALUES (1700, 1, 108);
INSERT INTO `sys_role_menu` VALUES (1701, 1, 109);
INSERT INTO `sys_role_menu` VALUES (1702, 1, 110);
INSERT INTO `sys_role_menu` VALUES (1703, 1, 111);
INSERT INTO `sys_role_menu` VALUES (1704, 1, 112);
INSERT INTO `sys_role_menu` VALUES (1705, 1, 113);
INSERT INTO `sys_role_menu` VALUES (1706, 1, 114);
INSERT INTO `sys_role_menu` VALUES (1707, 1, 115);
INSERT INTO `sys_role_menu` VALUES (1708, 1, 116);
INSERT INTO `sys_role_menu` VALUES (1709, 1, 121);
INSERT INTO `sys_role_menu` VALUES (1710, 1, 4);
INSERT INTO `sys_role_menu` VALUES (1711, 1, 65);
INSERT INTO `sys_role_menu` VALUES (1712, 1, 117);
INSERT INTO `sys_role_menu` VALUES (1713, 1, 44);
INSERT INTO `sys_role_menu` VALUES (1714, 1, 70);
INSERT INTO `sys_role_menu` VALUES (1715, 1, 118);
INSERT INTO `sys_role_menu` VALUES (1716, 1, 119);
INSERT INTO `sys_role_menu` VALUES (1717, 1, 2);
INSERT INTO `sys_role_menu` VALUES (1718, 1, 120);
INSERT INTO `sys_role_menu` VALUES (1719, 1, 3);
INSERT INTO `sys_role_menu` VALUES (1720, 1, 5);
INSERT INTO `sys_role_menu` VALUES (1721, 1, 84);
INSERT INTO `sys_role_menu` VALUES (1722, 1, 1);
INSERT INTO `sys_role_menu` VALUES (1723, 1, 64);
INSERT INTO `sys_role_menu` VALUES (1724, 1, 74);
INSERT INTO `sys_role_menu` VALUES (2075, 2, 77);
INSERT INTO `sys_role_menu` VALUES (2076, 2, 78);
INSERT INTO `sys_role_menu` VALUES (2077, 2, 79);
INSERT INTO `sys_role_menu` VALUES (2078, 2, 80);
INSERT INTO `sys_role_menu` VALUES (2079, 2, 82);
INSERT INTO `sys_role_menu` VALUES (2080, 2, 83);
INSERT INTO `sys_role_menu` VALUES (2081, 2, 65);
INSERT INTO `sys_role_menu` VALUES (2082, 2, 117);
INSERT INTO `sys_role_menu` VALUES (2083, 2, 118);
INSERT INTO `sys_role_menu` VALUES (2084, 2, 84);
INSERT INTO `sys_role_menu` VALUES (2085, 2, 74);
INSERT INTO `sys_role_menu` VALUES (2086, 2, 44);
INSERT INTO `sys_role_menu` VALUES (2087, 2, 2);
INSERT INTO `sys_role_menu` VALUES (2088, 2, 104);
INSERT INTO `sys_role_menu` VALUES (2089, 2, 105);
INSERT INTO `sys_role_menu` VALUES (2090, 2, 106);
INSERT INTO `sys_role_menu` VALUES (2091, 2, 107);
INSERT INTO `sys_role_menu` VALUES (2092, 2, 108);
INSERT INTO `sys_role_menu` VALUES (2093, 2, 109);
INSERT INTO `sys_role_menu` VALUES (2094, 2, 3);
INSERT INTO `sys_role_menu` VALUES (2095, 2, 5);
INSERT INTO `sys_role_menu` VALUES (2096, 2, 110);
INSERT INTO `sys_role_menu` VALUES (2097, 2, 111);
INSERT INTO `sys_role_menu` VALUES (2098, 2, 112);
INSERT INTO `sys_role_menu` VALUES (2099, 2, 113);
INSERT INTO `sys_role_menu` VALUES (2100, 2, 114);
INSERT INTO `sys_role_menu` VALUES (2101, 2, 115);
INSERT INTO `sys_role_menu` VALUES (2102, 2, 116);
INSERT INTO `sys_role_menu` VALUES (2103, 2, 119);
INSERT INTO `sys_role_menu` VALUES (2104, 2, 120);
INSERT INTO `sys_role_menu` VALUES (2105, 2, 70);
INSERT INTO `sys_role_menu` VALUES (2106, 2, 64);
INSERT INTO `sys_role_menu` VALUES (2107, 2, 4);
INSERT INTO `sys_role_menu` VALUES (2108, 2, 1);
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
  `status` int(11) DEFAULT NULL COMMENT '状态（0:无效 1:有效）',
  `deleted` int(11) DEFAULT '0' COMMENT '删除标识(0:未删除 1:已删除)',
  PRIMARY KEY (`user_id`) USING BTREE
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8mb4 ROW_FORMAT=DYNAMIC COMMENT='系统用户表';

-- ----------------------------
-- Records of sys_user
-- ----------------------------
BEGIN;
INSERT INTO `sys_user` VALUES (1, 'admin', '$2a$10$nHW4XKBj5J1U7so0gDSt2.iOVdsZHKEf.I3TUWlWSuPc0kM99JuOa', '管理员', 'http://admin.yxboot.com/images/20231214/889ff067jw1dvcljidmquj_看图王.jpg', '18612345678', 'admin@yxboot.com', 'UserSex@1', 56, NULL, NULL, NULL, NULL, NULL, NULL, NULL, 1, 0);
INSERT INTO `sys_user` VALUES (2, 'yxboot', '$2a$10$IQAPQ0sw5gKjh8IsWWTssui0a3MF6mJ8tJqOT7uqiCiqifOpeQ5ga', 'YXBoot', 'http://admin.yxboot.com/images/20231214/logo1.png', '15145678910', 'dev@yxboot.com', 'UserSex@2', 56, NULL, NULL, NULL, NULL, NULL, NULL, NULL, 1, 0);
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
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8mb4 ROW_FORMAT=DYNAMIC COMMENT='系统用户角色表';

-- ----------------------------
-- Records of sys_user_role
-- ----------------------------
BEGIN;
INSERT INTO `sys_user_role` VALUES (1, 1, 1);
INSERT INTO `sys_user_role` VALUES (2, 2, 2);
COMMIT;

SET FOREIGN_KEY_CHECKS = 1;
