<script setup>
import {useTransformStore} from "@/stores/transform";
import {useIcon} from "@unjuanable/iconfont";

const transformStore = useTransformStore()
const changeMode = (val) => {
  transformStore.mode = val
}
const changeSpace = (val) => {
  transformStore.space = val
}
</script>

<template>
  <a-row id="ve-transform-mode">
    <a-button-group class="btns" type="secondary" size="large">
      <a-button class="btn"
                :type="transformStore.mode==='translate'?'primary':''"
                @click="changeMode('translate')"
                v-html="useIcon('vue3d-translate','16px','vue3d-icon')"></a-button>
      <a-button class="btn"
                :type="transformStore.mode==='rotate'?'primary':''"
                @click="changeMode('rotate')"
                v-html="useIcon('vue3d-rotation','16px','vue3d-icon')"></a-button>
      <a-button class="btn"
                :type="transformStore.mode==='scale'?'primary':''"
                @click="changeMode('scale')"
                v-html="useIcon('vue3d-scale','16px','vue3d-icon')"></a-button>
    </a-button-group>

    <a-button-group class="btns" type="secondary" size="large">
      <a-button class="btn"
                :type="transformStore.space==='world'?'primary':''"
                @click="changeSpace('world')"
                v-html="useIcon('vue3d-world-space','vue3d-icon')"></a-button>
      <a-button class="btn"
                :type="transformStore.space==='local'?'primary':''"
                @click="changeSpace('local')"
                v-html="useIcon('vue3d-local-space','vue3d-icon')"></a-button>
    </a-button-group>
  </a-row>
</template>

<style scoped>
#ve-transform-mode {
  position: absolute;
  top: 10px;
  left: 10px;
}

.btns {
  margin: 0 5px 0 0;
}

.btn {
  width: 35px;
  text-align: center;
}
</style>
