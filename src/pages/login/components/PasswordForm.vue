<script setup lang="ts">
import { loginFormModel, steperManager } from '../state'
import { useUserStore } from '~/store'

const userStore = useUserStore()
const router = useRouter()
const [loading, setLoading] = useLoading()

async function onNext() {
  setLoading(true)
  await userStore.login(loginFormModel.value)
  setLoading(false)
  router.replace('/')
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
        输入密码
      </p>

      <div class="mt-6">
        <a-input-password v-model="loginFormModel.code" placeholder="请输入密码" size="large" />
      </div>

      <div class="mt-3">
        <a-link href="javascript:void(0);" :hoverable="false" @click="steperManager.goToPrevious()">
          验证码登录登录
        </a-link>
      </div>

      <div class="absolute bottom-0 left-0 right-0">
        <a-button type="primary" long size="large" :loading="loading" @click="onNext">
          下一步
        </a-button>
      </div>
    </div>
  </div>
</template>
