<!--  -->
<template>
  <div>
      <div>两个div 分上下层叠加在一起，如何实现下层的点击事件？用css实现</div>
      <p>为了方便，将上层div设置为透明，这样能看到下层的按钮，</p>
      <p>将上层的div设置层pointer-events:none 就可以实现穿透，点击下层的按钮会执行；</p>
      <p>因为元素不再是鼠标事件的目标，鼠标不再监听当前层而去监听下面的层中的元素。</p>
      <p>所以顶部按钮此时也监听不到了，想要监听顶层按钮需要给这个按钮设置pointer-events:auto</p>
      <p>效果和没有定义pointer-events属性相同，鼠标不会穿透当前层。</p>
      <div style="position:relative">
        <div class="box_bottom">
            <Button type="primary" @click="clickbottom">底部按钮</Button>
        </div>
        <div class="box_top">
            <Button type="primary" @click="clicktop" class="top_button" >顶部按钮</Button>
        </div>
      </div>
  </div>
</template>
<script >
export default {
    data() {
      return{
      }
    },
    props:[],
    components: {},
    created() {
    },
    mounted() {
    },
    methods:{
        clickbottom(){
            console.log('底部')
        },
        clicktop(){
            console.log('顶部')
        }
    }
  };
</script>
<style lang='less' scoped>
.box_bottom{
    width: 200px;
    height: 200px;
    background: cornflowerblue;
}
.box_top{
    position: absolute;
    top:0;
    opacity: 0.5;
    width: 200px;
    height: 200px;
    background: darkcyan;
    pointer-events: none;
    .top_button{
        pointer-events: auto;
        float:right;
    }
}
p{
    line-height: 20px;
    background: darkgray;
}
</style>