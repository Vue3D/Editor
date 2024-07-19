import {computed, markRaw, onMounted, reactive} from 'vue'
import {defineStore} from 'pinia'
import {useDataStore} from "./data";
import {useMaterialStore} from "./material";

export const useEditorStore = defineStore('editor', () => {
    const data = useDataStore()
    const material = useMaterialStore()

    /** 场景对象 **/
    const stage = markRaw({
        id: "editor",
        value: null
    })

    /** 选中的目标 **/
    const selected = reactive({
        key: null, // hierarchy's key && vue3d object3d's name
        node: null, // hierarchy node
        object3d: null, // Vue3d Data
    })

    /** 选中的目标三维对象 **/
    const selectedObject3d = computed(() => {
        return selected.object3d
    })

    /** 选中的三维对象的数据参数 **/
    const selectedData = computed(() => {
        return data.objects[selected.key]
    })

    /**
     * uvs贴图坐标
     */
    const uvs = computed(() => {
        return data.uvs
    })

    /** Hierarchy Array **/
    const hierarchy = computed(() => {
        return data.hierarchy
    })

    /**
     * 释放选中状态
     */
    function onFreeSelected() {
        selected.key = null
        selected.node = null
        selected.object3d = null
        // $vue3d.emit(ev.selected.attach.handler, null)
    }

    /**
     * 选中三维对象
     * @param object3d
     */
    function onSelectedByObject(object3d) {
        if (object3d) {
            selected.key = object3d.name
            selected.object3d = object3d
            selected.node = getNodeByName(object3d.name)
        } else {
            onFreeSelected()
        }
    }

    /**
     * 通过名称选中三维对象
     * @param name
     */
    function onSelectedByName(name) {
        const object3d = reactive(scene.stage.getObjectByName(name))
        onSelectedByObject(object3d)
        // $vue3d.emit(ev.selected.attach.handler, object3d)
    }

    /**
     * 通过Object3d中的name查找对象在Hierarchy中的节点位置
     * @param name Object3d中的name就是hierarchy中的object
     */
    function getNodeByName(name) {
        let node = null
        const getNode = (list) => {
            for (let i = 0; i < list.length; i++) {
                if (list[i].key === name) {
                    node = list[i]
                    break
                } else {
                    getNode(list[i].children)
                }
            }
        }
        getNode(data.hierarchy)
        return node
    }

    /**
     * 获取对象数据
     * @param key
     * @returns {*|null}
     */
    function getObject(key) {
        if (data.objects.hasOwnProperty(key)) return data.objects[key]
        else return null
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
        data.add("V3dCube", "Cube", {})
    }

    /**
     * 添加球体
     */
    function addSphere() {
        data.add("V3dSphere", "Sphere", {})
    }

    function addObject(name, path) {
        const attr = {
            path: path,
            size: 5,
        }
        return data.add("V3dObjLoader", name, attr)
    }

    function addYyObject(name, hash, format) {
        const attr = {
            hash, format,
            size: 5,
        }
        return data.add("YyObject", name, attr)
    }

    function remove() {
        const key = selected.key
        onFreeSelected()
        return data.remove(key)
    }

    /**
     * 保存
     */
    function save() {
        return JSON.stringify({
            version: 0.1,
            objects: data.objects,
            materials: data.materials,
            uvs: data.uvs,
            hierarchy: data.hierarchy
        })
    }

    /**
     * 加载
     */
    function load(obj) {
        data.objects = obj.objects
        data.materials = obj.materials
        material.loadFromData()
        data.uvs = obj.uvs
        data.hierarchy = obj.hierarchy
    }

    /**
     * 渲染
     */
    function render() {
        // $vue3d.emit(ev.renderer.render.handler)
    }

    /** 场景预设组件 **/
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
                {component: "V3dCameraTransformControl", attr: {target: selectedObject3d},},
                {component: "V3dDirectionalLight", attr: {intensity: 0.8, position: {x: 0, y: 100, z: 100}}}
            ]
        },
        {component: "V3dAmbientLight", attr: {intensity: 0.2}},
        {component: "V3dCube"},
    ])


    return {
        stage, preset, hierarchy, uvs,
        selected, selectedObject3d, selectedData, getObject,
        onSelectedByObject, onSelectedByName, onFreeSelected,
        save, load, addCube, addSphere, addObject, addYyObject, remove,
        render,
    }
})

