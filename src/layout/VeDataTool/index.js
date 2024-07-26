import _VeDataTool from "./VeDataTool.vue";


const VeDataTool = Object.assign(_VeDataTool, {
    install: function (app) {
        app.component("VeDataTool", _VeDataTool);
    }
})

export default VeDataTool
