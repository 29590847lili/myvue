<template>
    <div><h1>page1</h1>
        <h1>设置sessionStorge</h1>
        <h1>sessionStorge:{{name}}</h1>
        <h1 @click="handleNewPage('page2')">打开新页面page2</h1>
        <h1 @click="handleNewPage('page3')">打开新页面page3</h1>
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
        sessionStorage.setItem("name","lili")
        this.name = sessionStorage.getItem("name")
    },
    methods:{
        handleNewPage(page){ // 可以打开新窗口
            let routeUrl = this.$router.resolve({
            path: "/views/"+page,
            query: {id:96}});
            window.open(routeUrl.href, '_blank');
        }
    }
}
</script>
<style lang="less" scoped>

</style>