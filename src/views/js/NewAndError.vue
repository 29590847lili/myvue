<!--  -->
<template>
  <div class="content">
      <p class="title">New 操作都干了什么？一个函数如何实现new 的时候报错？普通调用不报错</p>
      <p>比如：function test() {console.log('执行了')}</p>
      <p>在test() 正确执行 在var ceshi = new test 时候报错</p>
      <h1 class="title">new的实现</h1>
      <div class="answer">
          1.创建了一个新对象<br/>
          2.新对象的原型constructor指向构造函数 prototype 对象<br/>
          3.将 this 指向新建对象，执行这个构造函数，并返回结果<br/>
          4.判断这个结果是否对象如果是对象 返回这个结果 否则返回构造函数<br/>
      </div>
      
      <textarea style="width:450px;height:110px;">
       function myNew(){
           const constru = Array.prototype.shift.call(arguments);
           const obj = Object.create(constru.prototype)
           const result = constru.apply(obj,arguments)
           return result instanceof Object ? result : obj
       }
      </textarea>
      <div>
          // 测试
            function aa (){
                this.a = 'a'
                this.b = 'b'
                
            }

            var bb =  myNew(aa)
            bb.c = 'c'
            console.log(aa)
            console.log(bb)
      </div>
      <hr/>
      <h1 class="title">一个函数如何实现new 的时候报错？普通调用不报错</h1>
      可以把普通函数改为箭头函数
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
<style lang='scss'>
.title{
    font-weight: bold;
    font-size: 14px;
}
.content{
    padding: 20px;
    line-height: 20px;
}
p{
    line-height: 20px;
    margin-bottom: 5px;
}
.answer{
    background: darkseagreen;
    display: inline;
}
</style>
