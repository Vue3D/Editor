import {defineStore} from "pinia";
import {onMounted} from "vue";
import {useEditorStore} from "@/stores/editor";

export const useEventbusStore = defineStore('eventbus', () => {
    const $editor = useEditorStore()
    onMounted(() => {
        window.addEventListener('keydown', function (event) {
            switch (event.key) {
                case 'q':
                    $editor.transform.mode = 'translate';
                    break;

                case 'w':
                    $editor.transform.mode = 'rotate';
                    break;

                case "e":
                    $editor.transform.mode = 'scale';
                    break;

                case "t":
                    $editor.transform.space = $editor.transform.space === 'world' ? "local" : "world";
                    break;
            }
        })
    })
})
