package com.yxboot.common.pagination;

import com.mybatisflex.core.paginate.Page;
import lombok.Data;
import lombok.EqualsAndHashCode;

/**
 * 封装分页请求参数
 *
 * @author Boya
 */
@Data
@EqualsAndHashCode(callSuper = false)
public class PageRequest {
    private static final String ORDER_ASC = "ascend";
    private static final String ORDER_DESC = "descend";

    /**
     * 当前页面
     */
    private Long pageNumber = 1L;
    /**
     * 每页条数
     */
    private Long pageSize = 20L;
    /**
     * 排序字段
     */
    private String field;
    /**
     * 排序方式
     */
    private String order;

    public <T> Page<T> convertToPage() {
        return Page.of(pageNumber, pageSize);
    }

}
