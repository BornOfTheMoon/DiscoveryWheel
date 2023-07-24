<template>
  <div class="w-5/6 flex justify-center py-12 mb-12">
    <AuthUserBoard
      :first-name="siteUserData.firstname"
      :last-name="siteUserData.lastname"
      :username="siteUserData.username"
      :user-places="siteUserData.places">
    </AuthUserBoard>
  </div>
</template>

<script>
import AuthUserBoard from '@/components/AuthUserBoard'
export default {
  name: 'AuthUserBoardView',
  components: { AuthUserBoard },
  data () {
    return {
      loading: 'true',
      siteUserData: {
        firstname: 'bar',
        lastname: 'bar',
        username: 'bar',
        places: []
      }
    }
  },
  async created () {
    this.loading = true
    this.siteUserData = await this.$store.getters.authedUser
    this.loading = false
  }
}
</script>

<style scoped>

</style>
