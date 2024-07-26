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

    /** 舞台数据 **/
    const stage = computed(() => ($data.stage))
    /** 数据对象 **/
    const objects = computed(() => ($data.objects))
    /** 材质对象 **/
    const materials = computed(() => ($data.materials))
    /** 编辑区域对象 **/
    const uvs = computed(() => ($data.uvs))
    /** 层级对象 **/
    const hierarchy = computed(() => ($data.hierarchy))

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
        $data.add("V3dCube", "Cube", {})
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
        stage.render()
    }

    onMounted(() => {
        addCube()
    })

    return {
        transform,
        stage, objects, uvs, materials, hierarchy,
        init,
        save, load, addCube, addSphere, addObject, addYyObject, remove,
        render,
    }
})

