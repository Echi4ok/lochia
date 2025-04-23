// src/plugins/alert.ts
import { createApp } from 'vue'
import CustomAlert from '@/components/CustomAlert.vue'

// Создаем и монтируем компонент глобально
const mountPoint = document.createElement('div')
document.body.appendChild(mountPoint)
const alertApp = createApp(CustomAlert)
const alertInstance = alertApp.mount(mountPoint)

// Создаем экспортируемый объект для использования вне компонентов
export const alert = {
  show: (message: string, options?: any) => alertInstance.show(message, options),
  close: () => alertInstance.close()
}

export default {
  install: (app: any) => {
    app.config.globalProperties.$alert = alert
  }
}