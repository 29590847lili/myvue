<template>

<div class="four">
    <div class="header">header</div>
    <div class="content">
        <div class="left">left</div>
        <div class="right">right</div>
    </div>
</div>
<!-- <div class="three">
    <div class="header">header</div>
    <div class="content">
        <div class="left">left</div>
        <div class="right">right</div>
    </div>
</div> -->
<!-- <div class="two">
    <div class="header">header</div>
    <div class="content">
        <div class="left">left</div>
        <div class="right">right</div>
    </div>
</div> -->

<!-- <div class="one">
    <div class="header">header</div>
    <div class="content">
        <div class="left">left</div>
        <div class="right">right</div>
    </div>
</div> -->

</template>
<style lang="less" scoped>
.one{
    height:100%;
    .header{
        height:60px;
        background:red;
    }
    .content{
        display: flex;
        height:calc(100% - 60px);
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
    height:100%;
    .header{
        height:60px;
        background:red;
    }
    .content{
        height:calc(100% - 60px);
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
