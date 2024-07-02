import _VeUvsArea from "./VeUvsArea.vue"

const VeUvsArea = Object.assign(_VeUvsArea, {
    install: function (app) {
        app.component("VeUvsArea", _VeUvsArea);
    }
})

export default VeUvsArea
