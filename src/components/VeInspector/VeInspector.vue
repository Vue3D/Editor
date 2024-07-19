<script setup>
import {markRaw, reactive} from "vue";
import VeTransform from "../VeTransform";
import VeMaterial from "../VeMaterial";
import VeUvs from "../VeUvs"

const inspector = reactive({
  card: {
    transform: {
      header: "变换 ( Transform )",
      component: markRaw(VeTransform)
    },
    material: {
      header: "材质 ( Material )",
      component: markRaw(VeMaterial)
    },
    uvs: {
      header: "可装饰区域 ( UVs )",
      component: markRaw(VeUvs)
    }
  },
  active: ["transform", "material", "uvs"], // 折叠面板 type: []card.key
})
</script>

<template>
  <a-scrollbar style="height:100%;overflow: auto;" outer-class="scroll">
    <a-collapse :default-active-key="inspector.active" :bordered="false" expand-icon-position="right">
      <a-collapse-item v-for="(item,key) in inspector.card" :header="item.header" :key="key">
        <component :is="item.component"></component>
      </a-collapse-item>
    </a-collapse>
  </a-scrollbar>
</template>


<style scoped>
.scroll {
  height: 100%;
}
</style>
