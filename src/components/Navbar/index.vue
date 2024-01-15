<script setup lang="ts">
import config from '../../../config'
import { useAppStore } from '~/store'

import Logo from '~/assets/img/banner.png'
import buildingImage from '~/assets/icon/building.svg'
import buildingActiveImage from '~/assets/icon/building-blue.svg'

const appStore = useAppStore()
const topMenu = computed(() => appStore.topMenu && appStore.menu)

const adminButtonActive = computed(() => {
  return false
})
</script>

<template>
  <div class="navbar">
    <div class="left-side">
      <a-space>
        <img
          alt="logo"
          :src="Logo"
        >
        <!-- TODO 重新判断 -->
        <a-typography-title
          v-if="topMenu || appStore.device !== 'mobile'"
          :style="{ margin: 0, fontSize: '16px', fontWeight: 'bold' }"
          :heading="5"
        >
          {{ config.appName }}管理后台
        </a-typography-title>
      </a-space>
    </div>
    <div class="center-side">
      <a-space>
        <a-button type="text" size="large" class="link-button color-[#000]!" :class="[adminButtonActive ? 'active' : '']">
          <template #icon>
            <img :src="adminButtonActive ? buildingActiveImage : buildingImage" class="h-6 w-5">
          </template>
          <template #default>
            企业管理
          </template>
        </a-button>
      </a-space>
    </div>

    <div class="right-side">
      right side
    </div>
  </div>
</template>

<style lang="scss">
.navbar {
  display: flex;
  justify-content: space-between;
  height: 100%;
  background-color: #fff;

  .left-side {
    display: flex;
    align-items: center;
    padding-left: 20px;
    width: 240px;
  }

  .center-side {
    display: flex;
    align-items: center;
    flex: 1;

    .link-button {
      &.active {
        font-weight: 500;
        background-color: var(--theme-fade);
        color: var(--theme) !important;
      }
    }
  }

  .right-side {
    display: flex;
    padding-right: 20px;
    list-style: none;
  }
}
</style>
