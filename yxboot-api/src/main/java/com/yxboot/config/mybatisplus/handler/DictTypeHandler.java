package com.yxboot.config.mybatisplus.handler;

import cn.hutool.extra.spring.SpringUtil;
import com.yxboot.common.cache.DictCacheUtil;
import com.yxboot.common.vo.Dict;
import com.yxboot.modules.sys.entity.SysDictData;
import org.apache.ibatis.type.BaseTypeHandler;
import org.apache.ibatis.type.JdbcType;

import java.sql.CallableStatement;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;

/**
 * 字典类型处理
 * @author Boya
 */
public class DictTypeHandler extends BaseTypeHandler<Dict> {
    private DictCacheUtil dictCache;

    public DictCacheUtil getDictCache() {
        if(dictCache == null) {
            dictCache = SpringUtil.getBean(DictCacheUtil.class);
        }
        return dictCache;
    }

    @Override
    public void setNonNullParameter(PreparedStatement ps, int i, Dict parameter, JdbcType jdbcType) throws SQLException {
        ps.setObject(i, parameter.getValue());
    }

    @Override
    public Dict getNullableResult(ResultSet rs, String columnName) throws SQLException {
        return getDict(rs.getString(columnName));
    }

    @Override
    public Dict getNullableResult(ResultSet rs, int columnIndex) throws SQLException {
        return getDict(rs.getString(columnIndex));
    }

    @Override
    public Dict getNullableResult(CallableStatement cs, int columnIndex) throws SQLException {
        return getDict(cs.getString(columnIndex));
    }

    private Dict getDict(String value) {
        SysDictData dict = getDictCache().getDict(value);
        if(dict == null) {
            return new Dict(value);
        }
        return new Dict(dict.getDictCode(), dict.getLabel(), value);
    }
}
