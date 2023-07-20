<template>
  <el-form>
    <el-form-item label="用户名">
      <el-input v-model.trim="u_user.name" />
    </el-form-item>
    <el-form-item label="电子邮箱">
      <el-input v-model.trim="u_user.email" />
    </el-form-item>
    <el-form-item label="更改密码">
      <el-input v-model.trim="password" />
    </el-form-item>
    <el-form-item label="确认更改后的密码">
      <el-input v-model.trim="confirm_password" />
    </el-form-item>
    <el-form-item>
      <el-button type="primary" @click="submit">更新账户信息</el-button>
    </el-form-item>
  </el-form>
</template>

<script>
export default {
  name:'AccountView',
  data() {
    return {
      confirm_password: '',
      password: '',
      u_user: {
        name: '',
        email: '',
        password: '',
      }
    }
  },
  created(){
    this.$axios.get('http://127.0.0.1:8000/users/' + sessionStorage['UserID']).then((res) => {
            this.u_user.name = res.data.name;
            this.u_user.email = res.data.email;
            this.password = res.data.hashed_password;
        }).catch(err => {
            console.log(err);
            this.$message.error('数据载入失败，请检查网络！');
        })
  },
  methods: {
    submit() {
      if (this.email === '') {
        this.$message.error('邮箱不能为空！');
      }
      else if (this.name === '') {
        this.$message.error('用户名不能为空！');
      }
      else if (this.confirm_password != this.password) {
        this.$message.error('两次输入的密码应一致！');
      }
      else {
        this.u_user.password = this.password
        console.log(localStorage['UserID'])
        this.$axios.post('http://127.0.0.1:8000/update_user_info/' + sessionStorage['UserID'], this.u_user).then((res) => {
          if (res.data.code == '0000') {
            this.$message({
              message: '用户信息更新成功！',
              type: 'success'
            });
            this.$axios.get('http://127.0.0.1:8000/users/' + sessionStorage['UserID']).then((res) => {
              this.u_user.name = res.data.name;
              this.u_user.email = res.data.email;
              this.password = res.data.hashed_password;
            }).catch(err => {
              console.log(err);
              this.$message.error('数据载入失败，请检查网络！');
            })
          }
          else if (res.data.code == '0001') {
            this.$message.error('参数错误，用户信息更新失败！');
          }
        }).catch(err => {
          console.log(err);
          this.$message.error('用户信息更新失败！');
        })
      }
    }
  },
}
</script>
