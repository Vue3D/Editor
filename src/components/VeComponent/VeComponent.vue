<script setup>
import {V3dSphere, V3dCube} from "vue3d/node"
import {useEditorStore, useMaterialStore} from "@/stores";
import {computed} from "vue";

const editor = useEditorStore()
const material = useMaterialStore()

const props = defineProps({
  is: {type: String},
  name: {type: String},
  attr: {type: Object},
  event: {
    type: Object, default() {
      return {}
    }
  },
  children: {type: [Array, null]},
  preset: {type: Boolean, default: false},
  material: {type: String}
})

const mtl = computed(() => {
  return material.get(props.material)
})
</script>
<template>
  <component :is="is"
             :name="name"
             :material="mtl"
             v-bind="attr"
             v-on="event"
  >
    <template v-if="children?.length>0">
      <!--预设对象-->
      <template v-if="preset">
        <VeComponent v-for="item in children"
                     :is="item.component"
                     :attr="item.attr"
                     :event="item.event"
                     :children="item.children"
                     preset>
        </VeComponent>
      </template>
      <!--三维对象-->
      <template v-else>
        <VeComponent v-for="item in children"
                     :is="editor.getObject(item.key).component"
                     :name="item.key"
                     :attr="editor.getObject(item.key).attr"
                     :children="item.children"
                     :event="item.event"
                     :material="item.material">
        </VeComponent>
      </template>

    </template>
  </component>
</template>
