import _VeTransform from "./VeTransform.vue"

const VeTransform = Object.assign(_VeTransform, {
    install: function (app) {
        app.component("VeTransform", _VeTransform);
    }
})

export default VeTransform
