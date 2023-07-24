<template>
  <div
    class="grid min-h-screen place-items-center w-full"
  >
    <form
      class="w-11/12 p-12 bg-green-400 rounded-2xl sm:w-8/12 md:w-1/2 lg:w-5/12"
      @submit.prevent="handleRegisterSubmit"
      method="post"
    >
      <h1
        class="text-xl font-semibold"
      > Пожалуйста, заполните все поля:
      </h1>
      <form
        class="mt-6"
      >
        <div
          class="flex justify-between gap-3"
        >
        <span
          class="w-1/2"
        >
          <label
            for="firstname"
            class="block text-xs font-semibold text-gray-600 uppercase"
          >Имя
          </label>
          <input
            v-model.trim="firstName"
            id="firstname"
            type="text"
            name="firstname"
            placeholder="Ivan"
            autocomplete="given-name"
            class="block w-full p-3 mt-2 text-gray-700 bg-gray-200 appearance-none focus:outline-none focus:bg-gray-300 focus:shadow-inner"
            required />
        </span>
          <span
            class="w-1/2"
          >
          <label
            for="lastname"
            class="block text-xs font-semibold text-gray-600 uppercase"
          >Фамилия
          </label>
        <input
          v-model.trim="lastName"
          id="lastname"
          type="text"
          name="lastname"
          placeholder="Ivanov"
          autocomplete="family-name"
          class="block w-full p-3 mt-2 text-gray-700 bg-gray-200 appearance-none focus:outline-none focus:bg-gray-300 focus:shadow-inner"
          required />
        </span>
        </div>
        <label
          for="username"
          class="block mt-2 text-xs font-semibold text-gray-600 uppercase"
        >Логин
        </label>
        <input
          v-model.trim="username"
          id="username"
          type="text"
          name="username"
          placeholder="username007"
          autocomplete="username"
          class="block w-full p-3 mt-2 text-gray-700 bg-gray-200 appearance-none focus:outline-none focus:bg-gray-300 focus:shadow-inner"
          required
          @keyup="usernameAvailable"
        />
        <label for="username" class="block mt-2 text-xs font-semibold text-red-500 uppercase" v-if="!$v.username.required">Обязательное поле</label>
        <label for="username" class="block mt-2 text-xs font-semibold text-red-500 uppercase" v-if="!$v.username.alphaNum">используйте латиницу и цифры</label>
        <label for="username" class="block mt-2 text-xs font-semibold text-red-500 uppercase" v-if="!$v.username.minLength">Длина должна быть больше 8 символов</label>
        <label for="username" class="block mt-2 text-xs font-semibold text-red-500 uppercase" v-if="!$v.username.maxLength">Длина должна быть меньше 16 символов</label>
        <label for="username" class="block mt-2 text-xs font-semibold text-red-500 uppercase" v-if="!username_available && username_available != null">Имя пользователя занято</label>
        <label for="username" class="block mt-2 text-xs font-semibold uppercase text-white" v-else-if="username && username.length >= 8">Имя пользователя свободно</label>
        <label
          for="password"
          class="block mt-2 text-xs font-semibold text-gray-600 uppercase"
        >Пароль
        </label>
        <input
          v-model.trim="password"
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
        <label
          for="password-confirm"
          class="block mt-2 text-xs font-semibold text-gray-600 uppercase"
        >Подтверждение пароля
        </label>
        <input
          v-model.trim="password_confirmation"
          id="password-confirm"
          type="password"
          name="password-confirm"
          placeholder="password123"
          autocomplete="new-password"
          class="block w-full p-3 mt-2 text-gray-700 bg-gray-200 appearance-none focus:outline-none focus:bg-gray-300 focus:shadow-inner"
          required />
        <label for="password-confirm" class="block mt-2 text-xs font-semibold text-red-500 uppercase" v-if="!$v.password_confirmation.sameAsPassword">Пароли не совпадают</label>
        <button
          type="submit"
          class="w-full mt-5 py-2 tracking-widest uppercase font-medium bg-black rounded shadow-md focus:outline-none cursor-default"
          :disabled="!isValid"
          :class="{active: isValid}"
          @click.prevent="handleRegisterSubmit"
        ><span class="text-white">Зарегистрироваться</span>
        </button>
        <p
          class="flex justify-between inline-block mt-4 text-md italic text-gray-500 cursor-pointer uppercase hover:text-black"
          @click="alreadyRegister"
        >Уже есть аккаунт?
        </p>
      </form>
    </form>
  </div>
</template>

<script>
import { validationMixin } from 'vuelidate'
import { required, alphaNum, minLength, maxLength, sameAs } from 'vuelidate/lib/validators'
export default {
  name: 'RegistrationForm',
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
    },
    password_confirmation: {
      sameAsPassword: sameAs('password')
    }
  },
  data () {
    return {
      firstName: '',
      lastName: '',
      username: '',
      password: '',
      password_confirmation: '',
      username_available: null
    }
  },
  methods: {
    handleRegisterSubmit () {
      const data = {
        firstname: this.firstName,
        lastname: this.lastName,
        username: this.username,
        password: this.password
      }
      this.$store.dispatch('register', data)
        .then(() => this.$router.push('/'))
        .catch(e => console.log(e))
    },
    alreadyRegister () {
      this.$router.push('/login')
    },
    usernameAvailable () {
      if (this.username.length >= 8) {
        this.$http.get('/auth/nameavailable', {
          params: {
            username: this.username
          }
        }).then(res => {
          this.username_available = res.data.status
        })
      }
    }
  },
  computed: {
    isValid () {
      this.$v.$touch()
      return !this.$v.$invalid
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
  .active {
    @apply hover:bg-blue-600 hover:shadow-none cursor-pointer
  }
</style>
