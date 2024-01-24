<template>
  <div :class="[prefixCls, `${prefixCls}--${theme}`]">
    <a-breadcrumb :routes="routes">
      <template #itemRender="{ route, routes: routesMatched, paths }">
        <Icon :icon="getIcon(route)" v-if="getShowBreadCrumbIcon && getIcon(route)" />
        <span v-if="!hasRedirect(routesMatched, route)">
          {{ route.name || route.meta.title }}
        </span>
        <router-link v-else to="" @click="handleClick(route, paths, $event as Event)">
          {{ route.name || route.meta.title }}
        </router-link>
      </template>
    </a-breadcrumb>
  </div>
</template>
<script lang="ts">
  import type { Menu } from '@/router/types'
  import type { RouteLocationMatched } from 'vue-router'

  import Icon from '@/components/Icon'
  import { useProjectSetting } from '@/hooks/setting'
  import { useGo } from '@/hooks/web/usePage'
  import { REDIRECT_NAME } from '@/router/constant'
  import { getAllParentPath } from '@/router/helper/routeHelper'
  import { usePermissionStoreWithOut } from '@/store/modules/permission'
  import { filter } from '@/utils/helper/trees'
  import { isString } from '@/utils/is'
  import { propTypes } from '@/utils/propTypes'
  import { Breadcrumb } from 'ant-design-vue'
  import { defineComponent, ref, watchEffect } from 'vue'
  import { useRouter } from 'vue-router'

  export default defineComponent({
    name: 'LayoutBreadcrumb',
    components: { Icon, [Breadcrumb.name]: Breadcrumb },
    props: {
      theme: propTypes.oneOf(['dark', 'light'])
    },
    setup() {
      const routes = ref<RouteLocationMatched[]>([])
      const { currentRoute } = useRouter()
      const prefixCls = 'layout-breadcrumb'
      const { getShowBreadCrumbIcon } = useProjectSetting()
      const go = useGo()

      watchEffect(async () => {
        if (currentRoute.value.name === REDIRECT_NAME) return
        const permission = usePermissionStoreWithOut()
        const menus = permission.getMenus
        // const menus = await getMenus()

        const routeMatched = currentRoute.value.matched
        const cur = routeMatched?.[routeMatched.length - 1]
        let path = currentRoute.value.path

        if (cur && cur?.meta?.currentActiveMenu) {
          path = cur.meta.currentActiveMenu as string
        }

        const parent = getAllParentPath(menus, path)
        const filterMenus = menus.filter((item) => item.path === parent[0])
        const matched = getMatched(filterMenus, parent) as any
        if (!matched || matched.length === 0) return
        console.log('matched', matched)
        const breadcrumbList = filterItem(matched)

        if (currentRoute.value.meta?.currentActiveMenu) {
          breadcrumbList.push({
            ...currentRoute.value,
            name: currentRoute.value.meta?.title || currentRoute.value.name
          } as unknown as RouteLocationMatched)
        }
        routes.value = breadcrumbList
        console.log('routes.value', routes.value)
      })

      function getMatched(menus: Menu[], parent: string[]) {
        const metched: Menu[] = []
        menus.forEach((item) => {
          if (parent.includes(item.path)) {
            metched.push({
              ...item,
              name: item.meta?.title || item.name
            })
          }
          if (item.children?.length) {
            metched.push(...getMatched(item.children, parent))
          }
        })
        return metched
      }

      function filterItem(list: RouteLocationMatched[]) {
        return filter(list, (item) => {
          const { meta, name } = item
          if (!meta) {
            return !!name
          }
          const { title, hideBreadcrumb, hideMenu } = meta
          if (!title || hideBreadcrumb || hideMenu) {
            return false
          }
          return true
        }).filter((item) => !item.meta?.hideBreadcrumb)
      }

      function handleClick(route: RouteLocationMatched, paths: string[], e: Event) {
        e?.preventDefault()
        const { children, redirect, meta } = route

        if (children?.length && !redirect) {
          e?.stopPropagation()
          return
        }
        if (meta?.carryParam) {
          return
        }

        if (redirect && isString(redirect)) {
          go(redirect)
        } else {
          let goPath = ''
          if (paths.length === 1) {
            goPath = paths[0]
          } else {
            const ps = paths.slice(1)
            const lastPath = ps.pop() || ''
            goPath = `${lastPath}`
          }
          goPath = /^\//.test(goPath) ? goPath : `/${goPath}`
          go(goPath)
        }
      }

      function hasRedirect(routes: RouteLocationMatched[], route: RouteLocationMatched) {
        console.log('routes', routes)
        return routes.indexOf(route) !== routes.length - 1
      }

      function getIcon(route) {
        return route.icon || route.meta?.icon
      }

      return { routes, prefixCls, getIcon, getShowBreadCrumbIcon, handleClick, hasRedirect }
    }
  })
</script>
<style lang="less">
  @prefix-cls: ~'layout-breadcrumb';

  .@{prefix-cls} {
    display: flex;
    align-items: center;
    padding: 0 8px;

    .ant-breadcrumb-link {
      .anticon {
        margin-right: 2px;
        margin-bottom: 2px;
      }
    }

    &--light {
      .ant-breadcrumb-link {
        color: #999;

        a {
          color: rgb(0 0 0 / 65%);

          &:hover {
            color: @primary-color;
          }
        }
      }

      .ant-breadcrumb-separator {
        color: #999;
      }
    }

    &--dark {
      .ant-breadcrumb-link {
        color: rgb(255 255 255 / 60%);

        a {
          color: rgb(255 255 255 / 80%);

          &:hover {
            color: @white;
          }
        }
      }

      .ant-breadcrumb-separator,
      .anticon {
        color: rgb(255 255 255 / 80%);
      }
    }
  }

  .ant-dropdown-menu-item {
    .anticon {
      margin-right: 5px;
      margin-bottom: 2px;
    }
  }
</style>
