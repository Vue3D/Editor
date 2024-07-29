<script setup>
import {image_path, label_list, object_list, uv_data} from "@/api/yunyan";
import ResourceList from "./ResourceList.vue";
import {VcImage} from "@unjuanable/vcui";
import {inject, onMounted, reactive, ref} from "vue";
import {errImage} from "@/assets/base64";
import {useEditorStore} from "@vue3d/editor/stores";

const editor = useEditorStore()
const canvue = inject('canvue')
const ErrImage = ref(errImage)
// const label = ref(null)
const data = reactive({
  list: [],
  labels: [],
  total: 0,
  query: {
    label: null,
    p: 1,
    n: 10
  }
})

const onPick = (item) => {
  const key = editor.addYyObject(item.name, item.hash, item.format)
  uv_data(item.id).then(res => {
    if (res.data && res.data.length > 0) {
      const uv = {
        editable: true,
        rule: 1024,
        areas: []
      }
      res.data.forEach(ite => {
        const data = {
          name: ite.name,
          shape: ite.shape,
          width: ite.width,
          height: ite.height,
          offsetX: ite.x,
          offsetY: ite.y
        }
        uv.areas.push(data)
      })
      console.log(key)
      editor.uvs[key] = uv
    }
  })
}

onMounted(() => {
  loadLabel()
  loadObject()
})

const loadLabel = () => {
  label_list().then(res => {
    data.labels = res.data
  })
}

const loadObject = () => {
  object_list({t: data.query.label, p: data.query.p, n: data.query.n}).then(res => {
    data.total = res.data.list.total
    data.list = res.data.list.data
  })
}

const changeLabel = (label) => {
  data.query.label = label
  data.query.p = 1
  loadObject()
}
</script>

<template>
  <resource-list>
    <template v-slot:header>
      <div class="header">
        <a-tag checkable color="blue" :checked="data.query.label===null" @check="changeLabel(null)">全部</a-tag>
        <template v-for="item in data.labels">
          <a-tag checkable color="blue" :checked="data.query.label===item.tag" @check="changeLabel(item.tag)">
            {{ item.tag }}
          </a-tag>
        </template>
      </div>
    </template>
    <template v-slot:list>
      <div class="m-image">
        <div class="item" v-for="(item,index) in data.list" @click="onPick(item,index,$event)">
          <div class="preview">
            <div class="image">
              <vc-image width="100%" height="100%" mode="contain" :src="image_path(item.thumbnail)"
                        :fallback="ErrImage"/>
            </div>
            <div class="label">{{ item.name }}</div>
          </div>
        </div>
      </div>
    </template>
    <template v-slot:footer>
      <div class="footer">
        <a-pagination v-model:current="data.query.p" :total="data.total" simple @change="loadObject"/>
      </div>
    </template>
  </resource-list>
</template>

<style scoped>
.header {
  height: 60px;
  width: 96%;
  background-color: #2f2f2f;
  box-sizing: border-box;
  margin: 10px auto 0;
  padding: 5px 0;
}

.header span {
  color: #ffffff;
  font-size: 14px;
}

.footer {
  height: 40px;
  width: 100%;
  line-height: 40px;
  background-color: #ffffff;
  display: flex;
  justify-content: center;
}

.footer li {
  color: #ffffff !important;
}

.footer span {
  color: #ffffff !important;
}

.m-image {
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  justify-content: space-between;
  width: 100%;
  height: 100%;
  column-count: 2;
  padding: 10px 2%;
  box-sizing: border-box;
}

.item {
  width: 48%;
  height: calc(20% - 10px);
  margin-bottom: 10px;
  cursor: pointer;
  background-color: #2f2f2f;
  box-sizing: border-box;
}

.item .preview {
  position: relative;
  width: 100%;
  height: 100%;
}

.item .preview .image {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  background-image: linear-gradient(90deg, rgba(50, 0, 0, 0.1) 3%, rgba(0, 0, 0, 0) 3%), linear-gradient(360deg, rgba(50, 0, 0, 0.1) 3%, rgba(0, 0, 0, 0) 3%);
}

.item .preview .label {
  position: absolute;
  bottom: 3px;
  left: 0;
  width: 100%;
  height: 25px;
  color: #ffffff;
  text-align: center;
  line-height: 20px;
  background-color: rgba(0, 0, 0, 0.6);
}

.item.active {
  background: #003d88;
}

ul {
  margin: 0;
  padding: 0;
}

li {
  list-style: none;
}
</style>
