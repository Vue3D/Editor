import {createPinia} from "pinia";
import piniaPluginPersistedState from 'pinia-plugin-persistedstate'
import {useDataStore} from "./data";
import {useEditorStore} from "./editor";
import {useMaterialStore} from "./material";
import {useSelectedStore} from "./selected";

const store = createPinia()
store.use(piniaPluginPersistedState)

export {
    useDataStore,
    useEditorStore,
    useMaterialStore,
    useSelectedStore
}

export default store
