<script setup lang="ts">
const { cancel, confirm } = useModalInject()
</script>

<template>
  <div>
    <div class="flex">
      <icon-info-circle-fill size="22" class="color-theme" />
      <div class="ml-4">
        <p class="text-base color-black font-bold">
          提示
        </p>
        <p class="mt-1 text-sm color-[#1f2329]">
          <!-- 请先同意 服务协议 和 隐私政策 -->
          <span>请先同意</span>
          <a-link href="/register" :hoverable="false">
            服务协议
          </a-link>
          <span>和</span>
          <a-link href="/register" :hoverable="false">
            隐私政策
          </a-link>
        </p>
      </div>
    </div>
    <div class="mt-6 flex justify-end">
      <a-space>
        <a-button type="dashed" @click="cancel">
          取消
        </a-button>
        <a-button type="primary" @click="confirm">
          同意
        </a-button>
      </a-space>
    </div>
  </div>
</template>
