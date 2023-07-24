<template>
    <div class="app container--fluid main grid min-h-screen place-items-center">
      <div class="navbar w-full min-h-navbar flex flex-col lg:flex-row pt-4 lg:px-32 items-center justify-between">
        <div class="flex flex-row">
          <h2 class="font-bold text-white text-xl md:text-3xl xl:text-4xl pr-2 lg:p-0">
            <router-link tag="a" :to="{name: 'Home'}">
              Колесо Открытий
            </router-link>
          </h2>
          <div class="button lg:hidden"
               @click="buttonsHidden = !buttonsHidden"
          >
            <v-icon
                 class="text-green-600 w-full h-full"
                 size="24"
                 style="color: mediumseagreen"
            >
              {{getArrowDirection}}
            </v-icon>
          </div>
        </div>
        <div class="buttons flex-col items-center w-4/5 md:w-86 lg:w-auto md:py-2
                    lg:p-0 md:justify-around lg:justify-start md:flex-row lg:flex"
             :class="{'hidden': buttonsHidden, 'flex': !buttonsHidden}">
            <div
              class="border-2 rounded-lg
                     px-3 py-2 mt-4 md:my-0 md:mr-3
                     hover:text-white font-bold text-center
                     cursor-pointer
                     border-green-600 hover:bg-green-600 text-green-200
                     w-full md:w-2/5 lg:w-auto
                    "
              @click="button1Action"
            >
              <v-icon v-if="isAuth"
                      style="color: white"
              >
                mdi-account
              </v-icon>
              {{ getButton1Text }}
            </div>
          <div
            class="border-2  rounded-lg
                   px-3 py-2 mt-4 md:m-0
                   hover:text-white font-bold text-center
                   cursor-pointer
                   w-full md:w-2/5 lg:w-auto
                  "
            :class="{
            'border-red-600 text-red-200 hover:bg-red-600': isAuth,
            'border-blue-600 text-blue-200 hover:bg-blue-600': !isAuth
            }"
            @click="button2Action"
          >
            {{ getButton2Text }}
          </div>
        </div>
      </div>
      <div class="grid place-items-center w-screen min-h-main lg:min-h-screen">
        <router-view></router-view>
      </div>
    </div>
</template>

<script>

export default {
  name: 'App',

  data () {
    return {
      buttonsHidden: true
    }
  },
  computed: {
    isAuth () {
      return this.$store.getters.isAuth
    },

    getButton1Text () {
      return this.isAuth ? 'Профиль' : 'Авторизация'
    },

    getButton2Text () {
      return this.isAuth ? 'Выйти' : 'Регистрация'
    },

    button1Action () {
      return this.isAuth ? this.profileTransitionAction : this.loginAction
    },

    button2Action () {
      return this.isAuth ? this.logoutAction : this.signupAction
    },

    getArrowDirection () {
      return this.buttonsHidden ? 'mdi-arrow-down-drop-circle-outline' : 'mdi-arrow-up-drop-circle-outline'
    }

  },
  methods: {
    logoutAction () {
      this.$store.dispatch('logout')
        .then(() => {
          this.$router.go(-1)
        })
    },

    profileTransitionAction () {
      this.$router.push('/userboard')
    },

    loginAction () {
      this.$router.push('/login')
    },

    signupAction () {
      this.$router.push('/signup')
    }
  },
  created () {
    this.$http.interceptors.response.use(undefined, err => {
      return new Promise((resolve, reject) => {
        if (err.status === 401 && err.config) {
          this.$store.dispatch('logout')
        }
        throw err
      })
    })
  }
}
</script>

<style scoped>
  .main {
    background: url('./assets/1.jpg');
    background-size:auto;
  }
  .app {
    @apply flex flex-col items-center
  }
  .navbar {
    @apply flex justify-between bg-opacity-50
  }
</style>
