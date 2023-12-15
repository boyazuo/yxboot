package com.yxboot.modules.sys.filler;

import cn.hutool.core.map.MapUtil;
import com.baomidou.mybatisplus.core.conditions.query.QueryWrapper;
import com.baomidou.mybatisplus.core.toolkit.Wrappers;
import com.yxboot.common.base.Filler;
import com.yxboot.modules.sys.entity.SysDept;
import com.yxboot.modules.sys.entity.SysUser;
import com.yxboot.modules.sys.service.SysDeptService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Component;

import java.util.Collection;
import java.util.List;
import java.util.Map;

@Component
@RequiredArgsConstructor
public class SysDeptFiller extends Filler<Long, SysDept> {

    private final SysDeptService sysDeptService;

    @Override
    protected Map<Long, SysDept> requestResult(Collection<Long> ids) {
        QueryWrapper<SysDept> wrapper = Wrappers.query(new SysDept());
        wrapper.in("dept_id", ids);
        List<SysDept> menuList = sysDeptService.list(wrapper);
        Map<Long, SysDept> map = MapUtil.newHashMap();
        for (SysDept menu : menuList) {
            map.put(menu.getDeptId(), menu);
        }
        return map;
    }

    private Provider<Long, SysDept, SysUser> DEPT_PROVIDER = new Provider<>() {
        @Override
        public Long get(SysUser menu) {
            return menu.getDeptId();
        }

        @Override
        public void set(SysUser sysUser, Map<Long, SysDept> map) {
            SysDept parent = map.get(sysUser.getDeptId());
            sysUser.setDeptName(parent != null ? parent.getName() : null);
        }
    };

    public void fillSysDept(Collection<SysUser> dept) {
        fill(dept, DEPT_PROVIDER);
    }

    public void fillSysDept(SysUser dept) {
        fill(dept, DEPT_PROVIDER );
    }

}
