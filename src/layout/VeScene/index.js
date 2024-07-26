import _VeScene from "./VeScene.vue";
import _VeComponent from "./component/VeComponent.vue";

const VeScene = Object.assign(_VeScene, {
    install: function (app) {
        app.component("VeScene", _VeScene);
        app.component("VeComponent", _VeComponent);
    }
})

export default VeScene
