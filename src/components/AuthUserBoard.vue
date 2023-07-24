<template>
  <div class="container
              flex flex-col text-center
              bg-white shadow-md rounded-2xl
              text-2xl md:text-3xl lg:text-3xl xl:text-3xl 2xl:text-4xl text-black
              p-4
              ">
    <h1 class="text-gray-500 text-3xl lg:text-4xl 2xl:text-5xl  py-2 md:py-4 xl:py-6 break-words">@{{ username }}</h1>
    <h1 class="">{{ firstName }} {{ lastName }}</h1>
    <div class="container flex flex-col md:flex-row flex-wrap py-2">
      <div v-for="place in userPlaces"
           v-bind:key="place._id"
        class="flex flex-col items-center justify-between
               md:w-2/5 md:m-1/20 xl:w-3/12 xl:m-1/24 p-2 sm:p-4 my-2
               shadow-lg rounded-md border"
      >
        <img :src="place.photo"
             alt=""
             class="object-cover rounded-md p-2"
        >

        <h1 class="p-2">{{place.title}}</h1>
        <h1 class="p-2">
          {{place.rating}}
          <v-icon
            color="#ffd061"
            background-color="#ffdc8a"
            :size="24"
          >
            mdi-star
          </v-icon>
        </h1>

      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'AuthUserBoard',

  props: {
    firstName: {
      type: String,
      default: 'A'
    },
    lastName: {
      type: String,
      default: 'A'
    },
    username: {
      type: String,
      default: 'AAAAAAAA'
    },
    userPlaces: {
      type: Array,
      default: null
    }
  }
}
</script>

<style scoped>

</style>
