<script setup>
import {useIcon} from "@unjuanable/iconfont";
import {useEditorStore} from "@vue3d/editor/stores";

const $editor = useEditorStore()
const changeMode = (val) => {
  $editor.transform.mode = val
}
const changeSpace = (val) => {
  $editor.transform.space = val
}
</script>

<template>
  <a-row id="ve-transform-mode">
    <a-button-group class="btns" type="secondary" size="large">
      <a-button class="btn"
                :type="$editor.transform.mode==='translate'?'primary':''"
                @click="changeMode('translate')"
                v-html="useIcon('vue3d-translate','16px','vue3d-icon')"></a-button>
      <a-button class="btn"
                :type="$editor.transform.mode==='rotate'?'primary':''"
                @click="changeMode('rotate')"
                v-html="useIcon('vue3d-rotation','16px','vue3d-icon')"></a-button>
      <a-button class="btn"
                :type="$editor.transform.mode==='scale'?'primary':''"
                @click="changeMode('scale')"
                v-html="useIcon('vue3d-scale','16px','vue3d-icon')"></a-button>
    </a-button-group>

    <a-button-group class="btns" type="secondary" size="large">
      <a-button class="btn"
                :type="$editor.transform.space==='world'?'primary':''"
                @click="changeSpace('world')"
                v-html="useIcon('vue3d-world-space','16px','vue3d-icon')"></a-button>
      <a-button class="btn"
                :type="$editor.transform.space==='local'?'primary':''"
                @click="changeSpace('local')"
                v-html="useIcon('vue3d-local-space','16px','vue3d-icon')"></a-button>
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
