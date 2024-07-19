<template>
  <!--  创建舞台场景 -->
  <v3d-stage ref="base" :width="width" :height="800">
    <!--添加主摄像机-->
    <v3d-perspective-camera :position="camPosition" main>
      <!--添加摄像机旋转控制器-->
      <v3d-camera-orbit-control/>
      <v3d-camera-transform-control :target="target" :mode="mode" @change="update"/>
      <!--添加射线检测器-->
      <v3d-camera-raycaster @cast="onCast" @pick="onPick"/>
      <!--添加平行光-->
      <v3d-directional-light :position="{x:0,y:20,z:0}" :intensity="1"></v3d-directional-light>
    </v3d-perspective-camera>
    <!--添加基础模型-->
    <v3d-cube></v3d-cube>
    <v3d-sphere :position="{x:1,y:0,z:0}"></v3d-sphere>
    <!--添加环境光-->
    <v3d-ambient-light></v3d-ambient-light>
    <!--添加网格线-->
    <v3d-grid-helper></v3d-grid-helper>
  </v3d-stage>
</template>

<script setup>

import {onMounted, ref, toRaw, watch} from "vue";
import {
  V3dAmbientLight,
  V3dCameraOrbitControl,
  V3dCameraRaycaster,
  V3dCameraTransformControl,
  V3dCube,
  V3dDirectionalLight,
  V3dGridHelper,
  V3dPerspectiveCamera,
  V3dSphere,
  V3dStage
} from "vue3d";

const base = ref(null)
const mode = ref("translate")
const width = ref(800)

const target = ref(null)
const cube = ref(null)
const boxHelper = ref(null)

const camPosition = ref({x: 0, y: 0, z: 20})
const cubePosition = ref({y: 1})
const cubeScale = ref({y: 1})
const cubeAngle = ref({y: 45})
const onCast = (val) => {
  // console.log(val)
}

const update = (e) => {
  // console.log(e)
}

watch(() => cubePosition, (val) => {
  console.log(val)
})

const callPosition = (val) => {
  cubePosition.value = val
}

const onPick = (val) => {
  // console.log(val)
  target.value = toRaw(val)
}

onMounted(async () => {
  window.addEventListener('keydown', function (event) {
    switch (event.key) {
      case 'q':
        mode.value = "translate"
        break;

      case 'w':
        mode.value = "rotate"
        break;

      case "e":
        mode.value = "scale"
        break;

      case "t":
        if (mode.value === "translate") {
          cubePosition.value.y++
          console.log(cubePosition.value)
        } else if (mode.value === "rotate") {
          cubeAngle.value.y += 10
          console.log(cubeAngle.value)
        } else if (mode.value === "scale") {
          cubeScale.value.y += 0.2
          console.log(cubeScale.value)
        }
        break;
    }
  })

})


</script>

<style>
* {
  margin: 0;
  padding: 0;
}

html, body {
  width: 100%;
  height: 100%;
}

#app {
  width: 100%;
  height: 100%;
  overflow: hidden;
}
</style>
