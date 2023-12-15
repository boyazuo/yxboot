package com.yxboot.modules.sys.filler;

import cn.hutool.core.map.MapUtil;
import com.baomidou.mybatisplus.core.conditions.query.QueryWrapper;
import com.baomidou.mybatisplus.core.toolkit.Wrappers;
import com.yxboot.common.base.Filler;
import com.yxboot.modules.sys.entity.SysMenu;
import com.yxboot.modules.sys.service.SysMenuService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Component;

import java.util.Collection;
import java.util.List;
import java.util.Map;

@Component
@RequiredArgsConstructor
public class SysMenuFiller extends Filler<Long, SysMenu> {
    private final SysMenuService sysMenuService;

    @Override
    protected Map<Long, SysMenu> requestResult(Collection<Long> ids) {
        QueryWrapper<SysMenu> wrapper = Wrappers.query(new SysMenu());
        wrapper.in("menu_id", ids);
        List<SysMenu> menuList = sysMenuService.list(wrapper);
        Map<Long, SysMenu> map = MapUtil.newHashMap();
        for (SysMenu menu : menuList) {
            map.put(menu.getMenuId(), menu);
        }
        return map;
    }

    private Provider<Long, SysMenu, SysMenu> MENU_PROVIDER = new Provider<Long, SysMenu, SysMenu>() {
        @Override
        public Long get(SysMenu menu) {
            return menu.getParentId();
        }

        @Override
        public void set(SysMenu area, Map<Long, SysMenu> map) {
            SysMenu parent = map.get(area.getParentId());
            area.setParentName(parent != null ? parent.getName() : null);
        }
    };

    public void fillSysMenu(Collection<SysMenu> menus) {
        fill(menus, MENU_PROVIDER);
    }
}
