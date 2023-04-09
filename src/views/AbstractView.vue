<template>
  <div class="Abstract">
    <header>
      <div class="header-banner">
        <h1 style="font-size: 40px;">东湖樱园</h1>
      </div>
      <div class="clear"></div>
      <nav>
        <div class="site-title" style="font-size: 18px;">东湖樱园</div>
        <ul>
          <li><router-link to="/Home"><a>主页</a></router-link></li>
          <li><router-link to="/Map"><a>搜索</a></router-link></li>
          <li><router-link to="/Feedback"><a>地图</a></router-link></li>
          <li><router-link to="/Route"><a>游览路线</a></router-link></li>
          <li><router-link to="/User"><a>用户中心</a></router-link></li>
        </ul>
      </nav>
    </header>

    <div class="body">
      <section class="content">
        <article ref="target">
        </article>

        <aside>
          <heart :times="100"></heart>
          <el-divider></el-divider>
          <img src="https://picture-tjl.oss-cn-hangzhou.aliyuncs.com/WuHan_Flower/meihua/%E6%A2%85%E8%8A%B1.jpeg">
          <img
            src="https://picture-tjl.oss-cn-hangzhou.aliyuncs.com/WuHan_Flower/meihua/%E7%AB%B9%E5%8F%B6%E6%B5%B7%E6%A2%85%E8%8A%B1%E5%9D%A1.jpg">
        </aside>
      </section>
    </div>
    <div class="comment-box">
      <el-divider></el-divider>
      <Comment>
      </Comment>
    </div>
  </div>
</template>

<script>
import $ from 'jquery'
import Comment from '@/components/Comment.vue';
import Heart from '@/components/Heart.vue';
export default {
  components: { Comment, Heart },
  data() {
    return {
      content: `
          <p>Wolf vinyl hella, jean shorts disrupt skateboard master cleanse hashtag iPhone. Pop-up bicycle rights
            Brooklyn
            iPhone Helvetica kitsch Godard, XOXO blog aesthetic beard quinoa. Fixie kale chips PBR&B twee, YOLO raw denim
            before they sold out photo booth bespoke seitan food truck. Ethical chia before they sold out, trust fund
            viral
            ennui you probably haven't heard of them cred bitters mixtape semiotics deep v jean shorts pork belly occupy
            shabby chic sriracha ethnic normcore bicycle rights single-origin coffee slow-carb jean shorts. Twee ethnic
            mumblecore, Carles banh mi slow-carb pour-over organic. Ethical tofu narwhal, hoodie viral ennui tousled
            paleo.
            Butcher chia cray iPhone keytar, sustainable Cosby sweater literally try-hard put a bird on it photo booth
            ethical
            street art literally semiotics.</p>
          <p><img
              src="https://picture-tjl.oss-cn-hangzhou.aliyuncs.com/WuHan_Flower/yinghua/%E5%A0%A4%E8%A7%92%E5%85%AC%E5%9B%AD%E6%A8%B1%E8%8A%B13.jpg">
          </p>
          <p>Twee 8-bit Blue Bottle, wolf tattooed distillery retro dreamcatcher put a bird on it letterpress asymmetrical
            actually Austin crucifix cred. Selfies ethical butcher vegan, umami bitters literally wolf seitan +1
            Intelligentsia Pitchfork. Godard mixtape pork belly Pitchfork, fap food truck wolf banh mi post-ironic.
            Narwhal
            letterpress Etsy direct trade irony pour-over. Cosby sweater literally Vice DIY butcher selvage shabby chic,
            XOXO
            hashtag letterpress single-origin coffee. Artisan Portland disrupt swag small batch chambray, Neutra bespoke
            Wes
            Anderson tofu VHS ennui. Cosby sweater letterpress 90's shabby chic cornhole, literally YOLO sartorial bitters
            Blue Bottle cardigan chambray asymmetrical.</p>
          <p>Fixie gluten-free sriracha flannel, selfies chambray direct trade. Authentic mixtape semiotics deep v jean
            shorts
            pork belly occupy shabby chic sriracha. Tousled Williamsburg fanny pack High Life shabby chic Cosby sweater,
            gastropub organic cornhole post-ironic hella drinking vinegar cliche wolf pork belly. Wolf selvage cornhole
            church-key, ethnic raw denim chillwave authentic asymmetrical Austin synth. Single-origin coffee iPhone
            Carles,
            Godard synth chia photo booth fap mustache authentic pickled direct trade. Literally Vice Echo Park, trust
            fund
            viral ennui you probably haven't heard of them cred biodiesel lomo scenester gastropub chia keffiyeh
            Intelligentsia. Blue Bottle blog asymmetrical, pickled XOXO sustainable twee seitan cornhole 90's.</p>
          <p>Flexitarian bitters cardigan tofu tattooed, Kickstarter Thundercats umami hella raw denim mumblecore
            stumptown
            Godard trust fund. Pop-up organic iPhone, Godard actually vegan fanny pack Intelligentsia sartorial. Chambray
            Echo
            Park you probably haven't heard of them, food truck Wes Anderson Brooklyn brunch. Scenester Austin street art,
            sartorial sriracha letterpress hashtag. Wayfarers vinyl single-origin coffee, fashion axe pork belly hoodie
            polaroid mumblecore street art Truffaut. Readymade ethical Carles American Apparel fanny pack twee. Normcore
            Etsy
            squid, farm-to-table XOXO forage selfies distillery photo booth Tonx.</p>
          <p>Mlkshk flexitarian ethical, narwhal forage bespoke artisan hella plaid vinyl try-hard Tonx actually keytar.
            McSweeney's chambray forage next level, mixtape Austin Portland Odd Future ethical seitan. Gluten-free roof
            party
            locavore, pop-up cornhole chambray mlkshk bitters McSweeney's Kickstarter bespoke. YOLO cred pop-up chambray
            PBR&B. Kitsch mixtape DIY skateboard leggings, YOLO ennui chillwave dreamcatcher put a bird on it. Pug artisan
            PBR&B PBR dreamcatcher, Marfa Etsy mixtape mustache messenger bag Vice. Plaid lomo pour-over post-ironic,
            synth
            disrupt beard Truffaut church-key Tumblr narwhal Bushwick cred slow-carb tofu.</p>
          <p>Pitchfork disrupt Vice fixie sriracha Blue Bottle. Carles gastropub skateboard Schlitz, Truffaut semiotics
            PBR
            fanny pack. Truffaut biodiesel aesthetic, skateboard Etsy distillery blog. Craft beer mumblecore bitters, Tonx
            fixie viral fingerstache Bushwick occupy. DIY tofu pug lo-fi, street art flexitarian Truffaut. 90's banjo
            lo-fi
            master cleanse selvage Tonx, narwhal tote bag. Helvetica before they sold out put a bird on it slow-carb
            normcore
            lo-fi.</p>`
    }
  },
  mounted() {
    this.$refs.target.innerHTML += this.content;
    $(window).scroll(function () {
      if ($(window).scrollTop() >= 300) {
        $('nav').addClass('fixed-header');
        $('nav div').addClass('visible-title');
      }
      else {
        $('nav').removeClass('fixed-header');
        $('nav div').removeClass('visible-title');
      }
    });
  },
}
</script>

<style scoped>
.Abstract {
  font-family: "PingFang SC";
}

/* resets */
.body {
  margin: 0px;
  padding: 0px;
  overflow: hidden
}

/* main */
header {
  height: 360px;
  z-index: 10;
}

.header-banner {
  background-color: #333;
  background-image: url('https://picture-tjl.oss-cn-hangzhou.aliyuncs.com/WuHan_Flower/yinghua/%E5%A0%A4%E8%A7%92%E5%85%AC%E5%9B%AD%E6%A8%B1%E8%8A%B13.jpg');
  background-position: center;
  background-repeat: no-repeat;
  background-size: cover;
  width: 100%;
  height: 300px;
}

header h1 {
  background-color: rgba(94, 97, 109, 0.7);
  color: #fff;
  padding: 0 1rem;
  position: absolute;
  top: 2rem;
  left: 2rem;
}

.fixed-header {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
}

nav {
  width: 100%;
  height: 60px;
  background: #292f36;
  z-index: 10;
}

nav div {
  color: white;
  font-size: 2rem;
  line-height: 60px;
  position: absolute;
  top: 0;
  left: 2%;
  visibility: hidden;
}

.visible-title {
  visibility: visible;
}

nav ul {
  list-style-type: none;
  margin: 0 2% auto 0;
  padding-left: 0;
  text-align: right;
  max-width: 100%;
}

nav ul li {
  display: inline-block;
  line-height: 60px;
  margin-left: 10px;
}

nav ul li a {
  text-decoration: none;
  color: #a9abae;
}

/* demo content */
body {
  color: #292f36;
  font-family: helvetica;
  line-height: 1.6;
}

.content {
  margin: 0 auto;
  padding: 4rem 0;
  width: 960px;
  max-width: 100%;
}

article {
  float: left;
  width: 720px;
}

article p:first-of-type {
  margin-top: 0;
}

aside {
  float: right;
  width: 240px;
}

p img {
  max-width: 100%;
}

@media only screen and (max-width: 960px) {
  .content {
    padding: 2rem 0;
  }

  article {
    float: none;
    margin: 0 auto;
    width: 96%;
  }

  article:last-of-type {
    margin-bottom: 3rem;
  }

  aside {
    float: none;
    text-align: center;
    width: 100%;
  }
}

article>>>p img {
  width: 660px;
  height: 200px;
  object-fit: cover;
}

aside img {
  width: 240px;
  height: 240px;
  object-fit: cover;
  margin-bottom: 10px;
}

.comment-box {
  width: 960px;
  margin: 0 auto;
  margin-top: 20px;
}
</style>