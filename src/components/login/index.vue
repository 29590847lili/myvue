<template>
    <div class="login">
        <el-form ref="form" :model="form" label-width="80px">
            <el-form-item label="用户名">
                <el-input v-model="form.name"></el-input>
            </el-form-item>
            <el-form-item label="密码">
                <el-input v-model="form.password" show-password></el-input>
            </el-form-item>
            <el-form-item>
                <el-button type="primary" @click="onLogin">登录</el-button>
            </el-form-item>
        </el-form>
    </div>
</template>
<script>
import { login } from '@/api/user'
export default {
    data(){
        return{
            form:{
                name:'',
                password:'',
            }
        }
    },
    methods: {
        onLogin(){
            login(this.form).then((res)=>{
                if(res.status === "success"){
                    this.$store.getters["main/getLoginTime"]
                    this.$store.dispatch("main/updateUser",res.data);
                    localStorage.setItem('_token',res.data._token)
                    this.$router.push({
                        name: 'Main',
                    })
                }
            })   
        }
    }
}
</script>
<style lang="less" scoped>
.login{
    display: flex;
    align-content: center;
    justify-content: center;
}
</style>