<template lang="">
    <div class="weather-card">
        <div class="showBlock">
            <p class="address"><i class="el-icon-location-information"></i>{{address}}</p>
            <p class="temperature">{{temperature}}℃<span class="weather">{{weather}} <span>
                <img class="mainWeather" :src="getIcon"></span></span></p>
            <div class="other">
                <p class="wind"><i class="el-icon-wind-power"></i>
                    风向:<span>{{winddirection}}</span>&nbsp;&nbsp;&nbsp;<span>风力:{{windpower}}级</span></p>
                <p class="humidity"><i class="el-icon-odometer"></i> 湿度:{{humidity}}</p>
            </div>
        </div>
    </div>
</template>
<script>
import mapConfig from '@/utils/mapConfig'


export default {
    name: 'WeatherCard',
    data() {
        return {
            adcode: '',
            address: '',
            ipAddress: '',
            ipAdCode: '',
            weather: '',
            temperature: '',
            winddirection: '',
            windpower: '',
            humidity: '',
            icon: true
        }
    },
    watch: {
        adcode() {        //当adcode发生变化时，重新请求该地天气
            this.$axios.get('https://restapi.amap.com/v3/weather/weatherInfo?parameters', {
                params: {
                    key: mapConfig.WebAPIKey,        //需要操作
                    city: this.adcode,
                    extensions: 'base'
                }
            }).then(
                response => {
                    let lives = response.data.lives[0]
                    console.log(lives)
                    this.weather = lives.weather
                    this.temperature = lives.temperature
                    this.winddirection = lives.winddirection
                    this.windpower = lives.windpower
                    this.humidity = lives.humidity
                    this.address = lives.city
                    localStorage.setItem('adcode', this.adcode)    //将存储目前查询的天气
                },
                error => {
                    this.$notify.info({
                        title: '未知错误',
                        message: error.message
                    });
                }
            )
        },

    },
    computed: {
        // eslint-disable-next-line vue/return-in-computed-property
        getIcon() {
            // eslint-disable-next-line vue/no-side-effects-in-computed-properties
            if (this.weather == '晴') {
                return 'https://picture-tjl.oss-cn-hangzhou.aliyuncs.com/WuHan_Flower/weather/%E6%99%B4%E5%A4%A9.png'
            } else if (this.weather == '多云') {
                return 'https://picture-tjl.oss-cn-hangzhou.aliyuncs.com/WuHan_Flower/weather/%E5%A4%9A%E4%BA%91.png'
            } else if (this.weather == '阴') {
                return 'https://picture-tjl.oss-cn-hangzhou.aliyuncs.com/WuHan_Flower/weather/%E9%98%B4%E5%A4%A9.png'
            } else if (this.weather.indexOf('雨')) {
                return 'https://picture-tjl.oss-cn-hangzhou.aliyuncs.com/WuHan_Flower/weather/%E5%B0%8F%E9%9B%A8.png'
            } else if (this.weather.indexOf('雪')) {
                return 'https://picture-tjl.oss-cn-hangzhou.aliyuncs.com/WuHan_Flower/weather/%E5%B0%8F%E9%9B%AA.png'
            }
            else{
                return 'https://picture-tjl.oss-cn-hangzhou.aliyuncs.com/WuHan_Flower/weather/%E6%97%A0%E6%95%B0%E6%8D%AE.png'
            }
        }
    },
    methods: {
        useIp() {
            this.adcode = this.ipAdCode
        },
        getIp() {
            this.$axios.get('https://restapi.amap.com/v3/ip?parameters', {
                params: {
                    key: mapConfig.WebAPIKey        //需要操作
                }
            }).then(
                response => {
                    this.ipAddress = `${response.data.province}${response.data.city}`
                    this.ipAdCode = response.data.adcode
                    console.log(this.ipAdCode)
                    console.log(this.ipAddress)
                    this.adcode = response.data.adcode
                }
            )
        }
    },
    mounted() {
        this.getIp()
        this.useIp()
    },
}
</script>

<style scoped>
.weather-card {
    position: absolute;
    left: 20px;
    top: 20px;
    z-index: 170;
    background-color:white;
    width: 300px;
    height: 125px;
    color: #000;
    border-radius: 10px;
    box-shadow: 0 20px 25px -5px rgba(0, 0, 0, 0.1),
        0 10px 10px -5px rgba(0, 0, 0, 0.04);
    font-family: 'Roboto', sans-serif;
}

.showBlock {
    margin-top: 10px;
}

.temperature {
    font-size: 30px;
    font-weight: bold;
    text-transform: uppercase;
    margin-left: 5px ;
    color: rgba(0, 0, 0, 0.7);
}

.weather {
    margin-left: 15px;
    font-size: 15px;
}

.address {
    font-size: 14px;
    margin-top: 10px;
    font-weight: bold;
    color: rgba(0, 0, 0, 0.5);
}

.other {
    margin-top: 0px;
}

.other p {
    font-size: 13px;
    text-transform: uppercase;
    color: rgba(0, 0, 0, 0.7);
}
.mainWeather {
    float: right;
    margin-top: 5px;
    margin-right: 10px;
    width: 60px;
}

.showBlock {
    margin-left: 10px;
    margin-top: 0;
}

.el-divider--horizontal {
    margin: 5px 0;
    background: 0 0;
    border-top: 1px solid #e8eaec;
    margin-top: 5px;
}
</style>