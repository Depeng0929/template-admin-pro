import type { LoginData } from '~/api/user/type'
import { useUserStore } from '~/store'

export function useLogin() {
  const router = useRouter()
  const userStore = useUserStore()

  async function login(formData: LoginData) {
    await userStore.login(formData)
    const { redirect, ...othersQuery } = router.currentRoute.value.query
    router.push({
      name: (redirect as any) || 'Workplace',
      query: {
        ...othersQuery,
      },
    })
    success('欢迎使用')
  }

  return {
    login,
  }
}
