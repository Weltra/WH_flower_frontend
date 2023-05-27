<template>
    <div>
        <Header :routelist="routelist"></Header>
        <div class="body">
            <div id="contact-form" class="contact-form">
                <h1 class="contact-form_title">Contact Form</h1>
                <div class="separator"></div>
                <div v-if="isSending" class="loading">Sendig...</div>
                <form class="form" @submit="onSubmit">
                    <input style="background-color: white;" required name="name" v-model='contact.name' placeholder="Name"
                        type="text" autocomplete="off">
                    <input style="background-color: white;" required name="email" v-model="contact.email"
                        placeholder="E-mail" type="email" autocomplete="off">
                    <textarea style="background-color: white; height: 200px;" name="message" v-model="contact.message"
                        rows="4" placeholder="Message"></textarea>
                    <p style="color: #5d655f; font-weight: 550; font-size: 17px;"><i class="el-icon-picture"></i> 添加赏花点图片：
                    </p>
                    <div class="upload">
                        <div class="upload-file">
                            <el-upload class="Upload" ref="fileUpload" list-type="picture-card" action=""
                                :http-request="fnUploadRequest" :on-success="handleSuccess" :on-error="handleError"
                                :before-upload="handleUpload" on-remove="" multiple>
                                <i class="el-icon-plus"></i>
                                <template #tip>
                                    <div style="font-size: 13px;color: #919191; margin-top: 5px;">
                                        单次限制上传一张图片
                                    </div>
                                </template>
                            </el-upload>
                        </div>
                    </div>
                    <button class="button">Send</button>
                </form>
            </div>
        </div>
    </div>
</template>

<script>
import { uploadOSS } from '@/utils/oss';
import Header from '@/components/Header.vue';

export default {
    components: { Header },
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
            contact: {
                name: '',
                email: '',
                message: '',
            },
            isSending: false,
            file: [],
            fileList: []
        }
    },

    methods: {
        clearForm() {
            for (let field in this.contact) {
                this.contact[field] = ''
            }
        },

        //Handler for submit
        onSubmit(evt) {
            evt.preventDefault();

            this.isSending = true;

            setTimeout(() => {
                // Build for data
                let form = new FormData();
                for (let field in this.contact) {
                    form.append(field, this.contact[field]);
                }

                // Send form to server
                this.$http.post('/app.php', form).then((response) => {
                    console.log(response);
                    this.clearForm();
                    this.isSending = false;
                }).catch((e) => {
                    console.log(e)
                });

            }, 1000);
        },

        handleUpload(file, fileList) {
            console.log(file, fileList);
            var testmsg = file.name.substring(file.name.lastIndexOf('.') + 1)
            const extension = testmsg === 'xlsx' || testmsg === 'xls' || testmsg === 'docx' || testmsg === 'doc'
                || testmsg === 'pdf' || testmsg === 'zip' || testmsg === 'rar' || testmsg === 'ppt' || testmsg === 'txt' || testmsg === 'jpeg' || testmsg === 'jpg' || testmsg === 'png'

            const isLimit100M = file.size / 1024 / 1024 < 100
            var bool = false;
            if (extension && isLimit100M) {
                bool = true;
            } else {
                bool = false;
            }
            if (!extension) {
                this.$message.error('请选择文件类型！');
                return bool;
            }
            if (!isLimit100M) {
                this.$message.error('上传失败，不能超过100M！');
                return bool;
            }
            return bool;
        },
        handleSuccess(res) {
            if (res) {
                this.$emit('fileData', res)
                this.$message.success("上传成功！");
            }
        },
        handleError(err) {
            if (err) {
                this.$message.error('上传失败！');
            }
        },
        // 上传图片
        async fnUploadRequest(options) {
            try {
                // console.log(options);
                let file = options.file; // 拿到 file
                let res = await uploadOSS('WuHan_Flower/' + file.name, file)
                console.log(res);
                // 返回数据
                this.$emit("fileData", res);
                this.$message.success("上传成功！");
                this.fileList.push({
                    name: res.fileName,
                    url: res.fileUrl
                });
                console.log(this.fileList)
            } catch (e) {
                this.$message.error('上传失败！');
            }
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
    height: 92vh;
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

.contact-form input[type="email"],
.contact-form input[type="text"],
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

.contact-form input[type="email"],
.contact-form input[type="text"],
.contact-form textarea,
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

