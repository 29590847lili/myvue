<template>
    <div>
        <h1>实现BFC的条件,下列方式会创建块格式化上下文：</h1>
        <ul>
        <li>根元素（html）</li>
        <li>浮动元素（元素的 float 不是 none）</li>
        <li>绝对定位元素（元素的 position 为 absolute 或 fixed）</li>
        <li>行内块元素（元素的 display 为 inline-block）</li>
        <li>表格单元格（元素的 display 为 table-cell，HTML表格单元格默认为该值）</li>
        <li>表格标题（元素的 display 为 table-caption，HTML表格标题默认为该值）</li>
        <li>弹性元素（display 为 flex 或 inline-flex 元素的直接子元素）</li>
        <li>网格元素（display 为 grid 或 inline-grid 元素的直接子元素）</li>
        <li>匿名表格单元格元素（元素的 display 为 table、table-row、 table-row-group、table-header-group、table-footer-group（分别是HTML table、row、tbody、thead、tfoot 的默认属性）或 inline-table）</li>
        <li>overflow 计算值(Computed)不为 visible 的块元素</li>
        <li>display 值为 flow-root 的元素</li>
        <li>contain 值为 layout、content 或 paint 的元素</li>
        <li>多列容器（元素的 column-count 或 column-width (en-US) 不为 auto，包括 column-count 为 1）</li>
        <li>column-span 为 all 的元素始终会创建一个新的BFC，即使该元素没有包裹在一个多列容器中（标准变更，Chrome bug）。</li>
        <li>块格式化上下文包含创建它的元素内部的所有内容</li>
        </ul>
        <h1>BFC的特点</h1>
         1. BFC在Web页面上是一个独立的容器，容器内外互不影响<br/>
        2. 和标准文档流一样，BFC内的元素垂直方向的边距会发生重叠<br/>
        3. BFC不会与浮动元素的盒子重叠<br/>
        4. 计算BFC高度时即使子元素浮动也参与计算<br/>
        <p>应用</p>
        子元素浮动后，父元素失去了高度，为了清除浮动带来的这个影响可以将父元素设置成一个BFC；overflow: auto;<br/>
        由于块级元素垂直方向的边距会发生重叠，为了解决边距重叠的问题，让第两个div之间的间距变成35px，可以在div外面创建一个BFC<br/>
        解决元素浮动后发生重叠的问题,左边的元素浮动之后，由于脱离标准文档流叠在了右边的元素上，为了让两个元素不重叠，我们把右边的元素设置成BFC：

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
ul{
//    height: 200px; 
   width:100%;
}
li{
    background: cornflowerblue;
    display: block;
    line-height: 20px;
    margin: 2px 0;
}
</style>