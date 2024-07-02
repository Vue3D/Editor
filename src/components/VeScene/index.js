import _VeScene from "./VeScene.vue";

const VeScene = Object.assign(_VeScene, {
    install: function (app) {
        app.component("VeScene", _VeScene);
    }
})

export default VeScene
