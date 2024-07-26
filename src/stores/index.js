import {createPinia} from "pinia";
import piniaPluginPersistedState from 'pinia-plugin-persistedstate'
import {useDataStore} from "./data";
import {useEditorStore} from "./editor";
import {useEventbusStore} from "./eventbus";
import {useMaterialStore} from "./material";
import {usePresetStore} from "./preset";
import {useSelectedStore} from "./selected";

const store = createPinia()
store.use(piniaPluginPersistedState)

export {
    useDataStore,
    useEditorStore,
    useEventbusStore,
    useMaterialStore,
    usePresetStore,
    useSelectedStore
}

export default store
