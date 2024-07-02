import _VeTransformMode from "./VeTransformMode.vue"

const VeTransformMode = Object.assign(_VeTransformMode, {
    install: function (app) {
        app.component("VeTransformMode", _VeTransformMode);
    }
})

export default VeTransformMode
