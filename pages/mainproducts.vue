<template>
  <div class="products">
    <section class="hero is-fullheight products-hero">
      <div class="hero-body">
        <div class="container">
          <div class="hero-content has-text-white has-text-centered">
            <h2 class="is-size-6">CHILKAT VALLEY TREES IN HAINES, ALASKA</h2>
            <h1>QUALITY TIMBER PRODUCTS</h1>
          </div>
        </div>
      </div>
    </section>
    <section class="products--offer section">
      <div class="container">
        <div class="columns">
          <div class="column is-12 has-text-white">
            <h3 class="is-size-4">TIMBER PRODUCTS <span>></span></h3>
            <p>We offer Rough-Cut Lumber, Timber-Frame Timbers, Siding Boards, hand-selected Wood for Woodworkers, Birch Boards, Slabs, and Mill-Run Firewood.</p>
            <p>Our trees include Spruce, Hemlock, Cottonwood, and Birch. Each species has its own unique characteristics and we are happy to help ensure you have the right species to suit your unique needs.</p>
            <p>For more information, visit our  <a href="#">TOOL CHEST</a> for species information and description.
            </p>
          </div>
        </div>
      </div>
  </section>
  <section class="products--products-list section">
      <div class="container">
        <div class="columns is-multiline">
          <div class="column is-12-tablet is-6-desktop is-4-widescreen" v-for='products in products' :key="products.id">
            <nuxt-link
              :to="{name: 'products-id', params: {id: products.id}}"
              :key="products.id">
            <div class="card" :id="products.id">
              <div class="card-content">
                <h1 class="is-size-3">{{products.title}}</h1>
                <p>{{products.content}}</p>
              </div>
            </div>
          </nuxt-link>
          </div>
        </div>
      </div>
  </section>
</div>
</template>

<script>
export default {
  computed: {
    products () {
      return this.$store.state.products.product
    }
  }
}
</script>
