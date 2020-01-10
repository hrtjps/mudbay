<template>

  <div id="app">
    <navigation />
    <nuxt />
    <mudbayfooter />
  </div>
</template>

<script>
import navigation from '~/components/navigation.vue'
import mudbayfooter from '~/components/mudbayfooter.vue'

export default {
  components: {
    navigation,
    mudbayfooter
  }
}
</script>
