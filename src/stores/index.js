import {createPinia} from "pinia";
import piniaPluginPersistedState from 'pinia-plugin-persistedstate'
import {useDataStore} from "./data";
import {useEditorStore} from "./editor";
import {useMaterialStore} from "./material";
import {useTransformStore} from "./transform";

const store = createPinia()
store.use(piniaPluginPersistedState)

export {
    useDataStore,
    useEditorStore,
    useMaterialStore,
    useTransformStore
}

export default store
