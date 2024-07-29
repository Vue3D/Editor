<script setup>
import {VcPcAppLayout, VcSidebar, VcSidebarItem} from "@unjuanable/vcui";
import {onMounted, ref} from "vue";
import VeInspector from "@vue3d/editor/layout/VeInspector";
import VeTransformMode from "@vue3d/editor/layout/VeTransformMode";
import VeHierarchy from "@vue3d/editor/layout/VeHierachy";
import VeScene from "@vue3d/editor/layout/VeScene";
import {useEditorStore, useEventbusStore} from "@vue3d/editor/stores";
import MyObjectsList from "./components/MyObjectsList.vue";
import {load, save, update} from "./api/yunyan";
import {useIcon} from "@unjuanable/iconfont";

const $editor = useEditorStore()
const $eventbus = useEventbusStore()

const collapsed = ref(false)
const collapse_right = ref(true)
const activate = ref(0)
const visible = ref(false)
const name = ref("")

const parsedUrl = new URL(window.location.href);
let id = parsedUrl.searchParams.get("id")

onMounted(() => {
  if (id) {
    load({id}).then(res => {
      if (res.code === 2000) {
        const obj = JSON.parse(res.data[0].uvs)
        name.value = res.data[0].name
        $editor.load(obj)
      }
    })
  }
  $editor.addCube()
})

const handleCancel = () => {
}

const handleBeforeOk = async () => {
  const thumbnail = $editor.stage.dom.canvas.toDataURL()
  if (id) {
    await update({
      id: id,
      name: name.value,
      thumbnail: thumbnail,
      uvs: $editor.save()
    });
    return true;
  } else {
    const res = await save({
      name: name.value,
      thumbnail: thumbnail,
      uvs: $editor.save()
    });
    id = res.data
    return true;
  }
  // prevent close
  // return false;
};

document.addEventListener('contextmenu', function (event) {
  event.preventDefault()
})
document.addEventListener('dblclick', function (event) {
  event.preventDefault()
})
</script>

<template>
  <vc-pc-app-layout :right-panel-width="300"
                    :leftPanelWidth="collapsed?400:80"
                    :show-right-panel="collapse_right">
    <template #left-panel>
      <vc-sidebar :label-size="80" v-model:collapsed="collapsed" v-model:activated="activate">
        <vc-sidebar-item label="库"
                         :icon="useIcon('vue3d-database','24px','vue3d-icon')"
                         :active="activate===0"
                         keepalive>
          <my-objects-list></my-objects-list>
        </vc-sidebar-item>
        <vc-sidebar-item label="层级"
                         :icon="useIcon('vue3d-Hierarchy','24px','vue3d-icon')"
                         :active="activate===1">
          <ve-hierarchy></ve-hierarchy>
        </vc-sidebar-item>
      </vc-sidebar>
    </template>

    <template #right-panel>
      <ve-inspector></ve-inspector>
    </template>

    <template #content="params">
      <ve-scene :width="params.width" :height="params.height"></ve-scene>
      <ve-transform-mode></ve-transform-mode>

      <div class="save">
        <a-button @click="visible=!visible" status="success">
          <template #icon>
            <icon-font font="vue3d-icon" type="vue3d-save"/>
          </template>
        </a-button>
        <a-button @click="collapse_right=!collapse_right">
          <template #icon>
            <icon-font v-if="collapse_right" font="vue3d-icon" type="vue3d-collapse-right"/>
            <icon-font v-else font="vue3d-icon" type="vue3d-collapse-left"/>
          </template>
        </a-button>
      </div>
    </template>
  </vc-pc-app-layout>

  <a-modal v-model:visible="visible"
           @cancel="handleCancel"
           :on-before-ok="handleBeforeOk"
           unmountOnClose>
    <template #title>
      确认是否保存？
    </template>
    <a-input v-model="name" placeholder="请输入保存的方案名称..."/>
  </a-modal>
</template>

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

.save {
  position: absolute;
  top: 10px;
  right: 10px;
}
</style>
