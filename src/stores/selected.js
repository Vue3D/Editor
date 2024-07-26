import {defineStore, mapState} from "pinia";
import {useDataStore} from "@/stores/data";
import {reactive} from "vue";

export const useSelectedStore = defineStore('selected', {
    state: () => ({
        key: null, // 选中对象在层级面板中的Key
        node: null, // 选中对象在层级面板中的节点对象
        object3d: null, // 选中的三维对象
    }),
    getters: {
        component(state) {
            const $data = useDataStore()
            return $data.getComponent(this.key)
        },
    },
    computed: {
        ...mapState(useDataStore, ['stage', 'hierarchy']),
    },
    actions: {
        getObject() {
            const $data = useDataStore()
            return $data.components[this.key]
        },
        /**
         * 通过三维对象设置选中对象
         * @param object3d
         */
        setByObject(object3d) {
            if (object3d) {
                const $data = useDataStore()
                this.key = object3d.name
                this.object3d = object3d
                this.node = $data.findNode(object3d.name)
            } else {
                this.$reset()
            }
        },
        /**
         * 通过名称设置选中对象
         * @param name
         */
        setByName(name) {
            const object3d = reactive(this.stage.getObjectByName(name))
            this.setByObject(object3d)
        },

    }
})
