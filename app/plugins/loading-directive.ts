import { createApp } from 'vue'
import type { DirectiveBinding } from 'vue'

import LoadingOverlay from '~/components/LoadingOverlay.vue'

export default defineNuxtPlugin((nuxtApp) => {
  nuxtApp.vueApp.directive('loading', {
    mounted(el: HTMLElement, binding: DirectiveBinding) {
      // 创建挂载容器
      const overlayApp = createApp(LoadingOverlay, { visible: binding.value })
      const mountNode = document.createElement('div')
      mountNode.style.position = 'absolute'
      mountNode.style.top = '0'
      mountNode.style.left = '0'
      mountNode.style.right = '0'
      mountNode.style.bottom = '0'
      mountNode.style.pointerEvents = 'none'
      el.style.position = 'relative'
      el.appendChild(mountNode)

      // 保存引用
      ;(el as any)._loadingInstance = { app: overlayApp, mountNode }
      overlayApp.mount(mountNode)
    },

    updated(el: HTMLElement, binding: DirectiveBinding) {
      const instance = (el as any)._loadingInstance
      if (instance) {
        instance.app._instance?.props && (instance.app._instance.props.visible = binding.value)
      }
    },

    unmounted(el: HTMLElement) {
      const instance = (el as any)._loadingInstance
      if (instance) {
        instance.app.unmount()
        el.removeChild(instance.mountNode)
      }
    }
  })
})
