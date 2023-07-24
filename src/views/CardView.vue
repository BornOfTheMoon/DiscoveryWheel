<template>
  <div class="w-5/6 lg:w-2/3 place flex justify-center py-12 mb-12">
    <PlaceCard
      :title="placeOptions.title"
      :address="placeOptions.address"
      :description="placeOptions.description"
      :tags="placeOptions.tags"
      :bus_station="placeOptions.bus_station"
      :photo="placeOptions.photo[0]"
      :rating="placeOptions.rating"
    />
  </div>
</template>

<script>
import PlaceCard from '@/components/PlaceCard'
export default {
  name: 'CardView',
  components: { PlaceCard },
  data () {
    return {
      loading: true,
      placeOptions: {
        title: 'bar',
        address: 'bar',
        description: 'bar',
        bus_station: 'bar',
        rating: null,
        tags: [],
        photo: []
      }
    }
  },
  async created () {
    this.loading = true
    this.placeOptions = await this.$store.getters.lastPlace
    this.loading = false
  }
}
</script>

<style scoped>

</style>
