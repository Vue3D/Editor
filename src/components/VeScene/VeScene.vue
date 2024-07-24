<script setup>
import {onMounted, ref} from "vue";
import {V3dStage} from "vue3d";
import {useEditorStore, useMaterialStore} from "@/stores";
import VeComponent from "../VeComponent";

const $editor = useEditorStore()

const props = defineProps({
  width: {type: Number, default: 100},
  height: {type: Number, default: 100}
})
const editor = ref(null)

onMounted(() => {
  $editor.init(editor.value)
})
</script>

<template>
  <div :style="{width,height}">
    <v3d-stage ref="editor" id="editor" :width="width" :height="height">
      <template v-for="item in $editor.preset">
        <VeComponent :is="item.component"
                     :attr="item.attr"
                     :children="item.children"
                     :event="item.event"
                     preset>
        </VeComponent>
      </template>
      <template v-for="item in $editor.hierarchy">
        <VeComponent v-if="$editor.getObject(item.key)"
                     :is="$editor.getObject(item.key).component"
                     :name="item.key"
                     :attr="$editor.getObject(item.key).attr"
                     :children="item.children"
                     :event="item.event"
                     :material="item.material">
        </VeComponent>
      </template>
    </v3d-stage>
  </div>
</template>


