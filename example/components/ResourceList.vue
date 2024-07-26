<template>
  <div class="resource">
    <div class="header">
      <slot class="header" name="header"></slot>
    </div>
    <div class="list">
      <slot name="list"></slot>
    </div>
    <div class="footer">
      <slot name="footer"></slot>
    </div>
  </div>
</template>

<style scoped>
.resource {
  display: flex;
  flex-direction: column;
  width: 100%;
  height: 100%;
}

.resource .list {
  flex: 1;
  overflow-x: hidden;
  overflow-y: scroll;
}

.resource .header {
  width: 100%;
}

.resource .footer {
  width: 100%;
}

/*定义滚动条高宽及背景 高宽分别对应横竖滚动条的尺寸*/
.list::-webkit-scrollbar {
  width: 7px;
  height: 7px;
  background-color: #2f2f2f;
}

/*定义滚动条轨道 内阴影+圆角*/
.list::-webkit-scrollbar-track {
  box-shadow: inset 0 0 6px rgba(0, 0, 0, 0.3);
  -webkit-box-shadow: inset 0 0 6px rgba(0, 0, 0, 0.3);
  border-radius: 10px;
  background-color: #2f2f2f;
}

/*定义滑块 内阴影+圆角*/
.list::-webkit-scrollbar-thumb {
  border-radius: 10px;
  box-shadow: inset 0 0 6px rgba(0, 0, 0, 0.1);
  -webkit-box-shadow: inset 0 0 6px rgba(0, 0, 0, 0.1);
  background-color: rgba(255, 255, 255, 0.8);
}

</style>
