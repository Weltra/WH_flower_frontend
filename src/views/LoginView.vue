<template>
  <div class="body">
    <div class="container" id="login-box">

      <div class="form-container sign-up-container">
        <form>
          <h1>注册</h1>
          <div class="txtb">
            <input type="text" v-model.trim="s_name">
            <span data-placeholder="Useranme"></span>
          </div>
          <div class="txtb">
            <input type="email" v-model.trim="s_email">
            <span data-placeholder="Email"></span>
          </div>
          <div class="txtb">
            <input type="password" v-model.trim="s_password">
            <span data-placeholder="Password"></span>
          </div>
          <div class="txtb">
            <input type="password" v-model.trim="s_password_r">
            <span data-placeholder="Confirm Password"></span>
          </div>
          <button @click="register">注册</button>
        </form>
      </div>
      <div class="form-container sign-in-container">
        <form action="#">
          <h1>登录</h1>
          <div class="txtb">
            <input type="email" v-model.trim="email">
            <span data-placeholder="Email"></span>
          </div>
          <div class="txtb">
            <input type="password" v-model.trim="password">
            <span data-placeholder="Password"></span>
          </div>
          <a href="#">忘记密码？</a>
          <button @click="login">登录</button>
        </form>
      </div>

      <div class="overlay-container">
        <div class="overlay">
          <div class="overlay-panel overlay-left">
            <h1 style="color: #fff;">已有账号？</h1>
            <p>请使用您的账号进行登录</p>
            <button class="ghost" id="signIn">登录</button>
          </div>
          <div class="overlay-panel overlay-right">
            <h1 style="color: #fff;">没有账号? </h1>
            <p>立即注册加入，开始你的旅程吧</p>
            <button class="ghost" id="signUp">注册</button>
          </div>
        </div>

      </div>
    </div>
  </div>
</template>
<script>
import $ from 'jquery'
export default {
  data() {
    return {
      email: "",//姓名，用v-model绑定监听，将输入的字符串赋值给name变量
      password: "",//密码
      st: "false",//false为不保存登录
    };
  },
  methods: {
    login: function () {
      if (this.email === localStorage['email'] && this.password === localStorage['password']) {
        localStorage.setItem('s', 'true');
        this.$router.replace('/Home');//如果输入的名字以及密码正确路由跳转至个人页面
      }
      else if (this.email === '')//名字为空
      {
        alert('登录邮箱不能为空');
      }
      else if (this.password === '')//密码为空
      {
        alert('密码不为空');
      }
      else {
        alert('账号不存在，请注册后登录');//查无此号
      }
    },
    register: function () {
      if (localStorage['name'] === this.s_name) {
        alert("用户名已存在");//如果用户名已存在则无法注册
      }
      else if (this.s_name === '') {
        alert("用户名不能为空");
      }
      else if (this.s_password != this.s_password_r) {
        alert("两次输入密码应一致！");
        this.s_password.value = "";
        this.s_password_r.value = "";
      }
      else {//将新用户信息存储到localStorage，设置其为当前的用户
        localStorage.setItem('name', this.s_name);
        localStorage.setItem('password', this.s_password);
        localStorage.setItem('email', this.s_email);
        localStorage.setItem('s', 'true');
        alert("注册成功");
        this.$router.replace('/Home');//完成注册后跳转至登录页面
      }
    },
    //点击保持登录状态触发handlesave
    handlesave: function () {
      this.st = "true";
      localStorage.setItem('s', this.st);
      console.log(localStorage.s);
    }
  },
  mounted() {
    //动画
    $("#signUp").click(function () {
      $("#login-box").addClass('right-panel-active')
    })

    $("#signIn").click(function () {
      $("#login-box").removeClass('right-panel-active')
    })

    $(".txtb input").on("focus", function () {
      $(this).addClass("focus")
    })

    $(".txtb input").on("blur", function () {
      if ($(this).val() == '')
        $(this).removeClass("focus")
    })
  }
}
</script>

<style scoped>
* {
  box-sizing: border-box;
}

.body {
  font-family: 'Montserrat', sans-serif;
  background-image: linear-gradient(120deg, #a6c0fe 0%, #f68084 100%);
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height: 100vh;
  margin: 0 px;
}

h1 {
  font-weight: bold;
  margin: 0;
  font-size: 25px;
}

p {
  font-size: 14px;
  line-height: 20px;
  letter-spacing: .5px;
  margin: 20px 0 30px;
  width: 100%;
}

span {
  font-size: 12px;
}

a {
  color: #333;
  font-size: 14px;
  text-decoration: none;
  margin: 15px 0;
}

.container {
  background: #fff;
  border-radius: 10px;
  box-shadow: 0 14px 28px rgba(0, 0, 0, .25), 0 10px 10px rgba(0, 0, 0, .22);
  position: relative;
  overflow: hidden;
  width: 768px;
  max-width: 100%;
  min-height: 480px;
  opacity: 1;
}

.form-container form {
  background: #fff;
  display: flex;
  flex-direction: column;
  padding: 0 50px;
  height: 100%;
  justify-content: center;
  text-align: center;
}

.social-container {
  margin: 20px 0;
}

.social-container a {
  border: 1px solid #ddd;
  border-radius: 50%;
  display: inline-flex;
  justify-content: center;
  align-items: center;
  margin: 0 5px;
  height: 40px;
  width: 40px;
}

.social-container a:hover {
  background-color: #eee;

}

.txtb {
  border-bottom: 2px solid #adadad;
  position: relative;
  margin: 10px 0;
}

.txtb input {
  font-size: 15px;
  color: #333;
  border: none;
  width: 100%;
  outline: none;
  background: none;
  padding: 0 3px;
  height: 35px;
}

.txtb span::before {
  content: attr(data-placeholder);
  position: absolute;
  top: 50%;
  left: 5px;
  color: #adadad;
  transform: translateY(-50%);
  transition: .5s;
}

.txtb span::after {
  content: '';
  position: absolute;
  left: 0%;
  top: 100%;
  width: 0%;
  height: 2px;
  background-image: linear-gradient(120deg, #a6c0fe 0%, #f68084 100%);
  transition: .5s;
}

.focus+span::before {
  top: -5px;
}

.focus+span::after {
  width: 100%;
}

button {
  border-radius: 20px;
  border: 1px solid #ff4b2b;
  background: #ff4b2b;
  color: #fff;
  font-size: 12px;
  font-weight: bold;
  padding: 12px 45px;
  letter-spacing: 1px;
  text-transform: uppercase;
  transition: transform 80ms ease-in;
  cursor: pointer;
}

button:active {
  transform: scale(.95);
}

button:focus {
  outline: none;
}

button.ghost {
  background: transparent;
  border-color: #fff;
}

.form-container {
  position: absolute;
  top: 0;
  height: 100%;
  transition: all .6s ease-in-out;
}

.form-container button {
  background-image: linear-gradient(120deg, #a6c0fe 0%, #f68084 100%);
  border: none;
  background-size: 200%;
  color: #fff;
  transition: .5s;
}

.form-container button:hover {
  background-position: right;
}

.sign-in-container {
  left: 0;
  width: 50%;
  z-index: 2;
}

.sign-in-container form a {
  position: relative;
  left: 100px;
}

.sign-up-container {
  left: 0;
  width: 50%;
  z-index: 1;
  opacity: 0;
}

.sign-up-container button {
  margin-top: 20px;
}

.overlay-container {
  position: absolute;
  top: 0;
  left: 50%;
  width: 50%;
  height: 100%;
  overflow: hidden;
  transition: transform .6s ease-in-out;
  z-index: 100;
}

.overlay {
  background-image: linear-gradient(120deg, #a6c0fe 0%, #f68084 100%);
  color: #fff;
  position: relative;
  left: -100%;
  height: 100%;
  width: 200%;
  transform: translateY(0);
  transition: transform .6s ease-in-out;
}

.overlay-panel {
  position: absolute;
  top: 0;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding: 0 40px;
  height: 100%;
  width: 50%;
  text-align: center;
  transform: translateY(0);
  transition: transform .6s ease-in-out;
}

.overlay-right {
  right: 0;
  transform: translateY(0);

}

.overlay-left {
  transform: translateY(-20%);
}

.container.right-panel-active .sign-in-container {
  transform: translateY(100%);
}

.container.container.right-panel-active .overlay-container {
  transform: translateX(-100%);
}

.container.right-panel-active .sign-up-container {
  transform: translateX(100%);
  opacity: 1;
  z-index: 5;
}

.container.container.right-panel-active .overlay {
  transform: translateX(50%);
}

.container.container.right-panel-active .overlay-left {
  transform: translateY(0);
}

.container.container.right-panel-active .overlay-right {
  transform: translateY(20%);
}
</style>


