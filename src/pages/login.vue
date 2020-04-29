<template>
  <div class="auth-layout">
    <div class="main row">
      <div class="auth-content">
        <div class="login-content">
          <div class="login">
            <h2>欢迎登录后台系统!</h2>
            <div class="form-group">
              <div class="input-group">
                <input
                  type="text"
                  v-model="form.username"
                  required="required"
                  placeholder="用户名"
                />
                <span class="bottom"></span>
                <span class="right"></span>
                <span class="top"></span>
                <span class="left"></span>
                <i class="bar"></i>
              </div>
            </div>
            <div class="form-group">
              <div class="input-group">
                <input
                  type="password"
                  id="password"
                  v-model="form.password"
                  required="required"
                  placeholder="密码"
                />
                <span class="bottom"></span>
                <span class="right"></span>
                <span class="top"></span>
                <span class="left"></span>
                <i class="bar"></i>
              </div>
            </div>
            <div class="down-container">
              <button type="submit" class="btn btn-primary" @click="login">
                登录
              </button>
            </div>
          </div>
        </div>
      </div>
      <div class="auth-wallpaper">
        <div class="oblique"></div>
      </div>
    </div>
  </div>
</template>
<script>
import router from '../router/index'
import { getData } from '../untils/js/request'
export default {
  name: 'login',
  data() {
    return {
      form: { username: '', password: '' },
    }
  },
  methods: {
    async _login() {
      let res = await getData('/login', this.form, 'POST')
      if (res.error_code === 10000) {
        this.$message.success('登录成功')
        localStorage.setItem('token', res.data)
        localStorage.setItem('username', this.form.username)
        router.push({ path: '/', name: '主页' })
        window.location.reload()
      } else {
        this.$message.error(res.msg)
      }
    },
    // 用户登录
    login() {
      if (!this.form.username.trim().length) {
        this.$message.error('用户名不能为空')
        return false
      } else if (!this.form.password.trim().length) {
        this.$message.error('密码不能为空')
        return false
      }
      this._login()
    },
  },
}
</script>

<style scoped>
.auth-layout {
  margin: 0;
  height: 100vh;
}
div {
  position: relative;
}
input {
  padding: 0.35em 0.45em;
  width: 6.5em;
  border: none;
  border-bottom: 1px solid #ccc !important;
  background-color: #2d2f57;
  color: #fff;
  font-size: inherit;
  font-family: inherit;
  transition: background-color 0.3s ease-in-out;
}
input:focus {
  outline: 0;
}
input::placeholder {
  color: #999;
}
span {
  position: absolute;
  background-color: rgba(74, 227, 135, 0.5);
  transition: transform 0.5s ease;
}
.bottom,
.top {
  right: 0;
  left: 0;
  height: 1px;
  transform: scaleX(0);
}
.left,
.right {
  top: 0;
  bottom: 0;
  width: 1px;
  transform: scaleY(0);
}
.bottom {
  bottom: 0;
  transform-origin: bottom right;
}
input:focus ~ .bottom {
  transform: scaleX(1);
  transform-origin: bottom left;
}
.right {
  right: 0;
  transform-origin: top right;
}
input:focus ~ .right {
  transform: scaleY(1);
  transform-origin: bottom right;
}
.top {
  top: 0;
  transform-origin: top left;
}
input:focus ~ .top {
  transform: scaleX(1);
  transform-origin: top right;
}
.left {
  left: 0;
  transform-origin: bottom left;
}
input:focus ~ .left {
  transform: scaleY(1);
  transform-origin: top left;
}
button:focus {
  outline: 0;
}
.row {
  display: -ms-flexbox;
  display: flex;
  margin-right: -15px;
  margin-left: -15px;
  -ms-flex-wrap: wrap;
  flex-wrap: wrap;
}
.auth-layout .main {
  overflow: hidden;
  margin: 0;
  width: 100%;
  height: 100%;
  background: url(https://cdn.mphot.cn/background.jpg);
  background-size: cover;
  background-repeat: no-repeat;
  background-attachment: fixed;
}
.auth-wallpaper {
  display: -ms-flexbox;
  display: flex;
  -ms-flex-align: center;
  align-items: center;
  -ms-flex-pack: center;
  justify-content: center;
}
.login {
  position: relative;
  z-index: 100;
  box-sizing: border-box;
  margin: auto;
  padding: 25px;
  width: 25rem;
  border-radius: 5px;
  background: inherit;
  box-shadow: 0 5px 10px 1px rgba(0, 0, 0, 0.35);
}
.login h2 {
  color: #fff;
}
.login-content {
  position: relative;
  z-index: 100;
  display: flex;
  margin: auto;
  width: 25rem;
}
.login-content:after {
  position: absolute;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  z-index: 10;
  width: 100%;
  height: auto;
  background: inherit;
  box-shadow: inset 0 0 0 200px hsla(0, 0%, 100%, 0.15);
  content: '';
  filter: blur(10px);
}
.form-group {
  position: relative;
  display: -ms-flexbox;
  display: flex;
  overflow: hidden;
  margin-top: 0.2rem;
  margin-bottom: 2.25rem;
  min-height: 2.25rem;
  -ms-flex-direction: row;
  flex-direction: row;
}
.form-group .input-group {
  position: relative;
  display: block;
  width: 100%;
  -ms-flex-item-align: end;
  align-self: flex-end;
}
input::placeholder {
  color: #ccc;
}
.form-group input,
.form-group textarea {
  display: block;
  width: 100%;
  background: 0 0;
  box-shadow: none;
  font-size: 1rem;
  line-height: 2;
  transition: all 0.28s ease;
}
.form-group .control-label {
  position: absolute;
  top: 0.25rem;
  left: 0;
  z-index: 1;
  overflow: hidden;
  padding-left: 0.125rem;
  max-width: 100%;
  color: #b3b3b3;
  text-overflow: ellipsis;
  white-space: nowrap;
  font-weight: 400;
  font-size: 1rem;
  transition: all 0.28s ease;
  pointer-events: none;
}
label {
  display: inline-block;
  margin-bottom: 0.5rem;
}
.form-group .bar {
  position: relative;
  display: block;
}
.auth-content {
  display: flex;
  padding: 0;
  width: 50%;
  height: 100vh;
}
.auth-wallpaper {
  overflow: hidden;
  width: 50%;
  background-color: #333;
}
.oblique {
  right: 5.5%;
  margin-top: -50px;
  width: 200px;
  height: 130vh;
  background-color: #282828;
  transform: rotate(15deg);
}
.btn {
  display: inline-block;
  padding: 1.1rem 3.9rem;
  border: 0 solid transparent;
  border-color: #4ae387;
  border-radius: 1.875rem;
  background-color: #4ae387;
  box-shadow: 0 4px 0.6pc 0.4px rgba(74, 227, 135, 0.5);
  color: #fff;
  vertical-align: middle;
  text-align: center;
  text-transform: uppercase;
  white-space: nowrap;
  letter-spacing: 3px;
  font-weight: 400;
  font-size: 1rem;
  font-family: inherit;
  line-height: 1.25;
  cursor: pointer;
  transition: color 0.15s ease-in-out, background-color 0.15s ease-in-out,
    border-color 0.15s ease-in-out, box-shadow 0.15s ease-in-out;
  -webkit-user-select: none;
  -moz-user-select: none;
  -ms-user-select: none;
  user-select: none;
}
</style>
