<template>
    <div class="header">
        {{ this.$t("localization.header") }}
        <ShowUser/>
        <button @click="logout()">{{ this.$t("localization.exit") }}</button>
        <Multilingual/>
    </div>
        <!-- <article><img alt="Vue logo" src="../assets/logo.png"></article> -->
    
</template>

<script>
import ShowUser from './ShowUser.vue'
import {exit} from '@/api/user'
import  Multilingual  from '@/components/Multilingual'
export default{
    components:{
        ShowUser,
        Multilingual
    },
    methods:{
        logout(){
            exit().then((res)=>{
                if(res.status === 'success'){
                    localStorage.setItem("userRole", 'unload')
                    // 跳转到登录页的时候顺便刷新
                    window.location.href = window.location.origin + window.location.pathname
                    localStorage.removeItem("_token")
                    //this.$router.push({path: "/login"})
                }
            })
        }
        
    }
}
</script>

<style lang="less" scoped>
.header{

}
</style>