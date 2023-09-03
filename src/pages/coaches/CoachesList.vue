<template>
  <section>Filter</section>
  <section>
    <div class="controls">
      <button>Refresh</button>
      <router-link to="/register">Register as Coash</router-link>
    </div>
    <ul v-if="hasCoaches">
      <li v-for="coach in filteredCoaches" :key="coach.id">
				{{ coach.firstName }}
			</li>
    </ul>
		<h3 v-else>Coaches not found.</h3>
  </section>
</template>

<script>
export default {
  computed: {
    hasCoaches() {
      return this.$store.getters['coaches/hasCoaches'];
    },
		filteredCoaches() {
			return this.$store.getters['coaches/coaches'];
		}
  },
};
</script>
