<template>
    <div class="thums-up" @click="thumbsUp">
        <div class="heart" ref="heart">
            <svg :style="heartStyle" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" width="140px"
                height="50px">
                <path
                    d="M533.504 268.288q33.792-41.984 71.68-75.776 32.768-27.648 74.24-50.176t86.528-19.456q63.488 5.12 105.984 30.208t67.584 63.488 34.304 87.04 6.144 99.84-17.92 97.792-36.864 87.04-48.64 74.752-53.248 61.952q-40.96 41.984-85.504 78.336t-84.992 62.464-73.728 41.472-51.712 15.36q-20.48 1.024-52.224-14.336t-69.632-41.472-79.872-61.952-82.944-75.776q-26.624-25.6-57.344-59.392t-57.856-74.24-46.592-87.552-21.504-100.352 11.264-99.84 39.936-83.456 65.536-61.952 88.064-35.328q24.576-5.12 49.152-1.536t48.128 12.288 45.056 22.016 40.96 27.648q45.056 33.792 86.016 80.896z"
                    p-id="2432"></path>
            </svg>
        </div>
        <div class="thums-up-text"><span><i class="el-icon-thumb"></i>{{ thumbsUpText }}</span></div>
    </div>
</template>

<script>
import mojs from "@mojs/core";
import { ref, onMounted, computed } from "vue";
export default {
    props: {
        times: {
            type: Number,
            required: true
        },
    },
    setup(props) {

        const heart = ref(null);

        // 是否已点赞
        let hearted = ref(false);
        const heartBounce = ref(1);
        const heartStyle = computed(() => {
            return {
                fill: `${hearted.value ? '#E05B5B' : ''}`,
                stroke: `${hearted.value ? '#E05B5B' : ''}`,
                transform: `scale3d(${heartBounce.value},${heartBounce.value},1)`,
            };
        });

        const thumbsUpText = computed(() => {
            return hearted.value ? `已有` + props.times + `人打卡此处!` : `点击打卡！`;
        });

        let burst, aperture, bounce;
        /**
         * burst 扩散
         * aperture 红色光圈（红晕）
         * bounce 心跳
         */
        onMounted(() => {
            burst = new mojs.Burst({
                // 爆炸范围
                radius: { 0: 50 },
                // 动画挂载父元素，默认改在到body上
                parent: heart.value,
                // 动画延时函数
                easing: mojs.easing.bezier(0.1, 1, 0.3, 1),
                // 动画延时时间
                duration: 1500,
                // 动画等待时间
                delay: 300,
                // 扩散的粒子配置
                children: {
                    duration: 750,
                    // 随机数范围爆炸
                    radius: { 0: "rand(5,25)" },
                    shape: ["circle", "rect", "polygon"],
                    // 粒子可选色
                    fill: [
                        "#1abc9c",
                        "#2ecc71",
                        "#00cec9",
                        "#3498db",
                        "#9b59b6",
                        "#fdcb6e",
                        "#f1c40f",
                        "#e67e22",
                        "#e74c3c",
                        "#e84393",
                    ],
                    degreeShift: "rand(-90, 90)",
                    delay: "stagger(0, 40)",
                },
                // 透明度
                opacity: 0.6,
                // 生成粒子数量
                count: 10,
                onStart() {
                    hearted.value = true;
                },
            });
            aperture = new mojs.Transit({
                parent: heart.value,
                duration: 750,
                type: "circle",
                radius: { 0: 20 },
                fill: "transparent",
                stroke: "#E05B5B",
                strokeWidth: { 20: 0 },
                opacity: 0.6,
                isRunless: true,
                easing: mojs.easing.bezier(0, 1, 0.5, 1),
            });
            bounce = new mojs.Tween({
                duration: 1200,
                onUpdate: (progress) => {
                    if (progress > 0.3) {
                        // elastic 弹性的
                        heartBounce.value = mojs.easing.elastic.out(1.43 * progress - 0.43);
                    } else {
                        heartBounce.value = 0;
                    }
                },
            });
        });

        function thumbsUp() {
            if (!hearted.value) {
                new mojs.Timeline().add(burst, aperture, bounce).play();
            } else {
                hearted.value = false;
            }
        }

        return {
            heart,
            thumbsUpText,
            hearted,
            heartBounce,
            heartStyle,

            burst,
            aperture,
            bounce,

            thumbsUp,
        };
    },
}
</script>

<style scoped>
.thums-up {
    display: flex;
    align-items: center;
    justify-content: center;
    cursor: pointer;
    height: 40px;
    flex-wrap: wrap;
    margin-bottom: 40px;
}

.thums-up .heart {
    display: inline-flex;
    position: relative;
    height: 40px;
}

.thums-up .heart svg {
    stroke: #9a9daa;
    stroke-width: 60px;
    transition: fill 0.3s, stroke 0.3s;
    fill: transparent;
}

.thums-up:hover .heart svg {
    stroke: #e05b5b;
}

.thums-up-text {
    margin-left: 1px;
    font-size: 20px;
    user-select: none;
    margin-top: 3px;
}
</style>