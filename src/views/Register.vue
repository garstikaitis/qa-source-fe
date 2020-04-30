<template>
  <div class="h-screen w-full flex justify-center items-center bg-blue-100">
    <div class="bg-white shadow p-4 rounded-lg flex p-8">
      <div class="w-1/2 border border-t-0 border-l-0 border-b-0 pr-8">
        <img src="../assets/undraw/typewriter.svg"/>
      </div>
      <div class="w-1/2 h-inherit justify-center pl-8">
        <div class="flex flex-col w-full h-full justify-center">
          <div class="font-body text-2xl font-semibold text-center mb-12">Register</div>
          <div class="mb-4">
            <div class="text-sm mb-1 text-gray-600">Email</div>
            <el-input v-model="form.email" />
          </div>
          <div class="mb-4">
            <div class="text-sm mb-1 text-gray-600">Password</div>
            <el-input type="password" v-model="form.password" />
          </div>
          <div class="w-full">
            <el-button @click="register" type="primary" class="w-full">Register</el-button>
          </div>
          <div class="w-full text-sm mt-4 text-center">
            Already have an account?
            <br> 
            <span class="text-base cursor-pointer">
              <router-link :to="{name: 'Login'}">
                Click here to login
              </router-link>
            </span>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { AuthService } from '@/api';
export default {
  name: 'Register',
  data() {
    return {
      form: {
        email: '',
        password: ''
      }
    }
  },
  methods: {
    async register() {
			const authService = new AuthService;
      const { data, success } = await authService.register({ email: this.form.email, password: this.form.password });
      if(data.success) {
        this.$store.commit('auth/SET_USER', { key: 'user', value: JSON.parse(JSON.stringify(data.data)) });
        this.$router.push({ name: 'Dashboard' });
      }
    }
  },
  created() {
    window.addEventListener('keyup', async e => {
      if(e.keyCode === 13 && this.form.email.length && this.form.password.length) await this.register();
    })
  }
}
</script>
