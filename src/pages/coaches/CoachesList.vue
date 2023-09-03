<template>
  <section>Filter</section>
  <section>
    <div class="controls">
      <button>Refresh</button>
      <router-link to="/register">Register as Coash</router-link>
    </div>
    <ul v-if="hasCoaches">
      <coach-item
        v-for="coach in filteredCoaches"
        :key="coach.id"
        :id="coach.id"
        :first-name="coach.firstName"
				:last-name="coach.lastName"
				:rate="coach.hourlyRate"
				:areas="coach.areas"
      />
    </ul>
    <h3 v-else>Coaches not found.</h3>
  </section>
</template>

<script>
import CoachItem from '../../components/coaches/CoachItem.vue';

export default {
  components: {
    CoachItem,
  },

  computed: {
    hasCoaches() {
      return this.$store.getters['coaches/hasCoaches'];
    },
    filteredCoaches() {
      return this.$store.getters['coaches/coaches'];
    },
  },
};
</script>

<style scoped>
ul {
  list-style: none;
  margin: 0;
  padding: 0;
}

.controls {
  display: flex;
  justify-content: space-between;
}
</style>
