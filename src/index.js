import vue3d from "vue3d"
import ArcoVue from '@arco-design/web-vue';
import IconFont from "@unjuanable/iconfont";
import store from "./stores"

import '@arco-design/web-vue/dist/arco.css'
import "vue3-colorpicker/style.css";

export default {
    install(app) {
        app.use(store)
        app.use(vue3d)
        app.use(ArcoVue)
        app.use(IconFont, "//at.alicdn.com/t/c/font_481557_butcon6ut36.css")
    }
}
