<template>
    <article class="route-info">
        <section class="Route-info__half upper">
            <h1>{{ activeLineObj.name }}</h1>
            <div class="route-info__content">
                <table>
                    <tbody>
                        <tr>
                            <h2>{{ activeLineObj.recommend }}</h2>
                        </tr>
                        <tr>
                            <el-divider></el-divider>
                        </tr>
                        <tr>
                            <td>赏花日期：</td>
                            <td>{{ activeLineObj.months }}</td>
                        </tr>
                        <tr>
                            <td>花朵种类：</td>
                            <td>{{ activeLineObj.flowerType }}</td>
                        </tr>
                        <tr>
                            <td>途径区域：</td>
                            <td>{{ activeLineObj.region }}</td>
                        </tr>
                        <tr>
                            <td>路线长度：</td>
                            <td>{{ activeLineObj.distance }}km</td>
                        </tr>
                        <tr>
                            <td>驾车时间：</td>
                            <td>{{ activeLineObj.time }}min</td>
                        </tr>
                        <tr>
                            <el-divider></el-divider>
                        </tr>
                        <tr>
                            <div class="route-note">
                                <p>{{ activeLineObj.description }}</p>
                            </div>
                        </tr>
                    </tbody>
                </table>
            </div>
        </section>
        <section class="Route-info__half lower">
            <button>More info</button>
        </section>
    </article>
</template>

<script>
export default {
    name: "RouteCard",
    props: {
        activeLineObj: {
            type: Object,
            required: true
        },
    },
    mounted() {
        const receipt = document.querySelector('.route-info')
        const button = document.querySelector('button')
        const toggleReceipt = () => {
            receipt.classList.toggle('active')

            if (receipt.classList.contains('active')) {
                button.innerHTML = 'Less info'
            } else {
                button.innerHTML = 'More info'
            }
        }

        button.addEventListener('click', toggleReceipt)
    }
}
</script>

<style scoped>
.route-info {
    width: 250px;
    max-width: 100%;
    position: absolute;
    right: 20px;
    top: 20px;
    z-index: 170;
    box-shadow: 0 20px 25px -5px rgba(0, 0, 0, 0.1),
        0 10px 10px -5px rgba(0, 0, 0, 0.04);
}

.Route-info__half {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    width: 100%;
    position: relative;
    background: white;
    perspective: 1000px;
}

.Route-info__half::after {
    content: '';
    display: block;
    width: 100%;
    height: 300px;
    position: absolute;
    left: 0;
    backface-visibility: hidden;
    transition: all 0.8s ease 0.35s;
}

.active .Route-info__half::after {
    transition-delay: 0s;
}

.upper {
    padding: 20px;
    z-index: 10;
    border-radius: 10px 10px 0 0;
}

.upper::after {
    top: 100%;
    background: #f0f0f0;
    border-top: 1px dashed #dedede;
    transform: rotate3d(1, 0, 0, -90deg);
    transform-origin: top center;
}

.active .upper::after {
    background: white;
    transform: rotate3d(1, 0, 0, 0deg);
}

.lower {
    transition: transform 0.8s ease 0.35s;
    border-radius: 0 0 10px 10px;
}

.lower::after {
    bottom: 100%;
    background: #e6e6e6;
    transform: rotate3d(1, 0, 0, 90deg);
    transform-origin: bottom center;
}

.active .lower {
    border-top: none;
    transform: translateY(300px);
    transition-delay: 0s;
}

.active .lower::after {
    background: white;
    transform: rotate3d(1, 0, 0, 0deg);
}

h1 {
    color: rgba(0, 0, 0, 0.7);
    font-size: 18px;
}

h2 {
    color: rgba(0, 0, 0, 0.6);
    font-size: 16px;
}

p {
    margin: 0;
}

p.sm {
    font-size: 80%;
}

button {
    width: 100%;
    padding: 15px 20px;
    background: none;
    outline: none;
    border: none;
    border-top: 1px dashed #dedede;
    color: #888;
    font-size: 90%;
    font-weight: 600;
    cursor: pointer;
    transition: all ease 0.35s;
}

button:hover {
    color: #777;
}

.route-info__content {
    display: flex;
    flex-wrap: wrap;
    align-items: center;
    height: 300px;
    padding: 20px;
    position: absolute;
    top: 40px;
    left: 0;
    z-index: 20;
    pointer-events: none;
    opacity: 0;
    transform: translateY(-8px);
    transition: opacity ease 0.35s, transform ease 0.35s;
    transition-delay: 0s;
    margin-top: 10px;
}

.active .route-info__content {
    opacity: 1;
    transform: translateY(0);
    transition-delay: 0.8s;
}

table {
    width: 100%;
}

tr {
    display: flex;
    justify-content: space-between;
    margin: 5px 0;
}

td {
    font-size: 13px;
}

.el-divider--horizontal {
    margin: 5px 0;
    background: 0 0;
    border-top: 1px solid #e8eaec;
    margin-top: 0px;
}

.route-note {
    margin-top: 0px;
}

.route-note p {
    font-size: 13px;
}
</style>