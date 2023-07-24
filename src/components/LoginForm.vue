<template>
  <div
    class="grid min-h-screen place-items-center w-full"
  >
    <div
      class="w-11/12 p-12 bg-green-400 rounded-2xl sm:w-8/12 md:w-1/2 lg:w-5/12"
    >
      <h1
        class="text-xl font-semibold"
      > Введите данные для входа:
      </h1>
      <form
        class="mt-6"
      >
        <label
          for="username"
          class="block mt-2 text-xs font-semibold text-gray-600 uppercase"
        >Логин
        </label>
        <input
          v-model="username"
          id="username"
          type="text"
          name="username"
          placeholder="username007"
          autocomplete="username"
          class="block w-full p-3 mt-2 text-gray-700 bg-gray-200 appearance-none focus:outline-none focus:bg-gray-300 focus:shadow-inner"
          required />
        <label for="username" class="block mt-2 text-xs font-semibold text-red-500 uppercase" v-if="!$v.username.required">Обязательное поле</label>
        <label for="username" class="block mt-2 text-xs font-semibold text-red-500 uppercase" v-if="!$v.username.alphaNum">используйте латиницу и цифры</label>
        <label for="username" class="block mt-2 text-xs font-semibold text-red-500 uppercase" v-if="!$v.username.minLength">Длина должна быть больше 8 символов</label>
        <label for="username" class="block mt-2 text-xs font-semibold text-red-500 uppercase" v-if="!$v.username.maxLength">Длина должна быть меньше 16 символов</label>
        <label
          for="password"
          class="block mt-2 text-xs font-semibold text-gray-600 uppercase"
        >Пароль
        </label>
        <input
          v-model="password"
          id="password"
          type="password"
          name="password"
          placeholder="password123"
          autocomplete="new-password"
          class="block w-full p-3 mt-2 text-gray-700 bg-gray-200 appearance-none focus:outline-none focus:bg-gray-300 focus:shadow-inner"
          required />
        <label for="password" class="block mt-2 text-xs font-semibold text-red-500 uppercase" v-if="!$v.password.required">Обязательное поле</label>
        <label for="password" class="block mt-2 text-xs font-semibold text-red-500 uppercase" v-if="!$v.password.alphaNum">используйте латиницу и цифры</label>
        <label for="password" class="block mt-2 text-xs font-semibold text-red-500 uppercase" v-if="!$v.password.minLength">Длина должна быть больше 8 символов</label>
        <label for="password" class="block mt-2 text-xs font-semibold text-red-500 uppercase" v-if="!$v.password.maxLength">Длина должна быть меньше 16 символов</label>
        <button
          type="submit"
          class="w-full mt-5 py-2 tracking-widest uppercase font-medium bg-black rounded shadow-md hover:bg-blue-600 hover:shadow-none focus:outline-none"
          @click.prevent="handleLoginSubmit"
        ><span class="text-white">Войти</span>
        </button>
      </form>
    </div>
    <v-snackbar
      v-model="snackbar"
      :timeout="timeout"
    >
      {{ loginErrorMessage }}
    </v-snackbar>
  </div>
</template>

<script>
import { validationMixin } from 'vuelidate'
import { required, alphaNum, minLength, maxLength } from 'vuelidate/lib/validators'
export default {
  name: 'LoginForm',
  mixins: [validationMixin],
  props: {
    nextUrl: {
      type: String,
      default: ''
    }
  },
  validations: {
    username: {
      required,
      minLength: minLength(8),
      maxLength: maxLength(16),
      alphaNum
    },
    password: {
      required,
      minLength: minLength(8),
      maxLength: maxLength(16),
      alphaNum
    }
  },
  data () {
    return {
      username: '',
      password: '',
      loginErrorMessage: '',
      timeout: 3000,
      snackbar: false
    }
  },
  methods: {
    handleLoginSubmit () {
      const username = this.username
      const password = this.password
      this.$store.dispatch('login', { username, password })
        .then(() => this.$router.push('/'))
        .catch(e => {
          if (e.response.data.field[0] === 'u') {
            this.loginErrorMessage = 'Неверное имя пользователя!'
          } else if (e.response.data.field[0] === 'p') {
            this.loginErrorMessage = 'Неверный пароль!'
          }
          this.snackbar = true
        })
    }
  },
  created () {
    if (this.$store.state.errorField === '') {
      this.loginErrorMessage = ''
    }
  }
}
</script>

<style scoped>
  input {
    @apply rounded-md
  }
  button {
    @apply rounded-lg
  }
</style>
