<template>
  <a-input-group class="icon-input" compact>
    <a-input v-model:value="innerValue" :placeholder="placeholder" />
    <a-button @click="handleSelectIconClick" pre-icon="ic:outline-emoji-emotions" icon-size="22">选择图标</a-button>
  </a-input-group>
  <BasicModal @register="registerModel" title="选择图标" width="800px" @ok="handleModalOkClick">
    <div class="icon-modal">
      <a-tabs v-model:activeKey="category" tab-position="left" animated>
        <a-tab-pane key="ant-design" tab="Ant Design">
          <div class="ant-icon-select">
            <div class="radio-group">
              <a-radio-group class="style-radio" v-model:value="style">
                <a-radio-button value="outlined">线框风格</a-radio-button>
                <a-radio-button value="filled">实底风格</a-radio-button>
                <a-radio-button value="twotone">双色风格</a-radio-button>
              </a-radio-group>
              <a-input v-model:value="antdKeyword" placeholder="请输入关键字进行搜索" />
            </div>
            <div class="icons">
              <IconPickerItem
                v-for="icon in antDesignIconList"
                :key="icon"
                :icon="icon"
                :selected="icon === selectIcon"
                @selected="handleIconSelectClick"
              />
            </div>
          </div>
        </a-tab-pane>
        <a-tab-pane key="other" tab="Iconify">
          <div class="iconify-select">
            <a-input-search
              v-model:value="keyword"
              placeholder="请输入关键字进行搜索"
              :loading="loading"
              enter-button
              @search="handleSearch"
            />
            <a-empty v-if="requestResult === RequestResult.EMPTY_RESULT" description="暂无结果" />
            <div class="icons" v-else>
              <IconPickerItem
                v-for="icon in icons"
                :key="icon"
                :icon="icon"
                :selected="icon === selectIcon"
                @selected="handleIconSelectClick"
              />
            </div>
          </div>
        </a-tab-pane>
      </a-tabs>
    </div>
  </BasicModal>
</template>
<script lang="ts" setup>
  import { useModal } from '@/components/Modal'
  import { propTypes } from '@/utils/propTypes'
  import { Tooltip, message } from 'ant-design-vue'
  import axios from 'axios'
  import { filled, outlined, twotone } from '../data/icons.data'
  import Icon from './Icon.vue'

  defineOptions({
    inheritAttrs: false
  })

  const iconData = { outlined, filled, twotone }

  const IconPickerItem = defineComponent({
    props: {
      icon: propTypes.string,
      selected: propTypes.bool
    },
    emits: ['selected'],
    render(context) {
      const { icon, selected, $emit } = context
      console.log('h=====', icon)
      const getClass = () => {
        return {
          icon: true,
          selected
        }
      }
      return h(
        'div',
        {
          class: getClass(),
          onClick: () => $emit('selected', icon)
        },
        [h(Tooltip, { title: icon }, [h(Icon, { icon, size: 32 })])]
      )
    }
  })

  enum RequestResult {
    FIRST = 1,
    HAS_RESULT = 2,
    EMPTY_RESULT = 3
  }
  const props = defineProps({
    value: propTypes.string,
    placeholder: propTypes.string
  })
  const emit = defineEmits(['change', 'update:value'])
  const innerValue = ref()
  const selectIcon = ref()
  const loading = ref(false)
  const requestResult = ref(RequestResult.FIRST)

  const category = ref('ant-design')
  //antd icon 屬性
  const style = ref('outlined')
  const antdKeyword = ref<string>('')
  //iconify 屬性
  const keyword = ref<string>('')
  const icons = ref<Array<string>>([])

  const antDesignIconList = computed<Array<string>>(() => {
    const list = iconData[unref(style)].filter((item) => {
      return item.indexOf(unref(antdKeyword)) > -1
    })
    return list
  })

  watch(
    () => props.value,
    () => {
      innerValue.value = unref(props.value)
    }
  )

  const [registerModel, { openModal, closeModal }] = useModal()

  const handleSelectIconClick = () => {
    selectIcon.value = unref(innerValue)
    openModal(true)
  }

  const handleModalOkClick = () => {
    closeModal()
    innerValue.value = unref(selectIcon)
    emit('change', unref(innerValue))
    emit('update:value', unref(innerValue))
  }

  const handleSearch = () => {
    const value = unref(keyword)
    if (value) {
      loading.value = true
      axios.get('https://api.iconify.design/search?query=' + value + '&limit=100').then((res) => {
        const { data: { icons: iconList = [], total = 0 } = {} } = res
        icons.value = [...iconList]
        requestResult.value = total > 0 ? RequestResult.HAS_RESULT : RequestResult.EMPTY_RESULT
        loading.value = false
      })
    } else {
      message.warning('请输入关键字')
    }
  }

  const handleIconSelectClick = (icon) => {
    selectIcon.value = icon
  }
</script>
<style lang="less" scoped>
  .icon-input {
    width: 100%;
    display: flex;
    justify-content: flex-start;
    align-items: flex-start;
  }

  .icon-modal {
    height: 300px;
    overflow: hidden;

    .ant-tabs {
      height: 100%;

      :deep(.ant-tabs-content) {
        height: 100%;
      }
    }

    .radio-group {
      display: flex;
      justify-content: flex-start;
      align-items: center;
    }

    .icons {
      padding: 10px 0;
      display: flex;
      flex-flow: row wrap;
      justify-content: flex-start;
      align-items: flex-start;

      .icon {
        width: 32px;
        border: 1px solid @border-color-light;
        display: flex;
        flex-flow: column nowrap;
        justify-content: center;
        align-items: center;
        margin-right: 5px;
        margin-bottom: 5px;

        &.selected,
        &:hover {
          border-color: @primary-color;
        }
      }
    }

    .ant-icon-select,
    .iconify-select {
      width: 100%;
      height: 100%;
      display: flex;
      flex-flow: column nowrap;
      justify-content: flex-start;
      align-items: flex-start;
    }

    .ant-icon-select {
      .style-radio {
        flex-grow: 0;
        flex-shrink: 0;
      }

      .icons {
        flex-grow: 1;
        flex-shrink: 1;
        overflow: auto;
      }
    }

    .iconify-select {
      .ant-input-search {
        flex-grow: 0;
        flex-shrink: 0;
      }

      .icons {
        flex-grow: 1;
        flex-shrink: 1;
        overflow: auto;
      }
    }

    .ant-empty {
      padding: 20px 0;
    }
  }
</style>
