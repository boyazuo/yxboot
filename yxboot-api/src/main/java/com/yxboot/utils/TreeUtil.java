package com.yxboot.utils;

import cn.hutool.core.collection.CollUtil;
import cn.hutool.core.map.MapUtil;
import com.yxboot.modules.sys.entity.SysDept;
import com.yxboot.modules.sys.entity.SysMenu;

import java.util.Collection;
import java.util.List;
import java.util.Map;

public class TreeUtil {
    static interface NodeHelper<N> {
        N root();
        Object getPrimaryKey(N n);
        Object getParentKey(N n);
        void addChild(N parent, N child);
        void addChildren(N parent, List<N> children);
    }
    //集合转tress，返回root节点
    private static <T> T trees(Collection<T> collection, NodeHelper<T> nodeHelper) {
        T root = nodeHelper.root();
        //存储所有节点，key = 节点key, value= 节点对象
        Map<Object, T> map = MapUtil.newHashMap();
        map.put(nodeHelper.getPrimaryKey(root), root);
        //存储所有未找到父级的节点，key = 父级节点key, value= 所有子节点数组
        Map<Object, List<T>> notFoundMap = MapUtil.newHashMap();
        if(CollUtil.isNotEmpty(collection)) {
            collection.forEach(t -> {
                //先寻找父节点，未找到放入notFoundMap中
                Object parentKey = nodeHelper.getParentKey(t);
                if(map.containsKey(parentKey)) {
                    T parent = map.get(parentKey);
                    nodeHelper.addChild(parent, t);
                } else {
                    List<T> list = notFoundMap.get(parentKey);
                    if(CollUtil.isEmpty(list)) {
                        list = CollUtil.newArrayList();
                        notFoundMap.put(parentKey, list);
                    }
                    list.add(t);
                }
                //从 notFoundMap中找自己的children
                List<T> children = notFoundMap.get(nodeHelper.getPrimaryKey(t));
                if(CollUtil.isNotEmpty(children)) {
                    nodeHelper.addChildren(t, children);
                }
                //放入节点池中
                map.put(nodeHelper.getPrimaryKey(t), t);
            });
        }
        return root;
    }

    private final static NodeHelper<SysMenu> MENU_HELPER = new NodeHelper<SysMenu>() {
        @Override
        public SysMenu root() {
            return new SysMenu();
        }
        @Override
        public Object getPrimaryKey(SysMenu sysMenu) {
            return sysMenu.getMenuId();
        }

        @Override
        public Object getParentKey(SysMenu sysMenu) {
            return sysMenu.getParentId();
        }

        @Override
        public void addChild(SysMenu parent, SysMenu child) {
            List<SysMenu> children = parent.getChildren();
            if(children == null) {
                children = CollUtil.newArrayList();
            }
            children.add(child);
            parent.setChildren(children);
        }

        @Override
        public void addChildren(SysMenu parent, List<SysMenu> children) {
            parent.setChildren(children);
        }
    };

    private final static NodeHelper<SysDept> DEPT_HELPER = new NodeHelper<SysDept>() {
        @Override
        public SysDept root() {
            return new SysDept();
        }
        @Override
        public Object getPrimaryKey(SysDept sysDept) {
            return sysDept.getDeptId();
        }

        @Override
        public Object getParentKey(SysDept sysDept) {
            return sysDept.getParentId();
        }

        @Override
        public void addChild(SysDept parent, SysDept child) {
            List<SysDept> children = parent.getChildren();
            if(children == null) {
                children = CollUtil.newArrayList();
            }
            children.add(child);
            parent.setChildren(children);
        }

        @Override
        public void addChildren(SysDept parent, List<SysDept> children) {
            parent.setChildren(children);
        }
    };



    public static Collection<SysMenu> menuTrees(Collection<SysMenu> collection) {
        return trees(collection, MENU_HELPER).getChildren();
    }


    public static Collection<SysDept> deptTrees(Collection<SysDept> collection) {
        return trees(collection, DEPT_HELPER).getChildren();
    }
}
