<template>
<div>
    <h1>page2</h1>
    <h1>sessionStorge:{{name}}</h1>
    <h1>重置之后的:{{name}}</h1>
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
    }
}
</script>