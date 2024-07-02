import request from "../utils/request.js";

request.defaults.baseURL = GDefault.api["yunyan-midend"]

export function material_list(data = {}) {
    return request.post("/material/getListF", data)
}

export function label_list(usage = "模型") {
    return request.post("/Label/materialLabel", {
        usage
    })
}

export function object_list(params = {}) {
    params.c = 1
    return request.post("/objects/getListF", params)
}

export function uv_data(id) {
    return request.post("/objects/getObjectTextureById", {id: id})
}

export function save(params) {
    return request.post("/DesignScene/addScene", params)
}

export function load(data) {
    return request.post("/DesignScene/getSceneByUid", data)
}

export function update(params) {
    return request.post("/DesignScene/updateScene", params)
}

export function image_path(thumb) {
    return GDefault.api["yunyan-widget"] + "/storage/resourceImg/720/" + thumb
}

export function object_path(hash, format = ".obj") {
    return GDefault.api["yunyan-widget"] + "/storage/sourceObject/" + hash + '.obj'
}
