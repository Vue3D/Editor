import _VeInspector from "./VeInspector.vue";

const VeInspector = Object.assign(_VeInspector, {
    install: function (app) {
        app.component("VeInspector", _VeInspector);
    }
})

export default VeInspector
