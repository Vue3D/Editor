<script setup>
import {computed} from "vue";
import {useDataStore, useMaterialStore} from "@/stores";

const $data = useDataStore()
const $material = useMaterialStore()

defineOptions({
  inheritAttrs: false
})
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
  return $material.get(props.material)
})

</script>
<template>
  <component :is="is" v-bind="attr" v-on="event" :material="mtl">
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
                     :is="$data.getComponent(item.key).component"
                     :name="item.key"
                     :attr="$data.getComponent(item.key).attr"
                     :children="item.children"
                     :event="item.event"
                     :material="item.material">
        </VeComponent>
      </template>

    </template>
  </component>
</template>
