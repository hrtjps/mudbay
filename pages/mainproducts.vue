<template>
  <div class="products" >
    <section
      v-editable="story.content"
      class="hero is-fullheight products-hero"
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
    <section class="products--offer section" v-editable="story.content">
      <div class="container">
        <div class="columns">
          <div class="column is-12 has-text-white">
            <h3 class="is-size-4">
              TIMBER PRODUCTS
              <span>></span>
            </h3>
            <div v-html="story.content.timberProductsDescription.content"></div>
          </div>
        </div>
      </div>
    </section>
    <section class="products--products-list section">
      <div class="container">
        <div class="columns is-multiline">
          <div
            class="column is-12-tablet is-6-desktop is-4-widescreen"
            v-for="product in products"
            :key="product.id"
          >
            <nuxt-link :to="'/products/' + product.slug" :key="product.id">
              <div class="card product-item-card-img"
                :style="{'background': 'url(' + product.content.cardImg + ')'}"
                v-editable="product.content">
                <div class="card-content">
                  <h1 class="is-size-3">{{product.content.title}}</h1>
                  <p>{{product.content.content}}</p>
                </div>
                <h1 style="text-transform: uppercase; font-family: Davish; color:white; font-size:5.75rem; position:absolute; top:35%; width:100%; text-align:center" >{{product.content.soon}}</h1>
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
    products: [],
  }),
  mixins: [storyblockLivePreview],
  async asyncData(context) {
    let version =
      context.query._storyblock || context.isDev ? "draft" : "published";
      let data = await context.app.$storyapi
      .get(`cdn/stories/mainproducts`, {
        version: version,
      })
      .then(res => {
        return res.data
      })
      .catch(res => {
        context.error({
          statusCode: res.response.status,
          message: res.response.data
        });
      });
      let p= await context.app.$storyapi
      .get(`cdn/stories`, {
        version: version,
        starts_with: `products`,
        cv: context.store.state.cacheVersion
      })
      .then(res => {
        return res.data.stories
      })
      .catch(res => {
        context.error({
          statusCode: res.response.status,
          message: res.response.data
        });
      });
      return { story: {content: data.story.content}, products: p};
  },
};
</script>
