<script setup lang="ts">
import { useMediaQuery } from '@vueuse/core'

import config from '../../../config'
import { PageNames, steperManager } from './state'

import LoginLottie from './components/LoginLottie.vue'
import LoginForm from './components/LoginForm.vue'
import VerificationForm from './components/Verification/Form.vue'
import PasswordForm from './components/PasswordForm.vue'

import BannerImage from '~/assets/img/banner.png'

const isLargeScreen = useMediaQuery('(min-width:569px)')
const { current } = steperManager
</script>

<template>
  <div class="login h-full w-full flex items-stretch">
    <div class="flex flex-1 flex-col" sm="min-w-[635px] relative">
      <!-- banner -->
      <div class="h-[55px] flex items-center" sm="absolute left-5 top-6 h-auto">
        <img
          alt="logo"
          :src="BannerImage"
        >
        <div class="ml-1 text-xl font-bold">
          {{ config.appName }}
        </div>
      </div>

      <!-- login-body -->
      <div
        class="w-full flex-1"
        sm="fixed-c w-111"
      >
        <div sm="border-1 border-[#dee0e3] rounded-[12px] border-solid h-[550px]" :class="[isLargeScreen ? 'login-body' : '']">
          <LoginForm v-show="current === PageNames.LOGIN" />
          <VerificationForm v-show="current === PageNames.VERIFICATION" />
          <PasswordForm v-show="current === PageNames.PASSWORD" />
        </div>
        <div class="mt-6 text-center text-sm text-gray">
          还没有企业
          <a-link href="/register" :hoverable="false">
            立即注册
          </a-link>
        </div>
      </div>
    </div>
    <div class="login-right relative hidden" lg="block w-115 px-5 box-border" xl="w-130">
      <div class="absolute left-0 right-0 top-[46%] translate-y-[-50%] transform text-center">
        <LoginLottie />
        <p class="text-2xl text-black font-bold">
          先进团队，先用{{ config.appName }}
        </p>
        <p class="mt-5 text-base text-gray">
          人、事、信息，一处搞定
        </p>
      </div>
    </div>
  </div>
</template>

<style lang="scss">
.login {
  .login-right {
    background-image: url('~/assets/img/login-bg.png');
    background-repeat: no-repeat;
    background-size: 100% 100%;
  }

  .login-body {
    box-shadow:
      0 4px 8px rgba(31, 35, 41, 0.03),
      0 3px 6px -6px rgba(31, 35, 41, 0.05),
      0 6px 18px 6px rgba(31, 35, 41, 0.03);
  }
}
</style>
