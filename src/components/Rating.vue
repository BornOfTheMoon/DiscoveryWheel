<template>
    <v-rating
      v-model="userRating"
      half-increments
      hover
      length="5"
      :size="starSize"
      color="#ffd061"
      background-color="#ffdc8a"
      :readonly="userRating != null || alreadyRates || !isAuth"
      @input="sendRating"
    ></v-rating>
</template>

<script>
export default {
  name: 'rating',
  data () {
    return {
      userRating: null,
      alreadyRates: false
    }
  },
  computed: {
    starSize () {
      switch (this.$vuetify.breakpoint.name) {
        case 'xs': return 24
        case 'sm': return 24
        case 'md': return 32
        case 'lg': return 32
        case 'xl': return 32
        default: return 48
      }
    },
    isAuth () {
      return this.$store.getters.isAuth
    }
  },
  methods: {
    sendRating () {
      const placeId = this.$store.getters.getPlaceID
      const rate = this.userRating
      const userToken = this.$store.getters.getToken
      this.$store.dispatch('sendRate', { userToken, placeId, rate })
      this.alreadyRates = true
    }
  },
  created () {
    if (this.$store.getters.authedUser) {
      const placeId = this.$store.getters.getPlaceID
      const userPlaces = this.$store.getters.authedUser.places
      const check = userPlaces.find(place => place._id === placeId)
      if (check !== undefined) {
        this.userRating = check.rating
        this.alreadyRates = true
      } else this.alreadyRates = false
    }
  }
}

</script>

<style scoped>

</style>
