<script setup>
import {useEditorStore} from "../../stores/editor";

const editor = useEditorStore()

</script>

<template>
  <a-row justify="end">
    <a-button-group type="outline">
      <a-dropdown position="bl">
        <a-button status="success">
          <template #icon>
            <icon-font font="vue3d-icon" type="vue3d-add"/>
          </template>
        </a-button>
        <template #content>
          <a-doption @click="editor.addCube">
            <template #icon>
              <icon-font font="vue3d-icon" type="vue3d-cube"/>
            </template>
            <template #default>立方体</template>
          </a-doption>
          <a-doption @click="editor.addSphere">
            <template #icon>
              <icon-font font="vue3d-icon" type="vue3d-sphere"/>
            </template>
            <template #default>球体</template>
          </a-doption>
        </template>
      </a-dropdown>
      <a-button status="danger" @click="editor.remove">
        <template #icon>
          <icon-font font="vue3d-icon" type="vue3d-remove"/>
        </template>
      </a-button>
    </a-button-group>

  </a-row>
</template>

