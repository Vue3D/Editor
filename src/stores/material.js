import {defineStore} from "pinia";
import {computed, markRaw, onMounted, reactive} from "vue";
import {useDataStore} from "./data";
import {defaultMaterial as ceramic} from "vue3d/use/useMaterial";
import {Color, TextureLoader} from "vue3d"
import {nanoid} from "nanoid";

/**
 * 材质默认参数
 */
const defaultMaterial = {
    color: "rgb(255,255,255)",
    transparent: false,
    opacity: 1,
    map: null,
    normalMap: null,
}

export const useMaterialStore = defineStore('material', () => {
    const data = useDataStore()
    const store = reactive({})

    /**
     * 获取材质数据列表
     */
    const list = computed(() => {
        return data.materials
    })

    /**
     * 材质表格列表数据
     */
    const table = computed(() => {
        let arr = []
        for (let item in data.materials) {
            const obj = {key: item, name: data.materials[item].name, data: data.materials[item]}
            arr.push(obj)
        }
        return arr
    })
    /**
     *  新建一个材质
     */
    const create = (name, key = null, option = {}) => {
        if (!key) {
            key = nanoid(8)
        }
        // 创建材质数据
        data.materials[key] = Object.assign({}, defaultMaterial, option)
        data.materials[key].name = name
        init(key)
    }
    /**
     * 将数据初始化为材质对象
     * @param key
     */
    const init = (key) => {
        const loader = new TextureLoader();

        store[key] = markRaw(ceramic())
        store[key].color = new Color(data.materials[key].color)
        store[key].transparent = data.materials[key].transparent
        store[key].opacity = data.materials[key].opacity
        loader.load(data.materials[key].map, (texture) => {
            store[key].map = texture
            store[key].map.needsUpdate = true
        })
    }
    /**
     * 获取材质对象
     * @param key
     * @returns {*|null}
     */
    const get = (key) => {
        if (store.hasOwnProperty(key)) return store[key]
        return store['default']
    }
    /**
     * 获取材质数据
     * @param key
     * @returns {*|null}
     */
    const getPure = (key) => {
        if (data.materials.hasOwnProperty(key)) return data.materials[key]
        return data.materials['default']
    }
    /**
     * 移除材质对象
     * @return boolean
     */
    const remove = (key) => {
        if (data.materials.hasOwnProperty(key) && !data.materials[key].readonly) {
            delete data.materials[key]
            return true
        }
        return false
    }
    /**
     * 材质数据初始化
     */
    const loadFromData = () => {
        for (let item in data.materials) {
            init(item)
        }
    }

    onMounted(() => {
        loadFromData()
    })

    return {
        list, table,
        create, init, get, getPure, remove, loadFromData
    }
})
