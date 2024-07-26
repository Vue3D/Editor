import {computed, markRaw, onMounted, reactive} from 'vue'
import {defineStore} from 'pinia'
import {useDataStore} from "./data";
import {useMaterialStore} from "./material";
import {useSelectedStore} from "@/stores/selected";

export const useEditorStore = defineStore('editor', () => {
    const $data = useDataStore()
    const $material = useMaterialStore()
    const $selected = useSelectedStore()

    const transform = reactive({
        mode: "translate", // transform mode [translate, scale, rotation]
        space: "world", // transform space [world, local]
    })

    /**
     * 初始化
     * @param stage
     */
    const init = (stage) => {
        $data.init(stage)
    }

    /**
     * 添加材质
     * @param key
     */
    function addMtl(key) {

    }

    /**
     * 添加Cube
     */
    function addCube() {
        $data.add("V3dCube", "Cube", {position: {x: 1, y: 0, z: 0}})
    }

    /**
     * 添加球体
     */
    function addSphere() {
        $data.add("V3dSphere", "Sphere", {})
    }

    function addObject(name, path) {
        const attr = {
            path: path,
            size: 5,
        }
        return $data.add("V3dObjLoader", name, attr)
    }

    function addYyObject(name, hash, format) {
        const attr = {
            hash, format,
            size: 5,
        }
        return $data.add("YyObject", name, attr)
    }

    function remove() {
        const key = $selected.key
        $selected.$reset()
        return $data.remove(key)
    }

    /**
     * 保存
     */
    function save() {
        return JSON.stringify({
            version: 0.1,
            components: $data.components,
            materials: $data.materials,
            uvs: $data.uvs,
            hierarchy: $data.hierarchy
        })
    }

    /**
     * 加载
     */
    function load(obj) {
        $data.components = obj.components
        $data.materials = obj.materials
        $material.loadFromData()
        $data.uvs = obj.uvs
        $data.hierarchy = obj.hierarchy
    }

    /**
     * 渲染
     */
    function render() {
        $data.stage.render()
    }

    return {
        transform,
        init,
        save, load, addCube, addSphere, addObject, addYyObject, remove,
        render,
    }
})

