import _VeMaterial from "./VeMaterial.vue";

const VeMaterial = Object.assign(_VeMaterial, {
    install: function (app) {
        app.component("VeMaterial", _VeMaterial);
    }
})

export default VeMaterial
