<template>
<div>

<div class="four space">
    <div class="content">
        <div class="left">left 4444</div>
        <div class="right">right 4444</div>
    </div>
</div>
<div class="three space">
    <div class="content">
        <div class="left">left 3333</div>
        <div class="right">right 3333</div>
    </div>
</div>
<div class="two space">
    <div class="content">
        <div class="left">left 2222</div>
        <div class="right">right 2222</div>
    </div>
</div>

<div class="one space">
    <div class="content">
        <div class="left">left 11111</div>
        <div class="right">right 11111</div>
    </div>
</div>

<div  class="content">
    <div id="left">左边自适应</div>
    <div id="right">右边定宽</div>
</div>
</div>
</template>
<style lang="less" scoped>
#left {
    float: left;
    width: 300px;
    background-color: blue;
}
#right {
    overflow: auto;
    background-color: red;
}

.Site-content{
display:flex
.left{
    background: #304156;
    width: 220px;
    flex-shrink: 0;
}
.right{
    width: calc(100vw - 220px);
}
}

.space{
    margin-top: 20px;
    overflow: hidden;
}
.content{
    width: 100%;
    height: 400px;
}
.one{
    .content{
        display: flex;
    }
    .left{
        background:green;
        width:100px;
    }
    .right{
        flex:1;
        background:grey;
    }
}

.two{
    .content{
    }
    .left{
        background:green;
        width:100px;
        float:left;
        height: 100%;
    }
    .right{
        background:grey;
        width: calc(100% - 100px);
        height: 100%;
        float: left;
    }
}

.three{
  
    .content{
       position: relative;
    }
    .left{
        background:green;
        width:100px;
        float: left;
        height: 100%;
    }
    .right{
        background:grey;
        width: calc(100% - 100px);
        height: 100%;
        position: absolute;
        left:100px;   
    }
}

.four{
    height:100%;
    .header{
        height:60px;
        background:red;
    }
    .content{
        height:calc(100% - 60px);
        position: relative;
    }
    .left{
        background:green;
        width:100px;
        margin-left: -100%;
        height: 100%;
    }
    .right{
        background:grey;
        
          
    }
}

</style>
