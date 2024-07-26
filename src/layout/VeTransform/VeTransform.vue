<script setup>
import {computed, ref, watch} from "vue";
import {Euler} from "vue3d";
import {angle2euler, euler2angle} from "vue3d/use/useTransform";
import {useEditorStore} from "@/stores";
import {useSelectedStore} from "@/stores/selected";

/**
 * pinia store
 */
const $editor = useEditorStore()
const $selected = useSelectedStore()

const order = 'XYZ'
const angle = new Euler(0, 0, 0, order)

/**
 * 输入框是否可用
 */
const disabled = ref(true) //
/**
 * position
 */
const position = computed(() => {
  if ($selected.object3d) {
    disabled.value = false
    return $selected.object3d.position
  } else {
    disabled.value = true
    return {x: 0, y: 0, z: 0}
  }
})
/**
 * scale
 */
const scale = computed(() => {
  if ($selected.object3d) {
    disabled.value = false
    return $selected.object3d.scale
  } else {
    disabled.value = true
    return {x: 1, y: 1, z: 1}
  }
})
/**
 * rotation
 * @type
 */
const rotation = computed(() => {
  if ($selected.object3d) {
    disabled.value = false
    angle.setFromQuaternion($selected.object3d.quaternion) // 通过三维对象的四元数获取欧拉角
    return {
      x: euler2angle(angle.x),
      y: euler2angle(angle.y),
      z: euler2angle(angle.z)
    }
  } else {
    disabled.value = true
    return {x: 0, y: 0, z: 0}
  }
})

/**
 * 监听并动态更新Position数据
 */
watch(() => position.value, (val) => {
  if (!$selected.object3d) return
  $selected.component.attr.position = {
    x: Math.round(val.x * 1000) / 1000,
    y: Math.round(val.y * 1000) / 1000,
    z: Math.round(val.z * 1000) / 1000,
  }
}, {deep: true})
/**
 * 监听并动态更新Scale数据
 */
watch(() => scale.value, (val) => {
  if (!$selected.object3d) return
  $selected.component.attr.scale = {
    x: Math.round(val.x * 1000) / 1000,
    y: Math.round(val.y * 1000) / 1000,
    z: Math.round(val.z * 1000) / 1000,
  }
  $selected.component.attr.size = 0
}, {deep: true})
/**
 * 监听并动态更新Rotation数据
 */
watch(() => rotation.value, (val) => {
  if (!$selected.object3d) return
  $selected.component.attr.angle = {
    x: Math.round(val.x * 1000) / 1000,
    y: Math.round(val.y * 1000) / 1000,
    z: Math.round(val.z * 1000) / 1000,
  }
  // angle.x = tf.angle2euler(val.x)
  // angle.y = tf.angle2euler(val.y)
  // angle.z = tf.angle2euler(val.z)
}, {deep: true})

const onRotate = (axes, value) => {
  $selected.getObject().attr.angle[axes.toLowerCase()] = value
  angle[axes.toLowerCase()] = angle2euler(value)
  // angle.setFromQuaternion(editor.selectedObject3d.quaternion)

  // angle.x = tf.angle2euler(val.x)
  // angle.y = tf.angle2euler(val.y)
  // angle.z = tf.angle2euler(val.z)
  $selected.object3d.quaternion.setFromEuler(angle)
  // console.log(editor.selectedObject3d.quaternion.setFromAxisAngle(angle))
  $editor.render()
}
</script>

<template>
  <a-row class="box" key="position">
    <a-col :span="4" class="title">位置</a-col>
    <a-col :span="20">
      <a-input-number class="input"
                      v-model="position.x"
                      :precision="3"
                      :step="0.01"
                      mode="embed"
                      :disabled="disabled"
                      @change="$editor.render">
        <template #prepend>
          <span class="label">x:</span>
        </template>
      </a-input-number>
      <a-input-number class="input"
                      v-model="position.y"
                      :precision="3"
                      :step="0.01"
                      mode="embed"
                      :disabled="disabled"
                      @change="$editor.render">
        <template #prepend>
          <span class="label">y:</span>
        </template>
      </a-input-number>
      <a-input-number class="input"
                      v-model="position.z"
                      :precision="3"
                      :step="0.01"
                      mode="embed"
                      :disabled="disabled"
                      @change="$editor.render">
        <template #prepend>
          <span class="label">z:</span>
        </template>
      </a-input-number>
    </a-col>
  </a-row>

  <a-row class="box" key="scale">
    <a-col :span="4" class="title">缩放</a-col>
    <a-col :span="20">
      <a-input-number class="input"
                      v-model="scale.x"
                      :precision="3"
                      :step="0.001"
                      mode="embed"
                      :disabled="disabled"
                      @change="$editor.render">
        <template #prepend>
          <span class="label">x:</span>
        </template>
      </a-input-number>
      <a-input-number class="input"
                      v-model="scale.y"
                      :precision="3"
                      :step="0.001"
                      mode="embed"
                      :disabled="disabled"
                      @change="$editor.render">
        <template #prepend>
          <span class="label">y:</span>
        </template>
      </a-input-number>
      <a-input-number class="input"
                      v-model="scale.z"
                      :precision="3"
                      :step="0.001"
                      mode="embed"
                      :disabled="disabled"
                      @change="$editor.render">
        <template #prepend>
          <span class="label">z:</span>
        </template>
      </a-input-number>
    </a-col>
  </a-row>

  <a-row class="box" key="rotation">
    <a-col :span="4" class="title">角度</a-col>
    <a-col :span="20">
      <a-input-number class="input"
                      v-model="rotation.x"
                      :precision="3"
                      :step="1"
                      mode="embed"
                      :disabled="disabled"
                      @change="onRotate('x',rotation.x)">
        <template #prepend>
          <span class="label">x:</span>
        </template>
      </a-input-number>
      <a-input-number class="input"
                      v-model="rotation.y"
                      :precision="3"
                      :step="1"
                      mode="embed"
                      :disabled="disabled"
                      @change="onRotate('y',rotation.y)">
        <template #prepend>
          <span class="label">y:</span>
        </template>
      </a-input-number>
      <a-input-number class="input"
                      v-model="rotation.z"
                      :precision="3"
                      :step="1"
                      mode="embed"
                      :disabled="disabled"
                      @change="onRotate('z',rotation.z)">
        <template #prepend>
          <span class="label">z:</span>
        </template>
      </a-input-number>
    </a-col>
  </a-row>
</template>

<style scoped>
.box {
  border: 1px #dddddd dashed;
  margin: 0 0 5px 0;
  box-sizing: border-box;
}

.title {
  height: 100px;
  color: rgb(128, 128, 128);
  word-wrap: break-word; /*英文的时候需要加上这句，自动换行*/
  writing-mode: vertical-rl; /*从左向右 从右向左是 writing-mode: vertical-rl;*/
  text-align: center;
  padding: 0;
  display: flex;
  flex-direction: column;
  justify-content: center;
}

.input {
  margin: 1px 0;
}

.label {
  color: blue;
}
</style>
