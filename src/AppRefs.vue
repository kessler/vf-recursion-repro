<script setup>
/**
 * With simple Refs as store 
 * 
 */

import { ref, inject } from 'vue'
import MyFlow from './MyFlow.vue'

//const store = inject('graphStore')
const nodes = ref([])
const edges = ref([])

function newNode(x = 100, y = 100) {
  return { 
    id: Date.now().toString(), 
    position: { x, y }, 
    type: 'default', 
    data: { label: '123' } 
  }
}

function addNode() {
  nodes.value = [
    ...nodes.value,
    newNode(200, 200)
  ]
}

let isHotUpdate = false

function onModelUpdateNodes(newNodes) {
  // if (isHotUpdate) {
  //   return
  // }
  nodes.value = newNodes
  console.log('app.vue update nodes')
}

function onModelUpdateEdges(newEdges) {
  // if (isHotUpdate) {
  //   return
  // }

  edges.value = newEdges
  console.log('app.vue update edges')
}

if (import.meta.hot) {  
  const hot = import.meta.hot

  hot.on('vite:beforeUpdate', () => {
    isHotUpdate = true
  })

  hot.on('vite:afterUpdate', () => {
    isHotUpdate = false
  })
}

</script>

<template>
  <div class="main-container">
    <button @click="addNode">new node</button>
    <my-flow 
      flow-id="main"
      :nodes="nodes"
      :edges="edges"
      @update:nodes="onModelUpdateNodes"
      @update:edges="onModelUpdateEdges"
    />
  </div>
</template>

<style scoped>
.main-container {
  width: 100vh;
}
</style>
