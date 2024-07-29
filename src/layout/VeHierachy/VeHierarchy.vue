<script setup>
import {inject, onMounted, reactive, ref} from 'vue';
import {useDataStore, useEditorStore, useSelectedStore} from "@vue3d/editor/stores";
import VeDataTool from "../VeDataTool";

const $editor = useEditorStore()
const $selected = useSelectedStore()
const $data = useDataStore()

const treeData = ref($data.hierarchy);
const treeField = reactive({
  key: 'key',
  title: 'name',
  // children: 'items',
  // icon: 'customIcon'
})

const selected = ref([])

const onSelect = (data, node) => {
  if (data.length > 0) {
    $selected.setByName(data[0])
  }
}
/**
 * 拖拽调整节点
 * @param dragNode
 * @param dropNode
 * @param dropPosition
 */
const onDrop = ({dragNode, dropNode, dropPosition}) => {
  $selected.$reset()
  const data = treeData.value;
  const loop = (data, key, callback) => {
    data.some((item, index, arr) => {
      if (item.key === key) {
        callback(item, index, arr);
        return true;
      }
      if (item.children) {
        return loop(item.children, key, callback);
      }
      return false;
    });
  };

  loop(data, dragNode.key, (_, index, arr) => {
    arr.splice(index, 1);
  });

  if (dropPosition === 0) {
    loop(data, dropNode.key, (item) => {
      item.children = item.children || [];
      item.children.push(dragNode);
    });
  } else {
    loop(data, dropNode.key, (_, index, arr) => {
      arr.splice(dropPosition < 0 ? index : index + 1, 0, dragNode);
    });
  }
}

onMounted(() => {
  // $vue3d.on(ev.selected.attach.handler, (target) => {
  //   if (target) {
  //     selected.value = [target.name]
  //   } else {
  //     selected.value = []
  //   }
  // })
})
</script>

<template>
  <div id="hierarchy">
    <a-scrollbar outer-class="scroll" style="height: 100%; overflow: auto">
      <ve-data-tool></ve-data-tool>
      <a-tree
          class="tree"
          draggable
          blockNode
          v-model:selected-keys="selected"
          :checkable="false"
          :data="treeData"
          :fieldNames="treeField"
          :show-line="true"
          @drop="onDrop"
          @select="onSelect"
      />
    </a-scrollbar>
  </div>
</template>

<style scoped>
#hierarchy {
  box-sizing: border-box;
  width: 100%;
  height: 100%;
  padding: 10px;
}

.scroll {
  box-sizing: border-box;
  height: 100%;
  background-color: #fff;
  border-radius: 10px;
  padding: 10px;
}
</style>
