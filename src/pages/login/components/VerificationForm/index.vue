<script setup lang="ts">
import { PageNames, loginFormModel, steperManager } from '../../share'
import VerificationTimer from './components/Timer.vue'
import { dataDesensitization } from '~/utils/privacy'
import { useLogin } from '~/pages/login/login'

const { login } = useLogin()
const [loading, setLoading] = useLoading()
const enable = computed(() => {
  return !!(loginFormModel.value.code?.trim() && loginFormModel.value.code.length === 6)
})

async function onNext() {
  setLoading(true)
  await login(loginFormModel.value)
  setLoading(false)
}
</script>

<template>
  <div class="h-full p-6 px-8">
    <div class="relative h-full">
      <a-button type="text" size="small" class="w-[54px] min-w-[54px]! color-black!" @click="steperManager.goToPrevious()">
        <template #icon>
          <icon-left />
        </template>
        返回
      </a-button>

      <p class="mt-3 text-xl color-black font-semibold">
        输入手机号验证码
      </p>
      <p class="mt-2 color-gray">
        请输入发送至 <span class="mx-1 text-base color-black font-semibold">+86{{ dataDesensitization('phone', loginFormModel.phone!) }}</span> 的 6 位验证码，有效期 10 分钟
      </p>

      <div class="mt-6">
        <a-input v-model="loginFormModel.code" placeholder="autoimport error in VerificationCode components" size="large" />
      </div>

      <div class="mt-4">
        <VerificationTimer />
      </div>

      <div class="mt-2">
        <a-link href="javascript:void(0);" :hoverable="false" @click="steperManager.goTo(PageNames.PASSWORD)">
          密码登录
        </a-link>
      </div>

      <div class="absolute bottom-0 left-0 right-0">
        <a-button type="primary" long size="large" :loading="loading" :disabled="!enable" @click="onNext">
          下一步
        </a-button>
      </div>
    </div>
  </div>
</template>
