interface GroupItem {
  title: string
  icon: string
  color: string
  desc: string
  date: string
  group: string
}

interface NavItem {
  title: string
  icon: string
  color: string
}

interface DynamicInfoItem {
  avatar: string
  name: string
  date: string
  desc: string
}

export const navItems: NavItem[] = [
  {
    title: '首页',
    icon: 'ion:home-outline',
    color: '#1fdaca'
  },
  {
    title: '仪表盘',
    icon: 'ion:speedometer-outline',
    color: '#bf0c2c'
  },
  {
    title: '组件',
    icon: 'ion:layers-outline',
    color: '#e18525'
  },
  {
    title: '系统管理',
    icon: 'ion:settings-outline',
    color: '#3fb27f'
  },
  {
    title: '权限管理',
    icon: 'ion:key-outline',
    color: '#4daf1bc9'
  },
  {
    title: '图表',
    icon: 'ion:bar-chart-outline',
    color: '#00d8ff'
  }
]

export const dynamicInfoItems: DynamicInfoItem[] = [
  {
    avatar: '/images/avatar-1.png',
    name: 'Boya',
    date: '刚刚',
    desc: `在 <a>开源组</a> 创建了项目 <a>YXBoot</a>`
  },
  {
    avatar: '/images/avatar-2.png',
    name: '曲丽丽',
    date: '1个小时前',
    desc: `关注了 <a>Boya</a> `
  },
  {
    avatar: '/images/avatar-3.png',
    name: '周星星',
    date: '1天前',
    desc: `发布了 <a>个人动态</a> `
  },
  {
    avatar: '/images/avatar-4.png',
    name: '付小小',
    date: '2天前',
    desc: `在 <a>架构组</a> 创建了项目 <a> YXBoot with Kube</a> `
  },
  {
    avatar: '/images/avatar-5.png',
    name: '林东东',
    date: '3天前',
    desc: `在 <a>技术组</a> 发布了 <a>前端开发标准规范</a>`
  }
]

export const groupItems: GroupItem[] = [
  {
    title: 'Github',
    icon: 'carbon:logo-github',
    color: '',
    desc: '不要等待机会，而要创造机会。',
    group: '开源组',
    date: '9小时前'
  },
  {
    title: 'Vue',
    icon: 'ion:logo-vue',
    color: '#3fb27f',
    desc: '现在的你决定将来的你。',
    group: '算法组',
    date: '9小时前'
  },
  {
    title: 'Html5',
    icon: 'ion:logo-html5',
    color: '#e18525',
    desc: '没有什么才能比努力更重要。',
    group: '上班摸鱼',
    date: '9小时前'
  },
  {
    title: 'Angular',
    icon: 'ion:logo-angular',
    color: '#bf0c2c',
    desc: '热情和欲望可以突破一切难关。',
    group: 'UI',
    date: '9小时前'
  },
  {
    title: 'React',
    icon: 'bx:bxl-react',
    color: '#00d8ff',
    desc: '健康的身体是实现目标的基石。',
    group: '技术牛',
    date: '9小时前'
  },
  {
    title: 'Js',
    icon: 'ion:logo-javascript',
    color: '#EBD94E',
    desc: '路是走出来的，而不是空想出来的。',
    group: '架构组',
    date: '9小时前'
  }
]
