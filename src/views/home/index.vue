<template>
    <div>
        <h1>home</h1>
        <h1>name:{{name}}</h1>
        <div class="partent">
            <div class="children">绝对定位absolute相对于不是static的第一个父元素</div>
        </div>
        <div class="flex-box">
            <div class="item">111</div>
            <div class="item">flex三栏布局，两边固定</div>
            <div class="item">333</div>
        </div>
        <div class="flex-box">
            <div class="item">111</div>
            <div class="item">flex二栏布局，左边固定</div>
        </div>
        <div id="container">
            <div id="middle">middle 圣杯布局</div>
            <div id="left">left</div>
            <div id="right">right</div>
        </div>
        <div id="content">
            <div class="middle">
                <div class="center">middle 双飞翼布局</div>
            </div>
            <div class="left">left</div>
            <div class="right">right</div>
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
        this.name = sessionStorage.getItem("name")
    },
    methods:{

    },
}
</script>
<style lang="less" scoped>
.partent{
    position: static;
    width:500px;
    height:500px;
    background: darkred;
    .children{
        position:absolute;
        width:100px;
        height:100px;
        background:aquamarine;
        top: 10px;
        right: 10px;
    }
}
 .flex-box{
    display: flex;
    height:200px;
    width:100%;
    background:red;
    }

    .item:nth-child(2){
    flex:1;
    background:green;
}
#container { 
    padding: 0 100px;
    margin-bottom: 100px;
    overflow: hidden;
}
#middle {
    background-color: lightpink;
    height: 300px;
    width: 100%;
    float: left;
}

#left {
    background-color: red;
    height: 300px;
    width: 100px;
    float: left;
    margin-left: -100%;
    position: relative;
    left: -100px;
}

#right {
    background-color: aqua;
    height: 300px;
    width: 100px;
    float: left;
    margin-left: -100px;
    position: relative;
    right: -100px;
}
#content{
    overflow:hidden;
    >div{
        float:left;
    }
    .left,.right{
        width:100px;
        background:green;  
    }
    .middle{
        width:100%;
        background:red;
        .center{
            margin: 0 100px;
        }
        
    }
    .left{
        margin-left:-100%;
    }
    .right{
        margin-left:-100px;
    }
}

</style>