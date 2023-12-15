package com.yxboot.utils;

import cn.hutool.core.date.DateUtil;
import cn.hutool.core.exceptions.ExceptionUtil;
import cn.hutool.core.io.IoUtil;
import cn.hutool.core.util.StrUtil;
import com.yxboot.modules.dev.entity.Column;
import com.yxboot.modules.dev.entity.DevGeneratorTemplate;
import com.yxboot.modules.dev.entity.Table;
import com.yxboot.modules.dev.vo.GeneratorConfig;
import freemarker.cache.StringTemplateLoader;
import freemarker.template.Template;
import freemarker.template.TemplateException;
import lombok.extern.slf4j.Slf4j;
import org.apache.commons.configuration.Configuration;
import org.apache.commons.configuration.ConfigurationException;
import org.apache.commons.configuration.PropertiesConfiguration;
import org.apache.commons.lang3.text.WordUtils;
import org.jetbrains.annotations.NotNull;
import org.springframework.ui.freemarker.FreeMarkerTemplateUtils;

import java.io.File;
import java.io.IOException;
import java.util.*;
import java.util.zip.ZipEntry;
import java.util.zip.ZipOutputStream;

@Slf4j
public class FreemarkerGenutils {

    public static void generatorCode(Map<String, String> tableMap, List<Map<String, String>> columns, ZipOutputStream zip, GeneratorConfig generatorConfig, List<DevGeneratorTemplate> list) throws IOException, TemplateException {
        Table table = getTable(tableMap, columns);
        //封装模板数据
        Map<String, Object> map = getStringObjectMap(generatorConfig, table);
        //获取模板
        for (DevGeneratorTemplate devGeneratorTemplate : list) {
            StringTemplateLoader stringTemplateLoader = new StringTemplateLoader();
            freemarker.template.Configuration configuration = new freemarker.template.Configuration(freemarker.template.Configuration.getVersion());

            String str = devGeneratorTemplate.getContent();
            stringTemplateLoader.putTemplate("template", str);
            configuration.setTemplateLoader(stringTemplateLoader);
            // 得到模板
            Template template = configuration.getTemplate("template", "utf-8");
            //文本转换
            String content = FreeMarkerTemplateUtils.processTemplateIntoString(template, map);
            try {
                //添加到zip
                String filePath = getFilePathName(devGeneratorTemplate.getName(), generatorConfig.getPkg(), table);
                zip.putNextEntry(new ZipEntry(filePath));
                IoUtil.write(zip, "UTF-8", false, content.toString());
                zip.closeEntry();
            } catch (Exception e) {
                log.error("渲染模板失败，表名：" + table.getName(), e);
                ExceptionUtil.unwrap(e);
            }
        }

    }

    @NotNull
    private static Map<String, Object> getStringObjectMap(GeneratorConfig generatorConfig, Table table) {
        Map<String, Object> map = new HashMap<>();
        map.put("tableName", table.getName());
        map.put("comments", table.getComments());
        map.put("pk", table.getPk());
        map.put("className", table.getClassName());
        map.put("classname", table.getClassname());
        map.put("tablePrefix", table.getPrefix());
        map.put("tableSuffix", StrUtil.upperFirst(table.getSuffix()));
        map.put("tablesuffix", table.getSuffix());
        map.put("columns", table.getColumns());
        map.put("package", generatorConfig.getPkg());
        map.put("author", generatorConfig.getAuthor());
        map.put("email", generatorConfig.getEmail());
        map.put("datetime", DateUtil.formatDate(new Date()));
        return map;
    }

    @NotNull
    private static Table getTable(Map<String, String> tableMap, List<Map<String, String>> columns) {
        Configuration config = getConfig();
        //表信息
        Table table = new Table();
        table.setName(tableMap.get("tableName"));
        table.setComments(tableMap.get("tableComment"));
        //表名转换成Java类名
        String className = tableToJava(table.getName(), config.getString("autoRemovePre"));
        table.setClassName(className);
        table.setClassname(StrUtil.lowerFirst(className));
        table.setPrefix(StrUtil.subBefore(table.getName(), "_", false));
        table.setSuffix(StrUtil.toCamelCase(StrUtil.subAfter(table.getName(), "_", false)));

        //列信息
        List<Column> columsList = new ArrayList<>();
        for (Map<String, String> column : columns) {
            Column columnDO = new Column();
            columnDO.setName(column.get("columnName"));
            columnDO.setDataType(column.get("dataType"));
            columnDO.setComments(column.get("columnComment"));
            columnDO.setExtra(column.get("extra"));

            //列名转换成Java属性名
            String attrName = columnToJava(columnDO.getName());
            columnDO.setAttrName(attrName);
            columnDO.setAttrname(StrUtil.lowerFirst(attrName));

            //列的数据类型，转换成Java类型
            //String attrType = config.getString(ColumnDO.getDataType(), "unknowType");
            columnDO.setJdbcType(getJdbcType(config, columnDO.getDataType()));
            columnDO.setAttrType(getAttrType(config, columnDO.getDataType()));

            //是否主键
            if ("PRI".equalsIgnoreCase(column.get("columnKey")) && table.getPk() == null) {
                table.setPk(columnDO);
            }

            columsList.add(columnDO);
        }
        table.setColumns(columsList);

        //没主键，则第一个字段为主键
        if (table.getPk() == null) {
            table.setPk(table.getColumns().get(0));
        }
        return table;
    }

    public static String getFilePathName(String template, String packageName, Table table) {
        String packagePath = "main" + File.separator + "java" + File.separator;

        if (StrUtil.isNotBlank(packageName)) {
            packagePath += packageName.replace(".", File.separator) + File.separator;
        }
        if (template.contains("Entity.java")) {
            return packagePath + table.getPrefix() + File.separator + "entity" + File.separator + table.getClassName() + ".java";
        }
        if (template.contains("Mapper.java")) {
            return packagePath + table.getPrefix() + File.separator + "mapper" + File.separator + table.getClassName() + "Mapper.java";
        }
        if (template.contains("Mapper.xml")) {
            return "main" + File.separator + "resources" + File.separator + "mapper" + File.separator + table.getPrefix() + File.separator + table.getClassName() + "Mapper.xml";
        }
        if (template.contains("Service.java")) {
            return packagePath + table.getPrefix() + File.separator + "service" + File.separator + table.getClassName() + "Service.java";
        }
        if (template.contains("Controller.java")) {
            return packagePath + table.getPrefix() + File.separator + "controller" + File.separator + table.getClassName() + "Controller.java";
        }
        if (template.contains("data.ts")) {
            return  "views"+ File.separator+table.getPrefix() + File.separator +table.getSuffix() + File.separator + table.getSuffix() + ".data.ts";
        }
        if (template.contains("Entity.vue")) {
            return "views"+ File.separator+table.getPrefix() + File.separator +table.getSuffix() + File.separator + table.getSuffix() + ".vue";
        }
        if (template.contains("Drawer.vue")) {
            return "views"+ File.separator+table.getPrefix() + File.separator +table.getSuffix() + File.separator + StrUtil.upperFirst(table.getSuffix()) + "Drawer.vue";
        }
        if (template.contains("api.ts")) {
            return "api"+File.separator +table.getPrefix() + File.separator + table.getSuffix() + ".ts";
        }
        return null;
    }


    public static List<Map<String, Object>> generatorPreview(Map<String, String> tableMap, List<Map<String, String>> columns, GeneratorConfig generatorConfig, List<DevGeneratorTemplate> list) throws IOException, TemplateException {
        Table table = getTable(tableMap, columns);
        //封装模板数据
        Map<String, Object> map = getStringObjectMap(generatorConfig, table);
        List<Map<String, Object>> maplist = new ArrayList<>();
        //获取模板
        for (DevGeneratorTemplate devGeneratorTemplate : list) {
            System.out.println(devGeneratorTemplate.getName());
            Map<String, Object> map1 = new HashMap<>();
            String str = devGeneratorTemplate.getContent();
            freemarker.template.Configuration configuration = new freemarker.template.Configuration(freemarker.template.Configuration.getVersion());
            StringTemplateLoader stringTemplateLoader = new StringTemplateLoader();
            stringTemplateLoader.putTemplate("template", str);
            configuration.setTemplateLoader(stringTemplateLoader);
            // 得到模板
            Template template = configuration.getTemplate("template", "utf-8");
            String content = FreeMarkerTemplateUtils.processTemplateIntoString(template, map);
            String name = getFileName(devGeneratorTemplate.getName(), table);
            map1.put("name", name);
            map1.put("language", devGeneratorTemplate.getLanguage());
            map1.put("content", content);
            maplist.add(map1);
        }
        return maplist;
    }


    /**
     * 列名转换成Java属性名
     */
    private static String columnToJava(String columnName) {
        return WordUtils.capitalizeFully(columnName, new char[]{'_'}).replace("_", "");
    }

    /**
     * 表名转换成Java类名
     */
    private static String tableToJava(String tableName, String autoRemovePre) {
        if ("true".equals(autoRemovePre)) {
            tableName = tableName.substring(tableName.indexOf("_") + 1);
        }

        return columnToJava(tableName);
    }

    private static String getJdbcType(Configuration config, String dataType) {
        String type = config.getString(dataType);
        if (type != null) {
            return StrUtil.subBefore(type, "|", false);
        } else {
            throw new RuntimeException("数据类型异常！");
        }
    }

    private static String getAttrType(Configuration config, String dataType) {
        String type = config.getString(dataType);
        if (type != null) {
            return StrUtil.subAfter(type, "|", false);
        } else {
            throw new RuntimeException("数据类型异常！");
        }
    }


    public static String getFileName(String template, Table table) {
        if (template.contains("Entity.java")) {
            return table.getClassName() + ".java";
        }
        if (template.contains("Mapper.java")) {
            return table.getClassName() + "Mapper.java";
        }
        if (template.contains("Mapper.xml")) {
            return table.getClassName() + "Mapper.xml";
        }
        if (template.contains("Service.java")) {
            return table.getClassName() + "Service.java";
        }
        if (template.contains("Controller.java")) {
            return table.getClassName() + "Controller.java";
        }
        if (template.contains("data.ts")) {
            return table.getClassName() + ".data.ts";
        }
        if (template.contains("Entity.vue")) {
            return table.getClassName() + ".vue";
        }
        if (template.contains("Drawer.vue")) {
            return table.getClassName() + "Drawer.vue";
        }
        if (template.contains("api.ts")) {
            return  table.getClassName() + ".ts";
        }
        return null;
    }

    /**
     * 获取配置信息
     */
    public static Configuration getConfig() {
        try {
            return new PropertiesConfiguration("generator.properties");
        } catch (ConfigurationException e) {
            log.error("获取配置文件失败", e);
            ExceptionUtil.unwrap(e);
            return null;
        }
    }

}
