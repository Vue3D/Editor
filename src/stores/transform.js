import {defineStore} from "pinia";
import {computed, onMounted, reactive} from "vue";

export const useTransformStore = defineStore('transform', () => {
    const status = reactive({
        mode: "translate", // transform mode [translate, scale, rotation]
        space: "world", // transform space [world, local]
    })

    const mode = computed({
        get() {
            return status.mode
        },
        set(val) {
            // $vue3d.emit(ev.selected.tfMode.handler, val)
        }
    })

    const space = computed({
        get: () => {
            return status.space
        },
        set: (val) => {
            // $vue3d.emit(ev.selected.tfSpace.handler)
        }
    })

    /**
     * 夹角转欧拉角
     * @param angle
     * @returns {number}
     */
    const angle2euler = (angle) => {
        const euler = (angle % 360) / 180;
        return euler * Math.PI
    }
    /**
     * 欧拉角转夹角
     * @param euler
     * @returns {number}
     */
    const euler2angle = (euler) => {
        return euler * 180 / Math.PI;
    }

    onMounted(() => {
        // 绑定快捷键
        window.addEventListener('keydown', function (event) {
            switch (event.key) {
                case 'q':
                    // $vue3d.emit(ev.selected.tfMode.handler, "translate", scene.id)
                    break;

                case 'w':
                    // $vue3d.emit(ev.selected.tfMode.handler, "rotate", scene.id)
                    break;

                case "e":
                    // $vue3d.emit(ev.selected.tfMode.handler, "scale", scene.id)
                    break;

                case "t":
                    // $vue3d.emit(ev.selected.tfSpace.handler, null, scene.id)
                    break;
            }
        })
    })

    return {mode, space, angle2euler, euler2angle}
})
