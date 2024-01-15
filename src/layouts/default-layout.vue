<script setup lang="ts">
import PageLayout from './page-layout.vue'
import { useAppStore, useUserStore } from '~/store'

const userStore = useUserStore()
const router = useRouter()
const route = useRoute()
const appStore = useAppStore()
const isInit = ref(false)
const navbarHeight = `60px`
const navbar = computed(() => appStore.navbar)

// menu
const renderMenu = computed(() => appStore.menu && !appStore.topMenu)
const collapsed = computed(() => {
  return appStore.menuCollapse
})
const menuWidth = computed(() => {
  return appStore.menuCollapse ? 48 : appStore.menuWidth
})
const setCollapsed = (val: boolean) => {
  if (!isInit.value)
    return // for page initialization menu state problem

  appStore.updateSettings({ menuCollapse: val })
}

// page warp
const paddingStyle = computed(() => {
  const paddingLeft
      = renderMenu.value
        ? { paddingLeft: `${menuWidth.value}px` }
        : {}
  const paddingTop = navbar.value ? { paddingTop: navbarHeight } : {}
  return { ...paddingLeft, ...paddingTop }
})

watch(
  () => userStore.role,
  (roleValue) => {
    if (roleValue && !permission.accessRouter(route))
      router.push({ name: 'notFound' })
  },
)

onMounted(() => {
  isInit.value = true
})
</script>

<template>
  <a-layout class="layout" :class="{ mobile: appStore.hideMenu }">
    <div v-if="navbar" class="layout-navbar">
      <Navbar />
    </div>
    <a-layout>
      <a-layout>
        <a-layout-sider
          v-if="renderMenu"
          class="layout-sider"
          breakpoint="xl"
          :collapsed="collapsed"
          :collapsible="true"
          :width="menuWidth"
          :style="{ paddingTop: navbar ? '60px' : '' }"
          :hide-trigger="true"
          @collapse="setCollapsed"
        >
          <div class="menu-wrapper">
            menu
          </div>
        </a-layout-sider>

        <a-layout class="layout-content" :style="paddingStyle">
          <a-layout-content>
            <PageLayout />
          </a-layout-content>
        </a-layout>
      </a-layout>
    </a-layout>
  </a-layout>
</template>

<style lang="scss">
$nav-size-height: 60px;
$layout-max-width: 1100px;

.layout {
  width: 100%;
  height: 100%;
}

.layout-navbar {
  position: fixed;
  top: 0;
  left: 0;
  z-index: 100;
  width: 100%;
  height: $nav-size-height;
}

.layout-sider {
  position: fixed;
  top: 0;
  left: 0;
  z-index: 99;
  height: 100%;
  transition: all 0.2s cubic-bezier(0.34, 0.69, 0.1, 1);
  background-color: var(--bg-base);
  box-shadow: none;
  &::after {
    position: absolute;
    top: 0;
    right: -1px;
    display: block;
    width: 1px;
    height: 100%;
    background-color: transparent;
    content: '';
  }

  > :deep(.arco-layout-sider-children) {
    overflow-y: hidden;
  }
}

.menu-wrapper {
  height: 100%;
  overflow: auto;
  overflow-x: hidden;
  :deep(.arco-menu) {
    ::-webkit-scrollbar {
      width: 12px;
      height: 4px;
    }

    ::-webkit-scrollbar-thumb {
      border: 4px solid transparent;
      background-clip: padding-box;
      border-radius: 7px;
      background-color: green;
    }

    ::-webkit-scrollbar-thumb:hover {
      background-color: var(--color-text-3);
    }
  }
}

.layout-content {
  min-height: 100vh;
  overflow-y: hidden;
  background-color: var(--bg-base);
  transition: padding 0.2s cubic-bezier(0.34, 0.69, 0.1, 1);
}
</style>
