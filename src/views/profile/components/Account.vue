<template>
  <el-form>
    <el-form-item label="用户名">
      <el-input v-model.trim="user.name" />
    </el-form-item>
    <el-form-item label="电子邮箱">
      <el-input v-model.trim="user.email" />
    </el-form-item>
    <el-form-item label="更改密码">
      <el-input v-model.trim="user.password" />
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
  data(){
    return {
      confirm_password:''
    }
  },
  props: {
    user: {
      type: Object,
      default: () => {
        return {
          name: '',
          email: '',
          password:'',
        }
      }
    }
  },
  methods: {
    submit() {
      this.$message({
        message: 'User information has been updated successfully',
        type: 'success',
        duration: 5 * 1000
      })
    }
  }
}
</script>
