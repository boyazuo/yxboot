package com.yxboot.config.mybatisflex.handler;

import java.sql.CallableStatement;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;
import org.apache.ibatis.type.JdbcType;
import org.apache.ibatis.type.TypeHandler;
import com.yxboot.common.cache.DictCacheUtil;
import com.yxboot.common.vo.Dict;
import com.yxboot.modules.sys.entity.SysDictData;
import cn.hutool.extra.spring.SpringUtil;

/**
 * 字典类型处理
 * 
 * @author Boya
 */
public class DictTypeHandler implements TypeHandler<Dict> {
    private DictCacheUtil dictCache;

    public DictCacheUtil getDictCache() {
        if (dictCache == null) {
            dictCache = SpringUtil.getBean(DictCacheUtil.class);
        }
        return dictCache;
    }

    @Override
    public void setParameter(PreparedStatement ps, int i, Dict parameter, JdbcType jdbcType) throws SQLException {
        if (parameter == null) {
            ps.setString(i, null);
        } else {
            ps.setString(i, parameter.getValue());
        }
    }

    @Override
    public Dict getResult(ResultSet rs, String columnName) throws SQLException {
        return getDict(rs.getString(columnName));
    }

    @Override
    public Dict getResult(ResultSet rs, int columnIndex) throws SQLException {
        return getDict(rs.getString(columnIndex));
    }

    @Override
    public Dict getResult(CallableStatement cs, int columnIndex) throws SQLException {
        return getDict(cs.getString(columnIndex));
    }

    private Dict getDict(String value) {
        if (value == null) {
            return null;
        }
        SysDictData dict = getDictCache().getDict(value);
        if (dict == null) {
            return new Dict(value);
        }
        return new Dict(dict.getDictCode(), dict.getLabel(), value);
    }
}
