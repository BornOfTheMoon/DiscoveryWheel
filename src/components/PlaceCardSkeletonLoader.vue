<template>
  <div class="w-2/3 shadow-md
              flex flex-col lg:flex-row justify-between
              bg-white rounded-2xl my-12 ">

    <div class="lg:w-1/2 pt-4 lg:p-8 flex flex-col text-center justify-around">
        <v-skeleton-loader
          class="rounded-2xl w-11/12 self-center"
          type="image"
        ></v-skeleton-loader>

      <v-skeleton-loader type="list-item" class="py-4"></v-skeleton-loader>
      <hr>
      <v-skeleton-loader type="list-item" class="py-4"></v-skeleton-loader>
      <hr>
    </div>

    <div class="lg:w-1/2 flex flex-col justify-around lg:p-8 text-center lg:text-left">
      <v-skeleton-loader type="list-item" class="text-2xl"></v-skeleton-loader>
      <hr>
      <v-skeleton-loader type="paragraph" class="py-2 px-4"></v-skeleton-loader>
      <hr>
      <v-skeleton-loader type="list-item"></v-skeleton-loader>
    </div>
  </div>

</template>

<script>
export default {
  name: 'PlaceCardSkeletonLoader'
}
</script>

<style scoped>

</style>
