<script setup lang="ts">
import { useIntervalFn } from '@vueuse/core'
import { getAuthCode } from '~/api/user'

const TIME = 60

const regain = ref(true)
const [loading, setLoading] = useLoading()
const time = ref(TIME)

const { pause, resume } = useIntervalFn(() => {
  if (time.value > 1) {
    time.value = time.value - 1
  }
  else {
    regain.value = true
    time.value = TIME
    pause()
  }
}, 1000)

async function onRegain() {
  setLoading(true)
  await getAuthCode()
  setLoading(false)

  regain.value = false
  resume()
}

onMounted(() => {
  pause()
})
</script>

<template>
  <a-link v-if="regain" href="javascript:void(0);" :hoverable="false" :loading="loading" @click="onRegain">
    重新获取验证码
  </a-link>
  <p v-else class="text-sm color-gray">
    <span>{{ time }}</span>秒后可重新获取验证码
  </p>
</template>
