<template>
  <div class="user">
    <div class="">
        session次数：{{num}}
        getters次数：{{this.$store.state.main.number}}
        登录人： {{ user.name }}
        登录id: {{ user.uid }}
    </div>
  </div>
</template>

<script>
import store from '../store'
export default {
  name: 'login',
  data () {
    return {
      num: 0,
      user: {
        uid: this.$store.state.main.user.user_id,
        name: this.$store.state.main ? this.$store.state.main.user.user_name :'请登录'
      }
    }
  },
  mounted () {
    // 通用模块的初始化流程：埋点、上报、用户操作
    // this.autoLogin()
    this.store();
  },
  methods: {
    store(){
      const store = JSON.parse(sessionStorage.getItem("store"))
      // console.log(store)
      this.num = store ? store.main.number : 'none'
    },
    autoLogin () {
      // 自动登录
      this.$ajax.post('/api/users/login')
        .then(res => {
          if (res.code === 200) {
            this.user = res.data
            // 获取登录态
            store.dispatch('main/updateUser', this.user)
            console.log('user', this.user)
          }
        })
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.user {
    display: flex;
    justify-content: center;
    align-items: center;
}
</style>
