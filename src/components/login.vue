<template>
  <div class="auth-layout">
    <div class="main row">
      <div class="auth-content">
        <div class="login">
          <h2>欢迎登录后台系统!</h2>
          <div class="form-group">
            <div class="input-group">
              <input
                type="text"
                id="email"
                v-model="user.name"
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
                v-model="user.password"
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
      <div class="auth-wallpaper">
        <div class="oblique"></div>
      </div>
    </div>
  </div>
</template>
<script>
import router from '../router/index'
export default {
  name: 'login',
  data() {
    return {
      user: { name: '', password: '' }
    }
  },
  methods: {
    // 用户登录
    login() {
      if (!this.user.name.trim().length) {
        this.$message.error('用户名不能为空')
        return false
      } else if (!this.user.password.trim().length) {
        this.$message.error('密码不能为空')
        return false
      }
      this.$message.success('登录成功')
      localStorage.setItem('token', 'token')
      localStorage.setItem('username', this.user.name)
      router.push({ path: '/', name: '主页' })
      window.location.reload()
    }
  }
}
</script>

<style scoped>
.auth-layout {
  height: 100vh;
  margin: 0;
}

div {
  position: relative;
}

input {
  width: 6.5em;
  color: white;
  font-size: inherit;
  font-family: inherit;
  background-color: hsl(236, 32%, 26%);
  padding: 0.35em 0.45em;
  border: none;
  border-bottom: 1px solid #ccc !important;
  transition: background-color 0.3s ease-in-out;
}

input:focus {
  outline: none;
}

input::placeholder {
  color: #999;
}

span {
  position: absolute;
  background-color: rgba(74, 227, 135, 0.5);
  transition: transform 0.5s ease;
}

.bottom,.top {
  height: 1px;
  left: 0;
  right: 0;
  transform: scaleX(0);
}

.left,.right {
  width: 1px;
  top: 0;
  bottom: 0;
  transform: scaleY(0);
}

.bottom {
  bottom: 0;
  transform-origin: bottom right;
}

input:focus ~ .bottom {
  transform-origin: bottom left;
  transform: scaleX(1);
}

.right {
  right: 0;
  transform-origin: top right;
}

input:focus ~ .right {
  transform-origin: bottom right;
  transform: scaleY(1);
}

.top {
  top: 0;
  transform-origin: top left;
}

input:focus ~ .top {
  transform-origin: top right;
  transform: scaleX(1);
}

.left {
  left: 0;
  transform-origin: bottom left;
}

input:focus ~ .left {
  transform-origin: top left;
  transform: scaleY(1);
}

button:focus{outline: none}
.row {
  display: -webkit-box;
  display: -ms-flexbox;
  display: flex;
  -ms-flex-wrap: wrap;
  flex-wrap: wrap;
  margin-right: -15px;
  margin-left: -15px;
}

.auth-layout .main {
  margin: 0;
  height: 100%;
  overflow: hidden;
  background: url('https://cdn.mphot.cn/background.jpg');
  background-size: 100%;
  width: 100%;
  background-repeat: no-repeat;
}

.auth-wallpaper {
  display: -webkit-box;
  display: -ms-flexbox;
  display: flex;
  -webkit-box-align: center;
  -ms-flex-align: center;
  align-items: center;
  -webkit-box-pack: center;
  -ms-flex-pack: center;
  justify-content: center;
}

.auth-wallpaper {
  display: -webkit-box;
  display: -ms-flexbox;
  display: flex;
  -webkit-box-align: center;
  -ms-flex-align: center;
  align-items: center;
  -webkit-box-pack: center;
  -ms-flex-pack: center;
  justify-content: center;
}

.login {
    width: 25rem;
    margin: auto;
    background: #fff;
    padding: 25px;
    border-radius: 5px;
    box-shadow: 0px 5px 10px 1px rgba(0,0,0,0.35);
}

.form-group {
  position: relative;
  display: -webkit-box;
  display: -ms-flexbox;
  display: flex;
  -webkit-box-orient: horizontal;
  -webkit-box-direction: normal;
  -ms-flex-direction: row;
  flex-direction: row;
  min-height: 2.25rem;
  margin-top: 0.2rem;
  margin-bottom: 2.25rem;
  overflow: hidden;
}

.form-group .input-group {
  position: relative;
  display: block;
  width: 100%;
}

.form-group .input-group {
  -ms-flex-item-align: end;
  align-self: flex-end;
}

.form-group input,
.form-group textarea {
  display: block;
  background: none;
  font-size: 1rem;
  line-height: 2;
  width: 100%;
  transition: all 0.28s ease;
  box-shadow: none;
}

.form-group .control-label {
  position: absolute;
  top: 0.25rem;
  left: 0;
  max-width: 100%;
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
  pointer-events: none;
  padding-left: 0.125rem;
  z-index: 1;
  color: #b3b3b3;
  font-size: 1rem;
  font-weight: 400;
  transition: all 0.28s ease;
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
  padding: 0;
  width: 50%;
  height: 100vh;
  display: flex;
}

.auth-wallpaper {
  background-color: #333;
  overflow: hidden;
  width: 50%;
}

.oblique {
  background-color: #282828;
  right: 5.5%;
  -webkit-transform: rotate(15deg);
  transform: rotate(15deg);
  width: 200px;
  height: 130vh;
  margin-top: -50px;
}

.btn {
  box-shadow: 0 4px 9.6px 0.4px rgba(74, 227, 135, 0.5);
  font-family: inherit;
  letter-spacing: 3px;
  text-transform: uppercase;
  cursor: pointer;
  display: inline-block;
  font-weight: 400;
  text-align: center;
  white-space: nowrap;
  vertical-align: middle;
  -webkit-user-select: none;
  -moz-user-select: none;
  -ms-user-select: none;
  user-select: none;
  border: 0 solid transparent;
  padding: 1.1rem 3.9rem;
  font-size: 1rem;
  line-height: 1.25;
  border-radius: 1.875rem;
  transition: color 0.15s ease-in-out, background-color 0.15s ease-in-out,
    border-color 0.15s ease-in-out, box-shadow 0.15s ease-in-out;
  color: #ffffff;
  background-color: #4ae387;
  border-color: #4ae387;
}
</style>
