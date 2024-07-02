import _VeUvs from "./VeUvs.vue"

const VeUvs = Object.assign(_VeUvs, {
    install: function (app) {
        app.component("VeUvs", _VeUvs);
    }
})

export default VeUvs
