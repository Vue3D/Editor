import _VeComponent from "./VeComponent.vue";


const VeComponent = Object.assign(_VeComponent, {
    install: function (app) {
        app.component("VeComponent", _VeComponent);
    }
})

export default VeComponent
