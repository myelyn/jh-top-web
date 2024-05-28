import { onBeforeRouteLeave } from 'vue-router'
import { useRouter } from 'vue-router'

  export function useKeepPage(targetPages: string[]) {
    const router = useRouter()
  
    const updateRouterKeepAlive = (name: string, val: boolean) => {
      const recursiveFn = (routes) => {
        routes.forEach((item) => {
          if (item.name === name) {
            item.meta!.keepAlive = val
          } else if (item.children){
            recursiveFn(item.children)
          }
        })
      }
      recursiveFn(router.options.routes)
      console.log(router.options.routes)
    }
    
    const setKeepPage = (toName: string, fromName: string) => {
      // 判断是否进入目标页面
      if (!targetPages.includes(toName)) {
        updateRouterKeepAlive(fromName, false)
      } else {
        updateRouterKeepAlive(fromName, true)
      }
    }
    
    // 设置路由钩子
    onBeforeRouteLeave((to, from) => {
      console.log(to.name)
      console.log(targetPages)
      setKeepPage(to.name as string, from.name as string)
    })
    
    return {
      setKeepPage,
      updateRouterKeepAlive
    }
  }