<script setup lang="ts">
import type { FieldRule } from '@arco-design/web-vue'
import { steperManager } from '../steps'
import config from '../../../../config'
import { initialForm } from '../constants'
import AuthTips from './AuthTips.vue'
import { isEmail, isMobile } from '~/utils/validate'

const read = ref(false)
const [modal, setModal] = useModalState()

const currentTabKey = ref('phone')
const rules = computed<Partial<Record<keyof ReturnType<typeof initialForm>, FieldRule | FieldRule[]>>>(() => {
  return currentTabKey.value === 'phone'
    ? {
        phone: [
          { required: true, message: '请输入电话号码' },
          {
            validator(value, callback) {
              return isMobile(value) ? callback() : callback('请输入有效的电话号码')
            },
            message: '请输入有效的电话号码',
          },
        ],
      }
    : {
        email: [
          { required: true, message: '请输入邮箱' },
          {
            validator(value, callback) {
              return isEmail(value) ? callback() : callback('请输入有效的邮箱')
            },
            message: '请输入有效的邮箱',
          },
        ],
      }
})

const { formData, getFormProps, getSubmitButtonProps } = useForm(
  initialForm(),
  {
    rules,
    isToast: false,
    submit() {
      if (!read.value) {
        setModal()
        return
      }
      return steperManager.goToNext()
    },
  },
)

const btnPass = computed(() => {
  return currentTabKey.value === 'phone'
    ? isMobile(formData.value.phone)
    : isEmail(formData.value.email)
})

function onReadAgree() {
  read.value = true
  steperManager.goToNext()
}
</script>

<template>
  <div class="login-form h-full flex flex-col p-6">
    <p class="text-[22px] color-black font-bold">
      欢迎使用{{ config.appName }}
    </p>

    <a-form v-bind="getFormProps()" layout="horizontal">
      <div class="flex-1">
        <a-tabs v-model="currentTabKey" default-active-key="phone">
          <a-tab-pane key="phone" title="手机号">
            <a-form-item field="phone" hide-label>
              <a-input v-model="formData.phone" placeholder="请输入你的手机号" size="large" :input-attrs="{ type: 'tel', autocomplete: 'off', autocorrect: 'off', autocapitalize: 'off' }">
                <template #prepend>
                  +86
                </template>
              </a-input>
            </a-form-item>
          </a-tab-pane>
          <a-tab-pane key="email" title="邮箱">
            <a-form-item field="email" hide-label>
              <a-input v-model="formData.email" placeholder="请输入你的邮箱" size="large" :input-attrs="{ type: 'email' }" />
            </a-form-item>
          </a-tab-pane>
        </a-tabs>
        <div class="mt-4">
          <a-button v-bind="getSubmitButtonProps()" type="primary" long size="large" :disabled="!btnPass">
            下一步
          </a-button>
        </div>
        <div class="mt-4">
          <a-checkbox v-model="read" size="large">
            我已阅读并同意
            <a-link href="/register" :hoverable="false">
              服务协议
            </a-link>
            和
            <a-link href="/register" :hoverable="false">
              隐私政策
            </a-link>
          </a-checkbox>
        </div>
      </div>
    </a-form>

    <div class="p-4">
      <a-divider orientation="center">
        <span class="text-gray">更多方式</span>
      </a-divider>
      <div class="mt-8">
        <a-button type="dashed" long shape="round" size="large">
          <template #icon>
            <icon-lark-color />
          </template>
          SSO登录
        </a-button>
      </div>
    </div>

    <!-- 协议auth -->
    <Modal
      v-model="modal.visible"
      width="490px"
      :closable="false"
      @confirm="onReadAgree"
    >
      <AuthTips />
    </Modal>
  </div>
</template>

<style lang="scss">
.login-form {
  .arco-tabs-nav {
    &::before {
      display: none;
    }
  }

  .arco-tabs-tab {
    &:first-child {
      margin-left: 0 !important;
      padding-left: 2px;
    }
  }
}
</style>
