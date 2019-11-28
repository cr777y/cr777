<template>
  <div class="dashboard-container">
    <div class="dashboard-text">name: {{ user.name }}</div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
  name: 'Dashboard',
  computed: {
    ...mapGetters([
      'user'
    ])
  },
  created() {
    console.log('created')
    if (this.$store.getters.user.user_type === 5) {
      this.getCompanyInfo({ 'audit': 4 })
    }
  },
  methods: {
    getCompanyInfo(data) {
      this.$store.dispatch('enterprise/setEnterpriseInfo', data)
    }
  }
}
</script>

<style lang="scss" scoped>
.dashboard {
  &-container {
    margin: 30px;
  }
  &-text {
    font-size: 30px;
    line-height: 46px;
  }
}
</style>
