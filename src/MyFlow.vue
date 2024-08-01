<script setup>
import '@vue-flow/controls/dist/style.css'
import '@vue-flow/core/dist/style.css'
import '@vue-flow/core/dist/theme-default.css'

import { ref } from 'vue'
import { VueFlow, useVueFlow, Panel } from '@vue-flow/core'
import { Background } from '@vue-flow/background'
import { Controls } from '@vue-flow/controls'

const emit = defineEmits(['update:nodes', 'update:edges'])

const props = defineProps({
  flowId: {
    type: String,
    required: true
  }
})

const { vueFlowRef } = useVueFlow(props.flowId)

const vNodes = defineModel('nodes', { type: Array, required: true })
const vEdges = defineModel('edges', { type: Array, required: true })

let isHotUpdate = false

function onModelUpdateNodes(nodes) {
  // if (isHotUpdate) {
  //   return
  // }
  
  console.log('myflow.vue emit update nodes')
  emit('update:nodes', nodes)
}

function onModelUpdateEdges(edges) {
  // if (isHotUpdate) {
  //   return
  // }

  console.log('myflow.vue emit update edges')
  emit('update:edges', edges)
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

console.log(123123)

</script>
<template>
  <div class="flow-container">
    <vue-flow
      :id="props.flowId"
      :nodes="vNodes"
      :edges="vEdges"
      @update:nodes="onModelUpdateNodes"
      @update:edges="onModelUpdateEdges"
      deleteKeyCode="delete">
      
      <background />
      <controls />
    </vue-flow>
  </div>
</template>

<style>

.flow-container {
  height: 89vh;
  width: 100%;
}


</style>