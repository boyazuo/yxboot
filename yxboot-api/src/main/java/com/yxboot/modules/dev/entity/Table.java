package com.yxboot.modules.dev.entity;

import java.util.List;

/**
 * 表数据
 *
 * @author Boya
 */
public class Table {
    /**
     * 表的名称，如：sys_user
     */
    private String name;

    /**
     * 表的注释
     */
    private String comments;

    /**
     * 表的主键
     */
    private Column pk;

    /**
     * 表的列名(不包含主键)
     */
    private List<Column> columns;

    /**
     * 类名(第一个字母大写)，如：sys_user => SysUser
     */
    private String className;

    /**
     * 类名(第一个字母小写)，如：sys_user => sysUser
     */
    private String classname;

    /**
     * 表名前缀，如：sys_user => sys
     */
    private String prefix;

    /**
     * 表名后缀，如：sys_uer => user
     */
    private String suffix;

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getComments() {
        return comments;
    }

    public void setComments(String comments) {
        this.comments = comments;
    }

    public Column getPk() {
        return pk;
    }

    public void setPk(Column pk) {
        this.pk = pk;
    }

    public List<Column> getColumns() {
        return columns;
    }

    public void setColumns(List<Column> columns) {
        this.columns = columns;
    }

    public String getClassName() {
        return className;
    }

    public void setClassName(String className) {
        this.className = className;
    }

    public String getClassname() {
        return classname;
    }

    public void setClassname(String classname) {
        this.classname = classname;
    }

    public String getPrefix() {
        return prefix;
    }

    public void setPrefix(String prefix) {
        this.prefix = prefix;
    }

    public String getSuffix() {
        return suffix;
    }

    public void setSuffix(String suffix) {
        this.suffix = suffix;
    }
}
