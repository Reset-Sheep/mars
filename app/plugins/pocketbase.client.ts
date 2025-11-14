import PocketBase from 'pocketbase'
// 在任意组件这样使用
// const { $pb } = useNuxtApp()

// PocketBase 服务器如何获取
// 运行 ./pocketbase serve --http="0.0.0.0:8090"

export default defineNuxtPlugin(() => {
  const pb = new PocketBase('http://localhost:8090')
  // 自动保存 cookie（保持登录态）
  pb.autoCancellation(false)

  return {
    provide: {
      pb
    }
  }
})
