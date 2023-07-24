<template>
  <div class="container
              shadow-md
              flex flex-col lg:flex-row justify-between
              bg-white
              rounded-2xl sm:text-center
              sm:text-xl md:text-2xl lg:text-xl xl:text-xl 2xl:text-2xl">

    <div
      class="lg:w-1/2 px-4 pt-4 lg:p-8 flex flex-col justify-between text-center"
    >
      <img
          :src="photo"
          alt=""
          class="rounded-2xl object-cover self-center"
      >
      <div class="container flex justify-center items-end py-4 lg:hidden">
        <h3 class="text-3xl md:text-4xl px-4 font-bold">{{title}}</h3>
        <h3 class="text-xl"
        >
          {{rating.toFixed(2)}}
        </h3>

        <v-icon
          color="#ffd061"
          background-color="#ffdc8a"
          :size="star_size"
        >
          mdi-star
        </v-icon>

      </div>

      <hr class="lg:hidden">
      <span class="py-2 mt-2 text-base"><i class="fas fa-map-marked-alt"></i> {{address}}</span>
      <span class="py-2 text-base"><i class="fas fa-bus"></i> {{bus_station}}</span>
      <rating
        class="py-2"
      ></rating>

    </div>

    <div
      class="lg:w-1/2 flex flex-col justify-around lg:p-8 text-center items-center"
    >

      <div class="container flex justify-center items-end hidden lg:flex">
        <h3 class="lg:text-4xl xl:text-4xl 2xl:text-5xl px-6 font-bold"
        >{{title}}</h3>

          <h3 class="lg:text-2xl 2xl:text-3xl"
          >
            {{rating.toFixed(2).replace(".00", "")}}
          </h3>

          <v-icon
            color="#ffd061"
            background-color="#ffdc8a"
            :size="star_size"
          >
            mdi-star
          </v-icon>
      </div>

      <hr>
      <p class="py-4 lg:p-0 w-2/3 lg:w-full self-center text-justify">{{description}}</p>
      <hr>
      <div class="container flex py-4 lg:p-0 justify-center">
        <!--Тут наверное немного костыльно, хотя это единственное, что работает из того, что пробовал-->
        <span
          v-for="tag in tags"
          v-bind:key="tag"
          class="m-2 py-2 px-3 text-center rounded-md capitalize
                 text-base"
          style="background-color: #FFD9CC"
        >
          {{tag}}
        </span>
      </div>
    </div>
    <v-snackbar
      v-model="snackbar"
      :timeout="timeout"
      min-width="250"
    >
      <span class="font-bold text-base">{{ message }}</span>
    </v-snackbar>
  </div>
</template>

<script>
import Rating from '@/components/Rating'
export default {
  name: 'PlaceCard',
  components: { Rating },
  props: {
    title: {
      type: String,
      default: 'ДВФУ'
    },
    photo: {
      type: String,
      default: 'unsplash.com'
    },
    address: {
      type: String,
      default: 'Адрес'
    },
    description: {
      type: String,
      default: 'Описание'
    },
    bus_station: {
      type: String,
      default: 'Некрасовская, 50'
    },
    rating: {
      type: Number,
      default: 5.0
    },
    tags: {
      type: Array,
      default: null
    }
  },
  data () {
    return {
      snackbar: false,
      timeout: 3000,
      message: 'Возможность оценки мест доступна только авторизованным пользователям!'
    }
  },
  computed: {
    star_size () {
      switch (this.$vuetify.breakpoint.name) {
        case 'xs': return 24
        case 'sm': return 24
        case 'md': return 32
        case 'lg': return 32
        case 'xl': return 32
        default: return 48
      }
    }
  },
  created () {
    if (!this.$store.getters.isAuth) {
      this.snackbar = true
    }
  }
}
</script>

<style scoped>
  hr {
    @apply w-full;
  }
</style>
