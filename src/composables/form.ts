import type { ButtonProps, FieldRule, FormInstance, ValidatedError } from '@arco-design/web-vue'
import type { MaybeRef } from '@vueuse/core'
import to from 'await-to-js'

interface FormOptions<T = Record<string, any>> {
  rules?: MaybeRef<Partial<Record<keyof T, FieldRule | FieldRule[]>>>
  submit?: (data: T) => Promise<void> | any
  /**
   * 调用FormRef.value.reset方法，可以手动设置一些初始值，然后请求数据
   */
  reset?: () => any
  /**
   * 表单提交成功后，如果给了这个参数，则提示的信息
   */
  successMsg?: string
  /**
   * 表单验证不通过后，是否提示
   */
  isToast?: boolean
}

export function useForm<T extends Record<string, any>>(
  initialFormData: MaybeRef<T>,
  formOptions: FormOptions<T> = {},
) {
  const {
    rules = {},
    submit = () => Promise.resolve(),
    reset = () => {},
    successMsg,
    isToast = true,
  } = formOptions
  const [loading, setLoading] = useLoading(false)

  const formData = ref<T>(unref(initialFormData))
  const formRef = ref<FormInstance>() as any as Ref<FormInstance>

  async function onSubmit(data: { values: Record<string, any>, errors: Record<string, ValidatedError> | undefined }, ev: Event) {
    ev.preventDefault()

    const { errors } = data
    if (Object.keys(errors || {}).length) {
      const firstKey = Object.keys(errors || {})[0]
      isToast && warning(errors![firstKey].message)
      return false
    }

    setLoading(true)
    // submit
    const [error] = await to(Promise.resolve(submit(formData.value as T)))
    if (error) {
      setLoading(false)
      return
    }
    setLoading(false)

    successMsg && success(successMsg)
  }

  function onReset() {
    formRef.value.clearValidate()
    formRef.value.resetFields()
    nextTick(() => {
      reset()
    })
  }

  function getFormProps() {
    return {
      rules,
      ref: formRef,
      model: formData,
      onSubmit,
      layout: 'vertical',
      labelAlign: 'left',
    } as any
  }

  function getSubmitButtonProps(): ButtonProps {
    return reactive({
      loading,
      htmlType: 'submit',
      disabled: loading,
    })
  }

  function getResetButtonProps(): ButtonProps {
    return {
      onClick: onReset,
    } as any
  }

  watchEffect(() => {
    formData.value = unref(initialFormData) as any
  })

  return {
    formRef,
    formData,
    onReset,
    getFormProps,
    getResetButtonProps,
    getSubmitButtonProps,
  }
}
