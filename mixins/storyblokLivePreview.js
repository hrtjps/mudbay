export default {
  mounted() {
    this.$storybridge.on(['published', 'change'], (event)=>{
      if(!event.slugChanged) {
        this.$nuxt.$router.go({
          path: this.$nuxt.$router.currentRoute,
          force: true
        })
      }
    })
  }
}