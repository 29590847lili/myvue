<!--  -->
<template>
  <div class='content'>
      <p>九宫格</p>
      <div class="parent">
          <div class="box">
            <div class="line">
                <div></div>
                <div></div>
                <div></div>
            </div>
            <div class="line">
                <div></div>
                <div></div>
                <div></div>
            </div>
            <div class="line">
                <div></div>
                <div></div>
                <div></div>
            </div>
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
    }
  };
</script>
<style lang='less' scoped>
.content{padding: 20px;line-height: 20px;}
.parent{
    border:10px solid red;
    width:300px;
    height:300px;
    .box{
        width:100%;
        height:100%;
        display: flex;
        flex-direction: column; 
        .line{
            width: 100%;
            height: 100%; 
            background: skyblue;
            display: flex;
            div{
                border:1px solid salmon;
                background:sienna;
                flex-grow: 1;
            }
        }
    }
}
</style>