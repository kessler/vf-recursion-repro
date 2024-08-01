<script setup>
/**
 * With pinia store
 * 
 */

import { ref, inject } from 'vue'
import MyFlow from './MyFlow.vue'

const store = inject('graphStore')

function newNode(x = 100, y = 100) {
  return { 
    id: Date.now().toString(), 
    position: { x, y }, 
    type: 'default', 
    data: { label: '123' } 
  }
}

function addNode() {
  store.nodes = [
    ...store.nodes,
    newNode(200, 200)
  ]
}

let isHotUpdate = false

function onModelUpdateNodes(newNodes) {
  // if (isHotUpdate) {
  //   return
  // }
  store.nodes = newNodes
  console.log('app.vue update nodes')
}

function onModelUpdateEdges(newEdges) {
  // if (isHotUpdate) {
  //   return
  // }

  store.edges = newEdges
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
  <button @click="addNode">new node</button>
  <div style="width: 100vh">
    <my-flow 
      flow-id="main"
      :nodes="store.nodes"
      :edges="store.edges"
      @update:nodes="onModelUpdateNodes"
      @update:edges="onModelUpdateEdges"
    />
  </div>
</template>

<style scoped>

</style>
