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
    /** 选中的目标三维对象 **/
    const selectedObject3d = computed(() => ($selected.object3d))
    /** 选中的三维对象的数据参数 **/
    const selectedData = computed(() => ($data.objects[$selected.key]))
    /** transform mode **/
    const tfMode = computed(() => (transform.mode))
    /** transform 参考坐标系 **/
    const tfSpace = computed(() => (transform.space))

    /**
     * 初始化
     * @param stage
     */
    const init = (stage) => {
        $data.init(stage)
    }

    /**
     * 获取对象数据
     * @param key
     * @returns {*|null}
     */
    function getObject(key) {
        return $data.getObject(key)
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
            objects: $data.objects,
            materials: $data.materials,
            uvs: $data.uvs,
            hierarchy: $data.hierarchy
        })
    }

    /**
     * 加载
     */
    function load(obj) {
        $data.objects = obj.objects
        $data.materials = obj.materials
        $material.loadFromData()
        $data.uvs = obj.uvs
        $data.hierarchy = obj.hierarchy
    }

    function onObjectChange(e) {
    }

    function onPick(e) {
        $selected.setByObject(e)
    }

    /**
     * 渲染
     */
    function render() {
        // $vue3d.emit(ev.renderer.render.handler)
    }

    /**
     * 场景预设组件
     */
    const preset = reactive([
        {component: "V3dGridHelper", attr: {size: 100, divisions: 100}},
        // {component: "V3dBoxHelper", attr: {target: selectedObject3d}},
        {
            component: "V3dPerspectiveCamera",
            attr: {
                main: true,
                position: {x: 0, y: 0, z: 20},
            },
            children: [
                {component: "V3dCameraOrbitControl"},
                {
                    component: "V3dCameraTransformControl",
                    attr: {target: selectedObject3d, mode: tfMode, space: tfSpace},
                    event: {change: onObjectChange}
                },
                {component: "V3dCameraRaycaster", event: {pick: onPick}},
                {component: "V3dDirectionalLight", attr: {intensity: 0.8, position: {x: 0, y: 100, z: 100}}}
            ]
        },
        {component: "V3dAmbientLight", attr: {intensity: 0.2}},
    ])

    onMounted(() => {
        addCube()
    })

    return {
        transform,
        stage, objects, uvs, materials, hierarchy,
        selectedObject3d, selectedData,
        preset,
        init,
        getObject,
        save, load, addCube, addSphere, addObject, addYyObject, remove,
        render,
    }
})

