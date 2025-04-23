<template>
    <!-- Затемнение фона с анимацией -->
    <transition
    enter-active-class="transition-opacity duration-300 ease-out"
    enter-from-class="opacity-0"
    enter-to-class="opacity-100"
    leave-active-class="transition-opacity duration-200 ease-in"
    leave-from-class="opacity-100"
    leave-to-class="opacity-0"
  >
      <div 
        v-if="visible" 
        class="fixed inset-0 bg-black  flex items-center justify-center z-50"
        @click.self="close"
        style="background-color: rgba(0, 0, 0, 0.5);"
      >
        <!-- Анимация появления/исчезновения модального окна -->
        <transition
          enter-active-class="transition-all duration-300 ease-out"
          enter-from-class="transform -translate-y-10 opacity-0"
          enter-to-class="transform translate-y-0 opacity-100"
          leave-active-class="transition-all duration-200 ease-in"
          leave-from-class="transform translate-y-0 opacity-100"
          leave-to-class="transform translate-y-10 opacity-0"
        >
          <div 
            v-if="visible" 
            class="bg-white rounded-xl shadow-xl max-w-md w-full mx-4 overflow-hidden"
            :class="alertTypeClasses"
          >
            <!-- Иконка в зависимости от типа -->
            <div class="p-6 text-center">
              <div class="mx-auto flex items-center justify-center h-12 w-12 rounded-full mb-4" :class="iconBgClasses">
                <component :is="alertIcon" class="h-6 w-6 " />
              </div>
              
              <h3 class="text-lg font-medium text-gray-900 mb-2">
                {{ title }}
              </h3>
              
              <p class="text-sm text-gray-500">
                {{ message }}
              </p>
            </div>
            
            <!-- Кнопки -->
            <div class="bg-gray-50 px-4 py-3 sm:flex sm:flex-row-reverse sm:px-6">
              <button
                type="button"
                class="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 text-base font-medium text-white focus:outline-none focus:ring-2 focus:ring-offset-2 sm:ml-3 sm:w-auto sm:text-sm"
                :class="buttonClasses"
                @click="close"
              >
                {{ buttonText }}
              </button>
            </div>
          </div>
        </transition>
      </div>
    </transition>
  </template>
  
  <script setup lang="ts">
  import { ref, computed } from 'vue'
  import { CheckCircleIcon, ExclamationCircleIcon, InformationCircleIcon, XCircleIcon } from '@heroicons/vue/24/outline'
  
  type AlertType = 'success' | 'error' | 'warning' | 'info'
  
  const visible = ref(false)
  const message = ref('')
  const title = ref('')
  const buttonText = ref('OK')
  const type = ref<AlertType>('info')
  
  const alertIcons = {
    success: CheckCircleIcon,
    error: XCircleIcon,
    warning: ExclamationCircleIcon,
    info: InformationCircleIcon
  }
  
  const alertTypeClasses = computed(() => {
    return {
      'success': 'border-l-4 border-green-500',
      'error': 'border-l-4 border-red-500',
      'warning': 'border-l-4 border-yellow-500',
      'info': 'border-l-4 border-blue-500'
    }[type.value]
  })
  
  const iconBgClasses = computed(() => {
    return {
      'success': 'bg-green-100',
      'error': 'bg-red-100',
      'warning': 'bg-yellow-100',
      'info': 'bg-blue-100'
    }[type.value]
  })
  
  const buttonClasses = computed(() => {
    return {
      'success': 'bg-green-600 hover:bg-green-700 focus:ring-green-500',
      'error': 'bg-red-600 hover:bg-red-700 focus:ring-red-500',
      'warning': 'bg-yellow-600 hover:bg-yellow-700 focus:ring-yellow-500',
      'info': 'bg-blue-600 hover:bg-blue-700 focus:ring-blue-500'
    }[type.value]
  })
  
  const alertIcon = computed(() => alertIcons[type.value])
  
  const show = (msg: string, options: { 
    buttonText?: string, 
    title?: string, 
    type?: AlertType 
  } = {}) => {
    message.value = msg
    buttonText.value = options.buttonText || 'OK'
    title.value = options.title || getDefaultTitle(options.type)
    type.value = options.type || 'info'
    visible.value = true
  }
  
  const close = () => {
    visible.value = false
  }
  
  const getDefaultTitle = (t?: AlertType) => {
    switch(t) {
      case 'success': return 'Успешно!'
      case 'error': return 'Ошибка!'
      case 'warning': return 'Внимание!'
      default: return 'Информация'
    }
  }
  
  defineExpose({ show, close })
  </script>