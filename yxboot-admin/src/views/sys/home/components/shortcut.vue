<template>
  <a-card :bordered="false">
    <template #title> 快捷方式 </template>
    <a-row>
      <a-col v-for="(item, index) in shortcutList" :key="index" :xs="30" :sm="24" :md="20" :lg="16" :xl="12" :xxl="8">
        <div class="container" @click="toPath(item.path)">
          <a-tag class="container-tag" :color="randomColor()">
            <Icon :icon="item.icon" size="24px" />
          </a-tag>
          <span class="container-span">{{ item.name }}</span>
        </div>
      </a-col>
    </a-row>
  </a-card>
</template>

<script setup>
  import { useRouter } from 'vue-router'

  const router = useRouter()

  const toPath = (path) => {
    if (path.indexOf('http://') !== -1 || path.indexOf('https://') !== -1) {
      window.open(path)
    } else {
      router.push(path)
    }
  }

  const shortcutList = [
    {
      name: '菜单管理',
      path: '/sys/menu',
      icon: 'ant-design:menu-outlined'
    },
    {
      name: '角色管理',
      path: '/sys/role',
      icon: 'ant-design:smile-outlined'
    },
    {
      name: '用户管理',
      path: '/sys/user',
      icon: 'ant-design:team-outlined'
    },
    {
      name: '部门管理',
      path: '/sys/dept',
      icon: 'ant-design:apartment-outlined'
    },
    {
      name: '个人中心',
      path: '/personal/index',
      icon: 'ant-design:user-outlined'
    },
    {
      name: '代码生成',
      path: '/dev/generator',
      icon: 'ant-design:file-protect-outlined'
    }
  ]

  // 颜色列表
  const colorList = ['#7265E6', '#FFBF00', '#00A2AE', '#F56A00', '#1890FF', '#606D80']
  // 获取随机颜色
  const randomColor = () => {
    return colorList[randomNum(0, colorList.length - 1)]
  }
  // 获取minNum到maxNum内的随机数
  const randomNum = (minNum, maxNum) => {
    switch (arguments.length) {
      case 1:
        return parseInt(Math.random() * minNum + 1, 10)
        // eslint-disable-next-line no-unreachable
        break
      case 2:
        return parseInt(Math.random() * (maxNum - minNum + 1) + minNum, 10)
        // eslint-disable-next-line no-unreachable
        break
      default:
        return 0
        // eslint-disable-next-line no-unreachable
        break
    }
  }
</script>

<style scoped>
  .ant-list-item {
    padding: 8px 0 !important;
  }

  .container {
    height: 60px;
    border-radius: 5px;
    display: flex;
    align-items: center;
    cursor: pointer;

    /* 实现渐变（时间变化效果） */
    transition: all 0.5s;
  }

  .container:hover {
    background: #f0f2f5;
  }

  .container-tag {
    width: 42px;
    height: 42px;
    border-radius: 10px;
    display: flex;
    align-items: center;
    margin-left: 10px;
  }

  .dark .container-span {
    max-width: 60%;
    font-weight: 500;
    font-size: 16px;
    color: #fff;
  }

  .container-span {
    max-width: 60%;
    font-weight: 500;
    font-size: 16px;
    color: #000;
  }
</style>
