import { ref } from 'vue'
import { defineStore, acceptHMRUpdate } from 'pinia'

const useGraphStore = defineStore('graphStore', () => {
  const nodes = ref([])
  const edges = ref([])

  return {
    nodes,
    edges
  }
})

export default useGraphStore

// for HMR, reload the store if needed
if (import.meta.hot) {
  console.log('hot module replacement enabled for useGraphStore')
  import.meta.hot.accept(acceptHMRUpdate(useGraphStore, import.meta.hot))
}

