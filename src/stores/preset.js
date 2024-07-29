import {defineStore} from "pinia";
import {computed, reactive} from "vue";
import {useSelectedStore} from "./selected";
import {useEditorStore} from "./editor";

export const usePresetStore = defineStore('preset', () => {
    const $editor = useEditorStore()
    const $selected = useSelectedStore()

    /** 选中的目标三维对象 **/
    const sObject3d = computed(() => ($selected.object3d))
    /** 选中的三维对象的数据参数 **/
    const sComponent = computed(() => ($selected.component))
    /** transform mode **/
    const tfMode = computed(() => ($editor.transform.mode))
    /** transform 参考坐标系 **/
    const tfSpace = computed(() => ($editor.transform.space))

    /**
     * 场景预设组件
     */
    const data = reactive([
        {component: "V3dGridHelper", attr: {size: 100, divisions: 100}},
        // {component: "V3dBoxHelper", attr: {target: selectedObject3d}},
        {
            component: "V3dPerspectiveCamera",
            attr: {
                main: true,
                position: {x: 0, y: 0, z: 10},
            },
            children: [
                {component: "V3dCameraOrbitControl"},
                {
                    component: "V3dCameraTransformControl",
                    attr: {target: sObject3d, mode: tfMode, space: tfSpace},
                    event: {change: $selected.onChange}
                },
                {component: "V3dCameraRaycaster", event: {pick: onPick}},
                {component: "V3dDirectionalLight", attr: {intensity: 0.8, position: {x: 0, y: 100, z: 100}}}
            ]
        },
        {component: "V3dAmbientLight", attr: {intensity: 0.2}},
    ])

    function onObjectChange(e) {
    }

    function onPick(e) {
        $selected.setByObject(e)
    }

    return {data}
})
