<template>
  <div class="products" v-editable="story.content">
    <section class="hero is-fullheight products-hero"
      :style="{'background-image': 'url(' + story.content.image + ')'}"
    >
      <div class="hero-body">
        <div class="container">
          <div class="hero-content has-text-white has-text-centered">
            <h2 class="is-size-6">{{story.content.subtitle}}</h2>
            <h1>{{story.content.title}}</h1>
          </div>
        </div>
      </div>
    </section>
    <section class="products--offer section">
      <div class="container">
        <div class="columns">
          <div class="column is-12 has-text-white">
            <h3 class="is-size-4">TIMBER PRODUCTS <span>></span></h3>
            <div v-html="story.content.timberProductsDescription.content"></div>
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
import storyblockLivePreview from "@/mixins/storyblokLivePreview";

export default {
  data: () => ({
    story: { content: {} },
  }),
  mixins: [storyblockLivePreview],
  asyncData(context) {
    let version = context.query._storyblock || context.isDev ? "draft" : "published";
    return context.app.$storyapi.get(`cdn/stories/mainproducts`, {
        version: version
      })
      .then(res => {
        return res.data;
      })
      .catch(res => {
        context.error({
          statusCode: res.response.status,
          message: res.response.data
        });
      });
  },
  computed: {
    products () {
      return this.$store.state.products.product
    }
  }
}
</script>
