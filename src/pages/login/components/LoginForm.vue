<script setup lang="ts">
import config from '../../../../config'
</script>

<template>
  <div class="login-form h-full flex flex-col p-6">
    <p class="text-[22px] color-black font-bold">
      欢迎使用{{ config.appName }}
    </p>

    <div class="flex-1">
      <a-tabs default-active-key="1">
        <a-tab-pane key="1" title="手机号">
          <a-input placeholder="请输入你的手机号" allow-clear size="large">
            <template #prepend>
              +86
            </template>
          </a-input>
        </a-tab-pane>
        <a-tab-pane key="2" title="邮箱">
          <a-input placeholder="请输入你的邮箱" allow-clear size="large" />
        </a-tab-pane>
      </a-tabs>
      <div class="mt-4">
        <a-button type="primary" long disabled size="large">
          下一步
        </a-button>
      </div>
      <div class="mt-4">
        <a-checkbox value="1" size="large">
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
      margin-left: 0!important;
    }
  }
}
</style>
