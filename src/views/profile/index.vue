<template>
  <div>

    <body>
      <header>
        <Header :routelist="routelist"></Header>
      </header>

      <div class="Profile">
        <div>
          <el-row :gutter="20">

            <el-col :span="6" :xs="24">
              <user-card :user="user" />
            </el-col>

            <el-col :span="18" :xs="24">
              <el-card>
                <el-tabs v-model="activeTab">
                  <el-tab-pane label="推荐的赏花点" name="activity">
                    <activity />
                  </el-tab-pane>
                  <el-tab-pane label="账户设置" name="account">
                    <account :user="user" />
                  </el-tab-pane>
                </el-tabs>
              </el-card>
            </el-col>
          </el-row>
        </div>
      </div>
    </body>
  </div>
</template>

<script>
//import { mapGetters } from 'vuex'
import UserCard from './components/UserCard'
import Activity from './components/Activity'
import Account from './components/Account'
import Header from '@/components/Header'

export default {
  name: 'ProFile',
  components: { UserCard, Activity, Account, Header },
  data() {
    return {
      routelist: [
        { route: '/Home', name: '主页' },
        { route: '/Search', name: '搜索' },
        { route: '/Map', name: '地图' },
        { route: '/Feedback', name: '上传测试' },
        { route: '/Route', name: '路线展示' },
      ],
      user: {},
      activeTab: 'activity',
      name: 'welt',
      avatar: 'https://picture-tjl.oss-cn-hangzhou.aliyuncs.com/WuHan_Flower/avatars/v2-29c615a14037b9898e3641f5523e8ca2_720w.webp',
    }
  },
  computed: {
  },
  created() {
    this.getUser()
  },
  methods: {
    getUser() {
      this.user = {
        name: this.name,
        email: 'admin@test.com',
        avatar: this.avatar
      }
    }
  }
}
</script>

<style scoped>
.Profile {
  margin-left: 20px;
  margin-right: 20px;
  margin-top: 20px;
  padding: 10px;
}

body {
  background-color: white;
}
</style>
