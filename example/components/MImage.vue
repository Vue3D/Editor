<template>
    <resource-list>
        <template v-slot:header>
            <div class="header">
                <a-tag checkable color="blue" :checked="data.query.label===null" @check="changeLabel(null)">全部</a-tag>
                <template v-for="item in data.labels">
                    <a-tag checkable color="blue" :checked="data.query.label===item.tag" @check="changeLabel(item.tag)">{{ item.tag }}</a-tag>
                </template>
            </div>
        </template>
        <template v-slot:list>
            <div class="m-image">
                <div class="item" v-for="(item,index) in data.list" @click="onPick(item,index,$event)">
                    <div class="preview">
                        <div class="image">
                            <vc-image width="100%" height="100%" mode="contain" :src="image_path(item.thumbnail)" :fallback="ErrImage"/>
                        </div>
                        <div class="label">{{ item.material_name }}</div>
                    </div>
                </div>
            </div>
        </template>
        <template v-slot:footer>
            <div class="footer">
                <a-pagination v-model:current="data.query.p" :total="data.total" simple @change="loadMtl"/>
            </div>
        </template>
    </resource-list>
</template>

<script>
import {inject, onMounted, reactive, ref} from "vue";
import {errImage} from "../assets/base64.js";
import {event as ev, loadFromURL} from "@canvue/canvue";
import {image_path, label_list, material_list} from "@/api/yunyan.js"
import {VcImage} from "@unjuanable/vcui"
import ResourceList from "./ResourceList.vue";

export default {
    name: "MImage",
    components: {ResourceList, VcImage},
    setup(props) {
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
            loadFromURL(image_path(item.thumbnail), (img) => {
                if (canvue.getActive()?.width > canvue.getActive()?.height) {
                    img.scaleToHeight(canvue.getActive()?.height)
                } else {
                    img.scaleToWidth(canvue.getActive()?.width)
                }
                canvue.toAdd(img, 'image')
                canvue.getActive().viewportCenterObject(img)
                canvue.getActive().renderAll()
                canvue.emit(ev.stage.refresh.handler)
                canvue.emit(ev.stage.added.handler, image_path(item.thumbnail))
            })
        }

        onMounted(() => {
            loadLabel()
            loadMtl()
        })

        const loadLabel = () => {
            label_list().then(res => {
                data.labels = res.data
            })
        }

        const loadMtl = () => {
            material_list({t: data.query.label, p: data.query.p, n: data.query.n}).then(res => {
                data.total = res.data.list.total
                data.list = res.data.list.data
            })
        }

        const changeLabel = (label) => {
            data.query.label = label
            data.query.p = 1
            loadMtl()
        }

        return {onPick, ErrImage, data, loadMtl, changeLabel, image_path}
    }

}
</script>

<style lang="less" scoped>
.header {
  height: 40px;
  width: 96%;
  background-color: @dark-layer-color;
  box-sizing: border-box;
  margin: 10px auto 0;
  padding: 5px 0;

  span {
    color: #ffffff;
    font-size: 14px;
  }
}

.footer {
  height: 40px;
  width: 100%;
  line-height: 40px;
  background-color: @base-bg-color;
  display: flex;
  justify-content: center;

  li {
    color: #ffffff !important;
  }

  span {
    color: #ffffff !important;
  }
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
  background-color: @dark-layer-color;
  box-sizing: border-box;

  .preview {
    position: relative;
    width: 100%;
    height: 100%;

    .image {
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      display: flex;
      align-items: center;
      background-color: white;
      background-image: linear-gradient(90deg, rgba(50, 0, 0, 0.1) 3%, rgba(0, 0, 0, 0) 3%), linear-gradient(360deg, rgba(50, 0, 0, 0.1) 3%, rgba(0, 0, 0, 0) 3%);
    }

    .label {
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
  }


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
