import {defineStore} from "pinia";
import {nanoid} from "nanoid";

/**
 * 对象默认参数
 */
const defaultObjectAttr = {
    position: {x: 0, y: 0, z: 0},
    angle: {x: 0, y: 0, z: 0},
    scale: {x: 1, y: 1, z: 1},
}

/**
 * 数据
 */
export const useDataStore = defineStore('data', {
    state: () => ({
        stage: null,
        /** 三维对象 **/
        objects: {},
        /** 三维对象可编辑区域 **/
        uvs: {},
        /** 三维材质 **/
        materials: {
            default: {name: "默认材质", readonly: true, color: "rgb(255,255,255)", transparent: false, opacity: 1},
        },
        /** 场景层级 **/
        hierarchy: [],
    }),
    actions: {
        /**
         * 初始化舞台数据
         * @param stage
         */
        init(stage) {
            this.stage = stage
        },
        /**
         * 添加一个三维对象
         * @param type 对象类型，填写组件名称，如：V3dCube
         * @param name 对象名称
         * @param attr 对象组件上的属性
         * @param parentKey 父级节点
         * @return string 三维对象在编辑器场景中的key
         */
        add(type, name, attr, parentKey = null) {
            const key = nanoid(8)
            this.objects[key] = {
                key: key,
                component: type,
                name: name,
                attr: Object.assign({name: key}, defaultObjectAttr, attr), // object3d 中的name需要对应数据节点中的key
            }
            this.mount(key, parentKey)
            return key
        },
        /**
         * 删除一个三维对象
         * @param key
         * @return boolean
         */
        remove(key) {
            if (this.objects.hasOwnProperty(key)) {
                delete this.objects[key]
                this.unmount(key)
                return true
            }
            return false
        },
        /**
         * 挂载对象到层级面板（场景）
         * @param key
         * @param parentKey
         */
        mount(key, parentKey = null) {
            const object = this.objects[key]
            const node = {
                key: key,
                name: object.name,
                parent: null,
                children: [],
                material: 'default',
            }

            if (parentKey === null) {
                this.hierarchy.push(node)
                return
            }

            node.parent = this.findNode(parentKey)

            if (node.parent) {
                node.parent.children.push(node)
            } else {
                this.hierarchy.push(node)
            }
        },
        /**
         * 从 Hierarchy 中移除
         * @param key
         */
        unmount(key) {
            const node = this.findNode(key)
            const index = this.hierarchy.indexOf(node)
            if (node.parent) {
                node.parent.splice(index, 1)
            } else {
                this.hierarchy.splice(index, 1)
            }
        },
        /**
         * 查找 Hierarchy 中的节点
         * @param key
         * @returns {null}
         */
        findNode(key) {
            let node = null
            const traverse = (list) => {
                for (let i = 0; i < list.length; i++) {
                    if (list[i].key === key) {
                        node = list[i]
                        break
                    } else {
                        traverse(list[i].children)
                    }
                }
            }
            traverse(this.hierarchy)
            return node
        },
        /**
         * 获取对象数据
         * @param key
         * @returns {*|null}
         */
        getObject(key) {
            if (this.objects.hasOwnProperty(key)) return this.objects[key]
            else return null
        }
    },
    // persist: {
    //     paths: []
    // }
})
