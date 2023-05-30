<template>
    <div>
        <header>
            <Header :routelist="routelist"></Header>
        </header>
        <div class="body">
            <div id="contact-form" class="contact-form">
                <h1 class="contact-form_title"><i class="el-icon-edit"></i>向我们推荐赏花点！</h1>
                <div class="separator"></div>
                <div class="form">
                    <input style="background-color: white;" v-model='point.name' placeholder="赏花点名称" type="text"
                        autocomplete="off">
                    <input style="background-color: white;" v-model='point.description' placeholder="地址" type="text"
                        autocomplete="off">
                    <div>
                        <input style="background-color: white;" v-model="point.longitude" placeholder="经度" type="number"
                            autocomplete="off">
                        <input style="background-color: white;" v-model="point.latitude" placeholder="纬度" type="number"
                            autocomplete="off">
                    </div>
                    <input style="background-color: white;" v-model="point.ticket" placeholder="门票价格" type="text"
                        autocomplete="off">
                    <input style="background-color: white;" v-model="point.open_time" placeholder="开放时间" type="text"
                        autocomplete="off">
                    <input style="background-color: white;" v-model="point.traffic" placeholder="交通方式" type="text"
                        autocomplete="off">
                    <input style="background-color: white;" v-model="point.flower_class" placeholder="花卉种类" type="text"
                        autocomplete="off">
                    <p style="color: #5d655f; font-weight: 550; font-size: 17px;"><i class="el-icon-picture"></i> 添加赏花点图片：
                    </p>
                    <div class="upload">
                        <div class="upload-file">
                            <ImageUploader :avatar="avatar" :region="options_OSS.region"
                                :accessKeyId="options_OSS.accessKeyId" :accessKeySecret="options_OSS.accessKeySecret"
                                :bucket="options_OSS.bucket" @avatarUrl="getAvatarUrl" @deleteAvatar="deleteAvatar">
                            </ImageUploader>
                        </div>
                    </div>
                    <el-button class="button" @click="submit">提交</el-button>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import Header from '@/components/Header.vue';
import ImageUploader from '@/components/ImageUpload.vue'

export default {
    components: { Header, ImageUploader },
    data() {
        return {
            routelist: [
                { route: '/Home', name: '主页' },
                { route: '/Search', name: '搜索' },
                { route: '/Map', name: '地图' },
                { route: '/MapSearch', name: '周边搜索' },
                { route: '/Route', name: '路线展示' },
                { route: '/User', name: '个人中心' }
            ],
            point: {
                name: '',
                description: '',
                longitude: '',
                latitude: '',
                imgURL: '',
                traffic: '',
                open_time: '',
                ticket: '',
                flower_class: ''
            },
            avatar: '',
            options_OSS: {
                region: 'oss-cn-hangzhou',
                accessKeyId: 'LTAI5tFQrt6TNg6k2SoRtnmW',
                accessKeySecret: 'arpTCv67LVeoOy2CP8sZqF4DCOOBk6',
                bucket: 'picture-tjl'
            },
        }
    },
    methods: {
        getAvatarUrl(avatarUrl) {
            console.log("图片url:", avatarUrl);
            this.point.imgURL = avatarUrl;
        },
        deleteAvatar() {
        },
        submit() {
            this.$axios.post('http://127.0.0.1:8000/add_map_point', this.point
            ).then((res) => {
                if (res.data.code == '0000') {
                    this.$message({
                        message: '地图点添加成功！',
                        type: 'success'
                    });
                    this.point = {
                        name: '',
                        description: '',
                        longitude: '',
                        latitude: '',
                        imgURL: '',
                        traffic: '',
                        open_time: '',
                        ticket: '',
                        flower_class: ''
                    }
                }
                else if (res.data.code == '0001') {
                    this.$message.error('参数错误，地图点添加失败！');
                }
            }).catch(err => {
                console.log(err)
                this.$message.error('地图点添加失败！');
            })
        },
    }
}
</script>

<style scoped>
@import "open-props/open-props.min.css" layer(open-props);
@import "open-props/normalize.min.css" layer(open-props);

.body {
    background: white;
    font-family: 'Roboto', sans-serif;
    height: 101vh;
}

.contact-form {
    font-family: 16px;
    margin: 0 auto;
    max-width: 600px;
    width: 100%;
}

.contact-form .separator {
    border-bottom: solid 1px #ccc;
    margin-bottom: 15px;
}

.contact-form .form {
    display: flex;
    flex-direction: column;
    font-size: 16px;
}

.contact-form_title {
    color: #333;
    text-align: left;
    font-size: 28px;
    margin-bottom: 10px;
}

.contact-form input[type="number"] {
    width: 49%;
}

.contact-form input[type="number"]:last-of-type {
    width: 49%;
    margin-left: 2%;
}

.contact-form input,
.contact-form textarea {
    border: solid 2px #A9A9A9;
    font-family: 'Roboto', sans-serif;
    padding: 10px 7px;
    margin-bottom: 15px;
    outline: none;
}

.contact-form textarea {
    resize: none;
}

.contact-form .button {
    background: #ed556a;
    border: solid 1px #ed556a;
    color: white;
    cursor: pointer;
    padding: 10px 50px;
    text-align: center;
    text-transform: uppercase;
}

.contact-form .button:hover {
    background: #ed556a;
    border: solid 1px #ed556a;
}

.contact-form input,
.contact-form .button {
    font-size: 15px;
    border-radius: 3px
}

.upload-file {
    position: relative;
    height: 180px;
    width: 360px;
    margin-bottom: 10px;
    margin-top: 5px;
}
</style>

