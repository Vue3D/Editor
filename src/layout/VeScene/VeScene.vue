<script setup>
import {onMounted, ref} from "vue";
import {V3dStage} from "vue3d";
import {useDataStore, useEditorStore} from "@/stores";
import VeComponent from "./component/VeComponent.vue";
import {usePresetStore} from "@/stores/preset";

const $editor = useEditorStore()
const $data = useDataStore()
const $preset = usePresetStore()

const props = defineProps({
  width: {type: Number, default: 100},
  height: {type: Number, default: 100}
})

const editor = ref(null)

onMounted(() => {
  $editor.init(editor.value.stage)
})
</script>

<template>
  <div :style="{width,height}">
    <v3d-stage ref="editor" id="editor" :width="width" :height="height">
      <template v-for="item in $preset.data">
        <VeComponent :is="item.component"
                     :attr="item.attr"
                     :children="item.children"
                     :event="item.event"
                     preset>
        </VeComponent>
      </template>
      <template v-for="item in $data.hierarchy">
        <VeComponent v-if="$data.getComponent(item.key)"
                     :is="$data.getComponent(item.key).component"
                     :name="item.key"
                     :attr="$data.getComponent(item.key).attr"
                     :children="item.children"
                     :event="item.event"
                     :material="item.material">
        </VeComponent>
      </template>
    </v3d-stage>
  </div>
</template>


