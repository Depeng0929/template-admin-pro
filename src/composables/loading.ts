import { ref } from 'vue'

export function useLoading(initValue = false): [Ref<boolean>, (value: boolean) => void] {
  const loading = ref(initValue)
  const setLoading = (value: boolean) => {
    loading.value = value
  }

  return [
    loading,
    setLoading,
  ]
}
