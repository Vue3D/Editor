import _VeHierarchy from "./VeHierarchy.vue"

const VeHierarchy = Object.assign(_VeHierarchy, {
    install: function (app) {
        app.component("VeHierarchy", _VeHierarchy);
    }
})

export default VeHierarchy
