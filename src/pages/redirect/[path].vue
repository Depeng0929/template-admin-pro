<script lang="ts" setup>
const router = useRouter()
const gotoPath = useRouteParams<string>('path')

router.replace({ path: gotoPath.value })
</script>

<template>
  <div />
</template>

<style lang="less"></style>
