<script setup>
import {computed, ref} from "vue";
import VeUvsArea from "../VeUvsArea/VeUvsArea.vue";
import {useDataStore} from "@vue3d/editor/stores";
import {useSelectedStore} from "@vue3d/editor/stores/selected";

const $selected = useSelectedStore()
const $data = useDataStore()

/**
 * 当前选中对象
 */
const selected = computed(() => {
  if ($selected.object3d) {
    if (!$data.uvs.hasOwnProperty($selected.key)) {
      $data.uvs[$selected.key] = {
        editable: false,
        rule: 1024
      }
    }
    return $data.uvs[$selected.key]
  }
  return null
})

const onChangeEditable = (val) => {
  if (val) {
  }
}

const onAddArea = () => {
  $data.uvs[$selected.key].areas.push({
    name: null,
    shape: "rect",
    width: 0,
    height: 0,
    offsetX: 0,
    offsetY: 0
  })
}
</script>

<template>
  <template v-if="$selected.object3d!==null">
    <a-row class="row">
      <a-col :span="6">允许编辑:</a-col>
      <a-col :span="18">
        <a-switch v-model="selected.editable"
                  :disabled="!selected"
                  @change="onChangeEditable">
          <template #checked-icon>
            <icon-font font="vue3d-icon" type="vue3d-yes"></icon-font>
          </template>
          <template #unchecked-icon>
            <icon-font font="vue3d-icon" type="vue3d-no"></icon-font>
          </template>
        </a-switch>
      </a-col>
    </a-row>

    <template v-if="selected.editable">
      <a-row class="row">
        <a-col :span="6">标准:</a-col>
        <a-col :span="18" style="height: 300px">
          <a-select v-model="selected.rule">
            <a-option :value="1024">1024</a-option>
          </a-select>
        </a-col>
      </a-row>

      <a-row class="row">
        <a-col :span="6">编辑区域:</a-col>
        <a-col :span="10">
          <a-tag color="magenta">{{ selected.areas.length }}个</a-tag>
        </a-col>
        <a-col :span="8">
          <a-button type="primary" @click="onAddArea">新增区域</a-button>
        </a-col>
      </a-row>

      <template v-if="selected.areas.length>0">
        <ve-uvs-area v-for="(item,index) in selected.areas" :value="index"></ve-uvs-area>
      </template>
    </template>
  </template>
</template>

<style scoped>
.row {
  height: 36px;
  line-height: 36px;
}
</style>
