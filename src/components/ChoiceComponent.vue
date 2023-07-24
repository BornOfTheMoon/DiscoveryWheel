<template>
  <PlaceCardSkeletonLoader v-if="loading"></PlaceCardSkeletonLoader>
  <div v-else class="card w-64 md:w-96 xl:w-128 bg-green-400 py-4 xl:py-6 rounded-2xl flex flex-col items-center">
    <select
      name="placepicker"
      id="place"
      v-model="selected"
      class="w-11/12 bg-white bg-opacity-30"
    >
      <option
        v-bind:value="option.value"
        v-for="option in options"
        :key="option.id"
      >
        {{option.text}}
      </option>
    </select>
    <button
      class="button w-2/3 mt-4 xl:mt-6 py-2 px-3 font-bold text-white rounded-lg"
      style="background: #5381b8"
      @click="handleSearch"
    >
        Начать поиск
    </button>

    <v-snackbar
      v-model="snackbar"
      :multi-line="multiLine"
      min-width="260"

    >
      {{notSelectedExceptionMessage}}
      <template>
        <v-btn
          plain
          text
          :disabled="button_disabled"
          style="color: #60c5fc"
          @click="snackbar = false"
        >
          Закрыть
        </v-btn>
      </template>
    </v-snackbar>
  </div>
</template>

<script>
import PlaceCardSkeletonLoader from '@/components/PlaceCardSkeletonLoader'

export default {
  components: { PlaceCardSkeletonLoader },
  name: 'ChoiceComponent',
  data () {
    return {
      loading: false,
      selected: null,
      options: [
      ],
      notSelectedExceptionMessage: 'Чтобы осуществить поиск, выберите категорию.',
      multiLine: true,
      snackbar: false,
      button_disabled: false
    }
  },
  methods: {
    async handleSearch () {
      if (!this.selected) {
        this.snackbar = true
        return
      }
      this.loading = true
      await this.$store.dispatch('getPlace', this.selected)
        .then(() => this.$router.push('/place'))
        .catch(e => console.log(e))
      this.loading = false
      this.selected = null
      this.snackbar = false
    }
  },
  async created () {
    await this.$http.get('/generator/categories')
      .then(res => {
        this.options = res.data
      })
      .catch(e => console.log(e))
  }
}
</script>

<style scoped>

</style>
