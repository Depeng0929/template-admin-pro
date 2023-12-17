<script setup lang="ts">
import type { ModalConfig } from '@arco-design/web-vue'
import { useVModel } from '@vueuse/core'
import { INJECT_MODAL } from '~/composables/modal'

defineOptions({
  name: 'Modal',
  inheritAttrs: false,
})
const props = withDefaults(defineProps<Partial<IProps>>(), {
  modelValue: false,
  closable: true,
})
const emit = defineEmits(['confirm', 'update:modelValue'])
interface IProps extends ModalConfig {
  modelValue: boolean
  closable?: boolean
}
const DIALOG_STYLES = {
  width: '860px',
  alignCenter: false,
  top: '40vh',
  footer: false,
  hideTitle: false,
  hideCancel: true,
  simple: true,
}
const visible = useVModel(props, 'modelValue')

const attrs = useAttrs()
const bindValue = computed(() => {
  return Object.assign({}, DIALOG_STYLES, attrs)
})

function confirm() {
  visible.value = false
  emit('confirm')
}

function cancel() {
  visible.value = false
}

provide(INJECT_MODAL, {
  visible,
  confirm,
  cancel,
})
</script>

<template>
  <div v-lazy-show="visible">
    <a-modal v-model:visible="visible" modal-class="app-modal" v-bind="bindValue">
      <template v-if="closable" #title>
        <!-- close -->
        <div class="absolute right-4 top-5">
          <a-button type="text" shape="circle">
            <icon-close size="20" class="color-[#646a73]" />
          </a-button>
        </div>
      </template>
      <slot />
    </a-modal>
  </div>
</template>

<style lang="scss">
.app-modal {
  .arco-modal-header {
    margin-bottom: 0px;
  }
}
</style>
