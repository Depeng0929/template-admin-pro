import type { InjectionKey, UnwrapRef } from 'vue'
import type { FormInstance } from '@arco-design/web-vue'
import { whenever } from '@vueuse/core'

export function useModalState<T = any>(): [Ref<{ visible: boolean, data: UnwrapRef<T> | null }>, (data?: T) => void] {
  const modal = ref({
    visible: false,
    data: null as T | null,
  })

  function setModal(data: T | null = null) {
    modal.value = {
      visible: true,
      data: data as any,
    }
  }

  return [
    modal,
    setModal,
  ]
}

interface ModalState {
  visible: Ref<boolean>
  confirm: () => void
  cancel: () => void
}
export const INJECT_MODAL = Symbol('modal') as InjectionKey<ModalState>

export function useModalInject() {
  const {
    visible,
    confirm,
    cancel,
  } = inject(INJECT_MODAL)!

  return {
    visible,
    confirm,
    cancel,
  }
}

interface ModalActionOptions {
  isEdit: Ref<boolean>
  formReset?: () => void
  formRef?: Ref<FormInstance>
}
export function useModalAction(options: ModalActionOptions) {
  const { visible } = useModalInject()
  const { isEdit, formReset = () => {}, formRef } = options

  // 添加表单，默认聚焦第一个
  whenever(() => visible.value, () => {
    setTimeout(() => {
      if (!isEdit.value)
        formRef?.value.clearValidate()
    }, 0)
  }, { immediate: true })

  // 表单关闭时，清空表单
  whenever(() => !visible.value, () => {
    setTimeout(() => {
      formReset()
      formRef?.value.clearValidate()
    }, 200)
  })
}
