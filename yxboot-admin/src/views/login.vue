<template>
  <div class="page">
    <div class="top">
      <div class="header">
        <img :class="{ logo: true }" src="/logo.png" />
        <div class="title">{{ titleOption.title }}</div>
      </div>
      <div class="desc" v-if="titleOption.desc">{{ titleOption.desc }}</div>
    </div>
    <a-form ref="formRef" class="form" :model="formData" :rules="rules" size="normal" @keypress.enter="handleLogin">
      <a-form-item name="username">
        <a-input
          v-model:value="formData.username"
          placeholder="用户名: admin"
          :prefix="h(Icon, { icon: 'ant-design:user-outlined' })"
          size="large"
          :maxlength="20"
          autocomplete="username"
        />
      </a-form-item>
      <a-form-item name="password">
        <a-input-password
          v-model:value="formData.password"
          placeholder="密码: 123456"
          :prefix="h(Icon, { icon: 'carbon:password' })"
          size="large"
          :maxlength="20"
          autocomplete="current-password"
        />
      </a-form-item>
      <a-form-item name="captchaCode">
        <div class="flex justify-between">
          <a-input
            v-model:value="formData.captchaCode"
            placeholder="请输入验证码"
            :prefix="h(Icon, { icon: 'material-symbols:verified-user-outline-rounded' })"
            size="large"
            allowClear
            :maxlength="4"
          />
          <img v-if="formData.captchaImage" class="captcha" :src="formData.captchaImage" @click="handleChangeCaptcha" />
          <img v-else class="captcha" src="../assets/images/captcha.png" @click="handleChangeCaptcha" />
        </div>
      </a-form-item>
      <a-row>
        <a-col :span="12">
          <a-form-item>
            <!-- No logic, you need to deal with it yourself -->
            <a-checkbox v-model:checked="rememberMe" size="small"> 自动登录 </a-checkbox>
          </a-form-item>
        </a-col>
        <a-col :span="12">
          <a-form-item :style="{ 'text-align': 'right' }">
            <!-- No logic, you need to deal with it yourself -->
            <a-button type="link"> 忘记密码? </a-button>
          </a-form-item>
        </a-col>
      </a-row>
      <a-form-item>
        <a-button type="primary" size="large" block :loading="loading" @click="handleLogin">登录</a-button>
      </a-form-item>
      <div class="login-other-way">
        <!-- No logic, you need to deal with it yourself -->
        <span>其他登录方式</span>
        <GithubFilled />
        <WechatFilled />
        <AlipayCircleFilled />
        <!-- No logic, you need to deal with it yourself -->
        <a-button type="link" style="float: right"> 注册账号 </a-button>
      </div>
    </a-form>
  </div>
</template>
<script lang="ts" setup>
  import { captcha } from '@/api/sys/auth'
  import Icon from '@/components/Icon/index'
  import { useGlobSetting } from '@/hooks/setting'
  import { useUserStore } from '@/store/modules/user'
  import { AlipayCircleFilled, GithubFilled, WechatFilled } from '@ant-design/icons-vue'
  import { message } from 'ant-design-vue'

  const titleOption = {
    title: 'YXBoot' || useGlobSetting().title,
    desc: 'YXBoot 一个开箱即用的前后台管理系统框架'
  }

  const formData = reactive({
    username: '',
    password: '',
    captchaCode: '',
    captchaImage: ''
  })
  const rules = {
    username: [{ required: true, message: '请输入用户名' }],
    password: [{ required: true, message: '请输入密码' }],
    captchaCode: [{ required: true, message: '请输入验证码' }]
  }

  const formRef = ref()
  const router = useRouter()
  const route = useRoute()
  const userStore = useUserStore()
  const loading = ref(false)
  const rememberMe = ref(false)

  const handleLogin = async () => {
    formRef.value.validate().then(() => {
      loading.value = true
      userStore
        .login(formData)
        .then((res) => {
          if (res.code === 0) {
            const toPath = decodeURIComponent((route.query?.redirect || '/') as string)
            message.success('登录成功，即将进入系统')
            if (route.name === '/login') router.replace('/')
            else router.replace(toPath)
          } else {
            message.error(res.msg)
            handleChangeCaptcha()
          }
        })
        .catch(() => {
          handleChangeCaptcha()
        })
        .finally(() => {
          loading.value = false
        })
    })
  }

  const handleChangeCaptcha = () => {
    formData.captchaCode = ''
    captcha().then((res) => {
      formData.captchaImage = res.data
    })
  }

  onMounted(() => {
    handleChangeCaptcha()
  })
</script>
<style lang="less" scoped>
  .page {
    display: flex;
    flex-direction: column;
    align-items: center;
    width: 100%;
    height: 100vh;
    padding: 120px 0;
    background-image: url('@/assets/images/login/login_bg.svg');

    .top {
      .header {
        display: flex;
        justify-content: center;
        align-items: center;
        user-select: none;

        .logo {
          width: 48px;
          height: 48px;
          margin-right: 15px;
        }

        .title {
          font-size: 30px;
          font-weight: bold;
        }
      }

      .desc {
        text-align: center;
        margin-top: 12px;
        margin-bottom: 30px;
        font-size: 14px;
        color: #808695;
      }
    }

    .form {
      margin-top: 30px;
      width: 400px;

      .captcha {
        height: 40px;
        margin-left: 8px;
        border: 1px solid #d9d9d9;
      }
    }

    .login-other-way {
      height: 32px;
      line-height: 32px;
      margin-bottom: 40px;

      .anticon {
        margin-left: 15px;
        color: #888;
        font-size: 22px;
        cursor: pointer;

        &:hover {
          color: var(--primary-color);
        }
      }
    }
  }
</style>
