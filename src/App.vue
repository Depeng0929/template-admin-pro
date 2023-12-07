<script lang="ts" setup>
import zhCN from '@arco-design/web-vue/es/locale/lang/zh-cn'

const locale = computed(() => {
  return zhCN
})
</script>

<template>
  <a-config-provider :locale="locale">
    <RouterView />
  </a-config-provider>
</template>
