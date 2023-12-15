package com.yxboot.common.pagination;

import cn.hutool.core.util.StrUtil;
import com.baomidou.mybatisplus.core.metadata.IPage;
import com.baomidou.mybatisplus.core.metadata.OrderItem;
import com.baomidou.mybatisplus.extension.plugins.pagination.Page;
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
    private Long current = 1L;
    /**
     * 每页条数
     */
    private Long size = 20L;
    /**
     * 排序字段
     */
    private String field;
    /**
     * 排序方式
     */
    private String order;

    public <T> IPage<T> convertToPage(){
        Page<T> page =  new Page<>(current, size);
        if (StrUtil.isNotEmpty(field)) {
            page.addOrder(build(field, order));
        }
        return page;
    }

    private OrderItem build(String column, String order) {
        return new OrderItem(column, StrUtil.equals(order, ORDER_ASC));
    }
}
