package com.yxboot.modules.dev.vo;

import io.swagger.v3.oas.annotations.media.Schema;
import lombok.Data;

import java.io.Serializable;
import java.util.Objects;

@Data
public class GeneratorConfig implements Serializable {
    /**
     * 前端路径
     */
    @Schema(description = "前端路径")
    private String frontPath;

    /**
     * 作者
     */
    @Schema(description = "作者")
    private String author;

    /**
     * 邮箱
     */
    @Schema(description = "邮箱")
    private String email;

    /**
     * 后端包名
     */
    @Schema(description = "后端包名")
    private String pkg;

    /**
     * 多表格
     */
    @Schema(description = "单表格")
    private String table;

    /**
     * 多表格
     */
    @Schema(description = "多表格")
    private String[] tables;

    /**
     * 1前端代码 2 后台代码
     */
    @Schema(description = "1前端代码 2 后台代码")
    private Integer type;

    public String[] getTables() {
        return Objects.requireNonNullElseGet(tables, () -> new String[]{table});
    }

}
