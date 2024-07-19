<script setup>
import {computed, markRaw, reactive, ref} from "vue";
import {Color, TextureLoader} from "vue3d"
import {ColorPicker} from "vue3-colorpicker";
import {useEditorStore, useMaterialStore} from "@/stores";
import {Notification} from '@arco-design/web-vue';

const editor = useEditorStore()
const material = useMaterialStore()
const visible = ref(false)
const visibleAddMtl = ref(false)

let activeMtl = null // 当前选中对象对应的材质对象
let activePure = null // 当前选中对象对应的材质数据

const file = ref()

const columns = [
  {
    title: '材质名',
    dataIndex: 'name',
  },
  {
    title: '操作',
    slotName: 'optional',
    width: 100,
  },
];
const mtlName = ref("")
/**
 * 当前选中材质的唯一键值
 */
const selected = computed({
  get() {
    if (editor.selectedObject3d) {
      const key = editor.selected.node?.material
      activeMtl = material.get(key)
      activePure = material.getPure(key)
      return key
    } else {
      activeMtl = null
      activePure = null
      return null
    }
  },
  set(val) {
    editor.selected.node.material = val
    editor.render()
  }
})
/**
 * 切换颜色
 * @param val
 */
const onChangeColor = (val) => {
  activePure.color = val
  activeMtl.color = new Color(val)
  editor.render()
}
/**
 * 切换是否透明
 * @param val
 */
const onChangeTransparent = (val) => {
  activeMtl.transparent = val
  editor.render()
}
/**
 * 切换透明度
 * @param val
 */
const onChangeOpacity = (val) => {
  activeMtl.opacity = val
  editor.render()
}
const onChangeWireframe = (val) => {
  activeMtl.wireframe = val
  editor.render()
}
const onChangeFlatShading = (val) => {
  activeMtl.flatshading = val
  editor.render()
}
const onUpload = (_, currentFile) => {
  if (currentFile.status === "init") {
    if (!/image\/\w+/.test(currentFile.file.type)) {
      Notification.error("请上传正确的图像文件")
      return false
    }
    const reader = new FileReader()
    reader.readAsDataURL(currentFile.file)
    reader.onload = function (e) {
      const loader = new TextureLoader();
      loader.load(this.result, (texture) => {
        activeMtl.map = texture
        activeMtl.needsUpdate = true
        editor.render()
      })
      activePure.map = this.result
      Notification.success('上传成功')
    }
  }
};
const onUploadProgress = (currentFile) => {
  // console.log(currentFile)
  file.value = currentFile;
};


</script>

<template>
  <a-space id="material" direction="vertical" fill>
    <a-row class="row">
      <a-col :span="8">
        <a-button type="primary" status="success" @click="visible=!visible">材质管理</a-button>
      </a-col>
      <a-col :span="16">
        <a-select :style="{width:'100%'}"
                  v-model="selected"
                  :disabled="editor.selectedObject3d===null">
          <a-option v-for="(item,key) in material.list" :value="key">{{ item.name }}</a-option>
        </a-select>
      </a-col>
    </a-row>

    <template v-if="editor.selectedObject3d!==null&&selected!=='default'">
      <a-row class="row">
        <a-col :span="6">颜色:</a-col>
        <a-col :span="18">
          <div class="color">
            <color-picker v-model:pure-color="activePure.color"
                          :disable-alpha="true"
                          picker-type="chrome"
                          @pureColorChange="onChangeColor"/>
          </div>
        </a-col>
      </a-row>

      <a-row class="row">
        <a-col :span="6">是否透明:</a-col>
        <a-col :span="18">
          <a-switch v-model="activePure.transparent"
                    @change="onChangeTransparent">
            <template #checked-icon>
              <icon-font font="vue3d-icon" type="vue3d-yes"></icon-font>
            </template>
            <template #unchecked-icon>
              <icon-font font="vue3d-icon" type="vue3d-no"></icon-font>
            </template>
          </a-switch>
        </a-col>
      </a-row>

      <a-row class="row">
        <a-col :span="6">透明度:</a-col>
        <a-col :span="18">
          <a-slider
              v-model="activePure.opacity"
              :min="0"
              :max="1"
              :step="0.01"
              :style="{ width: '200px' }"
              @change="onChangeOpacity"/>
        </a-col>
      </a-row>

      <a-row>
        <a-col :span="6">纹理贴图:</a-col>
        <a-col :span="18">
          <a-upload
              :fileList="file ? [file] : []"
              :show-file-list="false"
              @change="onUpload"
              @progress="onUploadProgress"
              image-preview>
            <template #upload-button>
              <div>
                <div class="arco-upload-list-picture custom-upload-avatar" v-if="activePure.map">
                  <img :src="activePure.map" alt=""/>
                  <div class="arco-upload-list-picture-mask">
                    <icon-font font="vue3d-icon" type="vue3d-upload"/>
                  </div>
                </div>
                <div class="arco-upload-picture-card" v-else>
                  <div class="arco-upload-picture-card-text">
                    <icon-font font="vue3d-icon" type="vue3d-upload"/>
                    <div style="margin-top: 10px; font-weight: 600">点击上传</div>
                  </div>
                </div>
              </div>
            </template>
          </a-upload>
        </a-col>
      </a-row>
      <a-row class="row" style="border-top: 1px solid #dddddd;">
        <a-col :span="6">网格视图:</a-col>
        <a-col :span="6">
          <a-switch @change="onChangeWireframe">
            <template #checked-icon>
              <icon-font font="vue3d-icon" type="vue3d-yes"></icon-font>
            </template>
            <template #unchecked-icon>
              <icon-font font="vue3d-icon" type="vue3d-no"></icon-font>
            </template>
          </a-switch>
        </a-col>
        <a-col :span="6">平面着色:</a-col>
        <a-col :span="6">
          <a-switch @change="onChangeFlatShading">
            <template #checked-icon>
              <icon-font font="vue3d-icon" type="vue3d-yes"></icon-font>
            </template>
            <template #unchecked-icon>
              <icon-font font="vue3d-icon" type="vue3d-no"></icon-font>
            </template>
          </a-switch>
        </a-col>
      </a-row>
    </template>
  </a-space>

  <a-modal v-model:visible="visible">
    <template #title>
      材质管理
    </template>

    <a-table :columns="columns" :data="material.table">
      <template #optional="{ record }">
        <a-button status="danger"
                  :disabled="record.data.readonly"
                  @click="material.remove(record.key)">删除
        </a-button>
      </template>
    </a-table>

    <template #footer>
      <a-button type="primary" @click="visibleAddMtl=!visibleAddMtl">添加</a-button>
      <a-button @click="visible=!visible">关闭</a-button>
    </template>
  </a-modal>

  <a-modal v-model:visible="visibleAddMtl" :z-index="99" @ok="material.create(mtlName)">
    <template #title>
      添加材质
    </template>
    <a-input v-model="mtlName"></a-input>
  </a-modal>
</template>

<style scoped>
#material {
  box-sizing: border-box;
}

.row {
  height: 36px;
  line-height: 36px;
}

.color {
  float: left;
  display: inline-block;
  width: 32px;
  height: 32px;
  margin: 2px;
}
</style>
<style>
.vc-color-wrap {
  width: 28px !important;
  height: 28px !important;
  border: 3px solid #ffffff;
  margin: 2px;
  box-sizing: border-box;
}
</style>
