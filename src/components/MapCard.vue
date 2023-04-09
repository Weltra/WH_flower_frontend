<template>
    <div class="mapcard" v-if="showcard">
        <div class="title-c">
            <h2>{{ selectedPoint.title }}</h2>
        </div>
        <input id="toggle" type="checkbox" checked>
        <label for="toggle">展开/隐藏图片</label>
        <div id="expand">
            <img :src="selectedPoint.imgUrl" alt="" class="thumbnail">
        </div>
        <section>
            <p><b>📍地点<el-divider direction="vertical"></el-divider></b>{{ selectedPoint.subtitle }}</p>
            <p><b>🕓开放时间<el-divider direction="vertical"></el-divider></b>{{ selectedPoint.opentime }}</p>
            <p><b>🎫门票价格<el-divider direction="vertical"></el-divider></b>{{ selectedPoint.ticket }}</p>
            <p><b>🌷花卉品种<el-divider direction="vertical"></el-divider></b>{{ selectedPoint.flowertype }}</p>
            <p><b>🚗交通<el-divider direction="vertical"></el-divider></b>{{ selectedPoint.flowertype }}</p>
        </section>
    </div>
</template>

<script>
export default {
    name: "MapCard",
    props: {
        selectedPoint: {
            type: Object,
            required: true
        },
        showcard:{
            type: Boolean,
            required: true
        }
    }
}
</script>

<style scoped>
.mapcard {
    position: absolute;
    right: 20px;
    top: 20px;
    background-color: white;
    border: 1px solid #ccc;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);
    z-index: 170;
    width: 350px;
    margin: 20px auto;
    padding: 10px 0;
    border-radius: 5px;
}

.thumbnail {
    width: 100%;
    height: 100%;
    object-fit: cover;
}

.title-c {
    text-align: center;
}

.mapcard h2 {
    font-size: 20px;
    margin: 0 auto;
}

.mapcard h3 {
    margin: 10px 0;
    font-size: 16px;
}

.mapcard p {
    font-size: 13px;
    margin: 10px 0;
}

.mapcard input {
    display: none;
    visibility: hidden;
}

.mapcard label {
    display: block;
    font-size: 14px;
    padding: 0.5em;
    text-align: center;
    border-bottom: 1px solid #CCC;
    color: #666;
}

.mapcard label:hover {
    color: #000;
}

.mapcard label::before {
    font-family: Consolas, monaco, monospace;
    font-weight: bold;
    font-size: 14px;
    content: '+';
    vertical-align: text-top;
    display: inline-block;
    width: 20px;
    height: 20px;
    margin-right: 3px;
    background: radial-gradient(ellipse at center, #CCC 50%, transparent 50%);
}

.mapcard #expand {
    height: 0px;
    overflow: hidden;
    transition: height 0.5s;
}

.mapcard section {
    padding: 0 20px;
}

.mapcard #toggle:checked~#expand {
    height: 300px;
}

.mapcard #toggle:checked~label::before {
    content: "-";
}
</style>