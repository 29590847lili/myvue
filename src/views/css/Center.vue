<!--  -->
<template>
  <div class='content'>
      <p>水平垂直居中</p>
      <div class="parent">
          <div class="child">父级相对，子集绝对，设置子集<br/>
            top: 0; left: 0; bottom: 0; right: 0;<br/>
            width: 50%;
            height: 50%;
            margin: auto;<br/>
            overflow:auto;<br/>
            https://blog.csdn.net/freshlover/article/details/11579669#
        </div>
      </div>
      <div class="songtao">
			<div class="center"></div>
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
    position: relative;
    background:darkcyan;
    width: 400px;
    height: 400px;
    .child{
        position: absolute;
        background: darkgoldenrod;
        top: 0; left: 0; bottom: 0; right: 0;
        width: 50%;
        height: 50%;
        margin: auto;
        min-width: 200px;
        max-width: 400px;
        overflow: auto;
    }
}
.songtao{
    width: 500px;
    height: 300px;
    background-color: dodgerblue;
    /* 左右居中 */
    margin: auto;
    
}
.center{
    width: 100px;
    height: 100px;
    background-color: red;
}
</style>