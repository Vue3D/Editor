<script setup>
import {computed} from "vue";
import {useEditorStore, useSelectedStore} from "@/stores";

const $editor = useEditorStore()
const $selected = useSelectedStore()

const props = defineProps({
  value: {type: Number}
})

const data = computed(() => {
  if ($selected.object3d) {
    return $editor.uvs[$selected.key].areas[props.value]
  }
  return null
})

const onDel = () => {
  $editor.uvs[$selected.key].areas.splice(props.value, 1)
}
</script>

<template>
  <a-row class="card">
    <a-card title="Arco Card">
      <template #title>
        <a-input v-model="data.name">
          <template #append>
            <a-select v-model="data.shape" style="width: 100px">
              <a-option value="rect">矩形</a-option>
              <a-option value="circle">圆形</a-option>
            </a-select>
          </template>
        </a-input>

      </template>
      <template #extra>
        <a-link @click="onDel">删除</a-link>
      </template>
      <a-row class="row">
        <a-col :span="3">宽</a-col>
        <a-col :span="9">
          <a-input-number v-model="data.width"></a-input-number>
        </a-col>
        <a-col :span="3">高</a-col>
        <a-col :span="9">
          <a-input-number v-model="data.height"></a-input-number>
        </a-col>
      </a-row>
      <a-row class="row">
        <a-col :span="3">x</a-col>
        <a-col :span="9">
          <a-input-number v-model="data.offsetX"></a-input-number>
        </a-col>
        <a-col :span="3">y</a-col>
        <a-col :span="9">
          <a-input-number v-model="data.offsetY"></a-input-number>
        </a-col>
      </a-row>
    </a-card>
  </a-row>
</template>

<style scoped>
.row {
  height: 36px;
  line-height: 36px;
  text-align: center;
}
</style>
