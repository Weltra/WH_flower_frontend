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
              <UserCard :user="user" v-if="tableShow" />
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
                  <el-tab-pane label="头像设置" name="change_avatar">
                    <div class="avatar-change">
                      <div class="avatar-change-section">
                        <div class="avatar-change-section-header"><span><i class="el-icon-picture-outline"></i>Change
                            Avatar</span></div>
                        <div class="avatar-change-section-body">
                          <div class="text-muted">
                            点击下方虚线框，挑选你喜欢的头像：
                          </div>
                          <div style="text-align: center; margin-top: 10px;">
                            <AvatarUploader :avatar="avatar" :region="options_OSS.region"
                              :accessKeyId="options_OSS.accessKeyId" :accessKeySecret="options_OSS.accessKeySecret"
                              :bucket="options_OSS.bucket" @avatarUrl="getAvatarUrl" @deleteAvatar="deleteAvatar">
                            </AvatarUploader>
                          </div>
                        </div>

                        <div class="avatar-change-section">
                          <div class="avatar-change-section-header"><span><i
                                class="el-icon-copy-document"></i>Clipboard</span></div>
                          <div class="avatar-change-section-body">
                            <div class="text-muted">
                              点击下方按钮，复制上传头像的链接到剪切板：
                            </div>
                            <el-input v-model="inputData" placeholder="Please input"
                              style="width:400px;max-width:100%;" />
                            <el-button style="margin-left: 5px;" type="primary" icon="el-icon-document"
                              @click="handleCopy(inputData, $event)">
                              点击复制到剪切板
                            </el-button>
                          </div>
                        </div>
                      </div>
                    </div>
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
import UserCard from './components/UserCard'
import Activity from './components/Activity'
import Account from './components/Account'
import Header from '@/components/Header'
import AvatarUploader from '@/components/AvatarUpload.vue'
import clip from '@/utils/clipboard'
import oss from '@/utils/ossConfig'


export default {
  name: 'ProFile',
  components: { UserCard, Activity, Account, Header, AvatarUploader },
  data() {
    return {
      routelist: [
        { route: '/Home', name: '主页' },
        { route: '/Search', name: '搜索' },
        { route: '/Map', name: '地图' },
        { route: '/Feedback', name: '我的发现' },
        { route: '/Route', name: '路线展示' },
      ],
      user: {},
      activeTab: 'activity',
      options_OSS: oss.options_OSS,
      avatar: '',
      tableShow: true,
      inputData: '',
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
        name: localStorage['name'],
        avatar: localStorage['avatar'],
        email: localStorage['email'],
        id: localStorage['UserID']
      }
    },
    getAvatarUrl(avatarUrl) {
      this.tableShow = false
      console.log("头像url:", avatarUrl);
      localStorage.setItem('avatar', avatarUrl);
      this.inputData = avatarUrl
      this.getUser()
      this.$nextTick(function () {
        this.tableShow = true
      })

    },
    deleteAvatar() {
    },
    handleCopy(text, event) {
      clip(text, event)
    },
    clipboardSuccess() {
      this.$message({
        message: '复制成功！',
        type: 'success',
        duration: 1500
      })
    }
  }
}
</script>

<style  lang="scss" scoped>
.Profile {
  margin-left: 20px;
  margin-right: 20px;
  margin-top: 20px;
  padding: 10px;
}

.text-muted {
  font-size: 14px;
  color: #777;
  margin-top: 10px;
  margin-bottom: 10px;
}

body {
  background-color: white;
}

.avatar-change {
  color: #606266;
  font-size: 16px;

  span {
    padding-left: 4px;
  }

  .avatar-change-section {
    padding: 15px 0;

    .avatar-change-section-header {
      border-bottom: 1px solid #dfe6ec;
      padding-bottom: 10px;
      margin-bottom: 10px;
      font-weight: bold;
    }
  }
}
</style>
