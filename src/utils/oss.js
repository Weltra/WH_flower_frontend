const OSS = require('ali-oss')
const OSSConfig = {
    //uploadHost: '', // OSS上传地址
    ossParams: {
        // yourregion填写Bucket所在地域。以华东1（杭州）为例，Region填写为oss-cn-hangzhou。
        region: 'oss-cn-hangzhou',
        // 阿里云账号AccessKey拥有所有API的访问权限，风险很高。强烈建议您创建并使用RAM用户进行API访问或日常运维，请登录RAM控制台创建RAM用户。
        accessKeyId: 'LTAI5tFQrt6TNg6k2SoRtnmW',
        accessKeySecret: 'arpTCv67LVeoOy2CP8sZqF4DCOOBk6',
        // 填写Bucket名称（阿里云上的Bucket，也就是上传地址）。
        bucket: 'picture-tjl'
    }
}
// 上传
function uploadOSS(fileName, file) {
    return new Promise(async (resolve, reject) => {
        // const fileName = `${random_string(6)}_${file.name}`
        const client = new OSS({
            region: OSSConfig.ossParams.region,
            accessKeyId: OSSConfig.ossParams.accessKeyId,
            accessKeySecret: OSSConfig.ossParams.accessKeySecret,
            bucket: OSSConfig.ossParams.bucket
        })
        const res = await client.multipartUpload(fileName, file)
        // resolve(res)
        // 或者返回如下：
        resolve({
            fileUrl: `${OSSConfig.uploadHost}/${fileName}`,
            fileName: file.name
        })
    })
}
// 删除
function deleteOSS(fileName) {
    return new Promise(async (resolve, reject) => {
        // const fileName = `${random_string(6)}_${file.name}`
        const client = new OSS({
            region: OSSConfig.ossParams.region,
            accessKeyId: OSSConfig.ossParams.accessKeyId,
            accessKeySecret: OSSConfig.ossParams.accessKeySecret,
            bucket: OSSConfig.ossParams.bucket
        })
        client.useBucket("oss");
        const res = await client.delete(fileName)
        resolve(res)
    })
}
export { uploadOSS, deleteOSS }
