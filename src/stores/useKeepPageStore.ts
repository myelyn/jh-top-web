import { defineStore } from 'pinia'
import { ref, computed } from 'vue'

export const useKeepPageStore = defineStore('keeppage', () => {
  const includeSet = ref(new Set<string>())
  const include = computed(() => {
    return Array.from(includeSet.value)
  })
  
  const addInclude = (name) => {
    includeSet.value.add(name)
  }

  const removeInclude = (name) => {
    includeSet.value.delete(name)
  }

  return {
    include,
    addInclude,
    removeInclude
  }
})