package com.yxboot.common.base;

import cn.hutool.core.collection.CollUtil;
import lombok.NonNull;

import java.util.Collection;
import java.util.Map;
import java.util.Set;

/**
 * 数据填充者
 * @param <C> 查询条件类型
 * @param <O> 输出的对象类型
 */
public abstract class Filler<C, O> {
    /**
     * 条件提供者，数据填充者，主要职责，获取查询条件，填充数据
     * @param <C> 条件类型
     * @param <O> 输出数据类型-最终回填的数据类型
     * @param <I> 提供条件类型，也是最终需要回填数据的对象类型
     */
    public interface Provider<C, O, I> {
        default C get(I i) {
            return null;
        }
        default Collection<C> getAsCollection(I i){
            Collection<C> cs = CollUtil.newHashSet();
            C c = get(i);
            if(null != c) {
                cs.add(c);
            }
            return cs;
        }
        default void set(@NonNull Collection<I> list, Map<C, O> map) {
            list.forEach(item -> this.set(item, map));
        }
        void set(I i, Map<C, O> map);
    }
    /**
     * 条件提供者，数据填充者，主要职责，获取查询条件，填充数据
     * @param <O> 输出数据类型-最终回填的数据类型
     * @param <I> 提供条件类型，也是最终需要回填数据的对象类型
     */
    public interface IdProvider<O, I> extends Provider<Long, O, I>{
        @Override
        default Long get(I i) {
            return null;
        }
        @Override
        default Collection<Long> getAsCollection(I i){
            Collection<Long> cs = CollUtil.newHashSet();
            Long c = get(i);
            if(null != c) {
                cs.add(c);
            }
            return cs;
        }
        @Override
        default void set(@NonNull Collection<I> list, Map<Long, O> map) {
            list.forEach(item -> this.set(item, map));
        }
        @Override
        void set(I i, Map<Long, O> map);
    }

    /**
     * 填充数据
     * @param list 需要填充数据的集合
     * @param provider 条件提供者，数据填充者
     * @param <I> 需要填充数据的对象类型
     */
    protected <I> void fill(Collection<I> list, Provider<C, O, I> provider){
        Set<C> cs = CollUtil.newHashSet();
        list.forEach(item -> {
            cs.addAll(provider.getAsCollection(item));
        });
        if (CollUtil.isNotEmpty(cs)) {
            Map<C, O> result = requestResult(cs);
            provider.set(list, result);
        }
    }

    protected <I> void fill(I entity, Provider<C, O, I> provider){
        Set<C> cs = CollUtil.newHashSet();

        cs.addAll(provider.getAsCollection(entity));

        if (CollUtil.isNotEmpty(cs)) {
            Map<C, O> result = requestResult(cs);
            provider.set(entity, result);
        }
    }

    /**
     * 根据条件查询数据
     * @param cs 条件集合
     * @return 将要填充的数据
     */
    protected abstract Map<C, O> requestResult(Collection<C> cs);
}
