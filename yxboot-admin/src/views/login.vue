<template>
  <div class="loginpage">
    <div class="title-box">
      <img :class="{ 'title-img': true, small: !titleOption.subtitle }" src="/favicon.png" />
      <div class="title">
        <div class="headline">{{ titleOption.headline }}</div>
        <div class="subtitle" v-if="titleOption.subtitle">{{ titleOption.subtitle }}</div>
      </div>
    </div>
    <a-form ref="formRef" class="form" :model="formData" :rules="rules" size="normal" @keypress.enter="handleLogin">
      <a-form-item name="username">
        <a-input
          v-model:value="formData.username"
          placeholder="请输入用户名"
          :prefix="h(Icon, { icon: 'ph:user-bold' })"
          size="large"
          :maxlength="20"
        />
      </a-form-item>
      <a-form-item name="password">
        <a-input-password
          v-model:value="formData.password"
          placeholder="请输入密码"
          :prefix="h(Icon, { icon: 'carbon:password' })"
          size="large"
          :maxlength="20"
        />
      </a-form-item>
      <a-form-item name="captchaCode">
        <div class="captchaCode-row">
          <a-input
            class="captchaCode-input"
            v-model:value="formData.captchaCode"
            placeholder="请输入验证码"
            :prefix="h(Icon, { icon: 'material-symbols:verified-user-outline-rounded' })"
            size="large"
            allowClear
            :maxlength="4"
          />
          <img class="captchaCode-img" :src="captcha + thisTime" @click="handlechangeCaptcha" />
        </div>
      </a-form-item>
      <a-form-item>
        <a-button class="loginBtn" type="primary" block :loading="loading" @click="handleLogin">登录</a-button>
      </a-form-item>
    </a-form>
  </div>
</template>
<script lang="ts" setup>
  import Icon from '@/components/Icon/index'
  import { useGlobSetting } from '@/hooks/setting/index'
  import { useUserStore } from '@/store/modules/user'
  import { message } from 'ant-design-vue'

  const titleOption = {
    headline: '' || useGlobSetting().title,
    subtitle: '前后端分离快速开发平台'
  }

  const formData = reactive({
    username: 'admin',
    password: '123456',
    captchaCode: ''
  })
  const rules = {
    username: [{ required: true, message: '用户名不能为空', trigger: 'blur' }],
    password: [{ required: true, message: '密码不能为空', trigger: 'blur' }],
    captchaCode: [{ required: true, message: '验证码不能为空', trigger: 'blur' }]
  }

  const formRef = ref()
  const router = useRouter()
  const route = useRoute()
  const userStore = useUserStore()
  const loading = ref(false)
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
            handlechangeCaptcha()
          }
        })
        .catch(() => {
          handlechangeCaptcha()
        })
        .finally(() => {
          loading.value = false
        })
    })
  }

  const captcha = '/api/auth/captcha'
  let thisTime: any = ref('')
  const handlechangeCaptcha = () => {
    thisTime.value = `?v=${Date.now()}`
    formData.captchaCode = ''
  }
</script>
<style lang="less" scoped>
  .loginpage {
    display: flex;
    flex-flow: column nowrap;
    justify-content: flex-start;
    align-items: center;
    width: 100%;
    height: 100vh;
    padding: 200px 0;
    background-image: url('@/assets/images/login/login_bg.svg');

    .title-box {
      display: flex;
      align-items: center;

      .title-img {
        display: inline-block;
        width: 70px;
        height: 70px;
        margin-right: 10px;

        &.small {
          width: 40px;
          height: 40px;
        }
      }

      .title {
        user-select: none;

        .headline {
          font-size: 30px;
          font-weight: bold;
        }

        .subtitle {
          float: right;
          color: #808695;
        }
      }
    }

    .form {
      margin-top: 30px;
      width: 400px;

      .captchaCode-row {
        height: 40px;
        display: flex;
        justify-content: space-between;

        .captchaCode-img {
          margin-left: 8px;
          border: 1px solid #d9d9d9;
        }
      }

      .loginBtn {
        height: 40px;
        justify-content: center;
      }
    }
  }
</style>
