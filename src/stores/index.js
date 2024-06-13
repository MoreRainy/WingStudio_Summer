import { createPinia } from 'pinia'
import piniaPluginPersistedstate from 'pinia-plugin-persistedstate'

const pinia = createPinia()
pinia.use(piniaPluginPersistedstate)

export default pinia

// export * from '@/stores/modules/user'
import { useUserStore } from '@/stores/modules/userStore'
export { useUserStore }

import { useLoginStore } from '@/stores/modules/loginStore'
export { useLoginStore }

import { deviceStore } from '@/stores/modules/loginStore'
export { deviceStore }
