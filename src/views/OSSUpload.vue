<template>
    <div class="upload-file">
        <el-upload class="Upload" ref="fileUpload" drag action="" :http-request="fnUploadRequest"
            :on-success="handleSuccess" :on-error="handleError" :before-upload="handleUpload" multiple>
            <i class="el-icon-upload"></i>
            <p class="el-upload__text">将文件拖到此处，或<em>点击上传</em></p>
        </el-upload>
    </div>
</template>
  
<script>
import { uploadOSS } from '@/utils/oss';
import { deleteOSS } from '@/utils/oss';

export default {
    name: "Ali_Oss",
    data() {
        return {
            file: [],
            fileList: []
        };
    },
    methods: {
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
            // console.log(res);
            if (res) {
                this.$emit('fileData', res)
                this.$message.success("上传成功！");
            }
        },
        handleError(err) {
            this.$message.error('上传失败！');
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
        // 删除
        removeFileListIdx(list, item, index) {
            deleteOSS('WuHan_Flower/' + item.name).then(res => {
                list.splice(index, 1);
                this.$message({
                    message: "删除成功",
                    type: "success",
                });
            })

        },

    }

};
</script>
<style scoped>
.upload-file {
    position: relative;
    height: 180px;
    width: 360px;
    top: 300px;
    left: 300px;
}

.el-upload__text {
    position: relative;
    /*bottom: 70px;*/
    color: #606266;
    font-size: 14px;
    text-align: center
}

.el-upload__text em {
    color: #409EFF;
    font-style: normal
}
</style>
  