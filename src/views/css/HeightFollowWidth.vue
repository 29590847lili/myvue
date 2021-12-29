<template>
    <div><h1>page5</h1>
        <h1>css 高度随着宽度变化 方式一</h1>
        <div class='container'>
            <div class='dummy'></div>
            <div class='content'>contens</div>
        </div>
        <h1>css 高度随着宽度变化 方式二</h1>
        <div id='container2'>
        <div class='attr'>
            <img src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAMgAAABkAQMAAAD5SO1IAAAAA1BMVEUAAACnej3aAAAAAXRSTlMAQObYZgAAABlJREFUSMftwYEAAAAAw6D7U19gCNUAACAcCigAAeZ4u9wAAAAASUVORK5CYII=" alt="">
        </div>
        </div>
        <h1>css 高度随着宽度变化 方式三</h1>
        <div id='container3'>
            <div class='attr'>
            </div>
        </div>
    </div>
</template>
<script>
export default {
    data(){
        return{
            name:''
        }
    },
    mounted(){
        
    },
    methods:{
        
    }
}
</script>
<style lang="less" scoped>
.container{
    width:100px;
    background-color: silver;
    position:relative;
    display: inline-block;
}

.dummy{
margin-top: 100%;
}
.content{
position:absolute;
left:0;
right:0;
top:0;
bottom: 0;
}
#container2 {
    width: 200px;
  }
  .attr {
    background-color: #008b57;
  }
  .attr img{
    width: 100%;
    height: auto;
  }
#container3{
  width: 100vmin;
  height: 100vmin;
    .attr {
    width: 50%;
    // height: 50%;
    height: calc(50%);
    background-color: orange;
    }
  }
</style>