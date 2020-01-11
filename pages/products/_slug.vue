<template>
  <div class="single-product" v-editable="story.content">
    <section class="hero is-fullheight product-hero-img"
      :style="{'background-image': 'url(' + story.content.hero + ')'}"
    >
      <div class="hero-body">
        <div class="container">
          <div class="hero-content has-text-white has-text-centered">
            <h2 class="is-size-6">{{story.content.subheader}}</h2>
            <h1>{{story.content.header}}</h1>
          </div>
        </div>
      </div>
    </section>
    <section class="single-product--content section">
      <div class="container">
        <div class="columns is-multiline">
          <div class="column is-12">
            <h3 class="is-size-4">{{story.content.header}}</h3>
          </div>
          <div class="column is-12-tablet is-6-desktop single-product--content__leftside">
            <img :src="story.content.mainimg" alt="">
            <div class="columns is-mobile">
              <div class="column is-3">
                <img :src="story.content.lowerimgOne" alt="">
              </div>
              <div class="column is-3">
                <img :src="story.content.lowerimgTwo" alt="">
              </div>
            </div>
          </div>
          <div class="column is-12-tablet is-6-desktop single-product--content__rightside">
            <p>{{story.content.productDescriptionOne}}</p>
            <p>{{story.content.productDescritionTwo}}</p>
            <p>{{story.content.productDescritionThree}}</p>
            <p>{{story.content.tip}}</p>
            <p>Browse Our Product Variations Below</p>
            <p>Contact Mud Bay Lumber Co. for Availability</p>
            <h5>Rough Cut Full Dimensions</h5>
            <h6>Species: <span>{{story.content.species}}</span></h6>
            <h6>Dimension: <span>(Will List Data Here from Spreadsheet)</span></h6>
            <h6>Length: <span>(Will List Standard Lengths) <br>Contact us for Custom Cuts</span></h6>


            <h5>Rough Cut Yard Dimensions</h5>
            <h6>Species: <span>{{story.content.species}}</span></h6>
            <h6>Dimension: <span>(Will List Data Here from Spreadsheet)</span></h6>
            <h6>Length: <span>(Will List Standard Lengths) <br>Contact us for Custom Cuts</span></h6>
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
    return context.app.$storyapi.get(`cdn/stories/products/${context.params.slug}`, {
        version: version,
        cv: context.store.state.cacheVersion
      })
      .then(res => {
        return {...res.data, id:context.params.slug};
      })
      .catch(res => {
        context.error({
          statusCode: res.response.status,
          message: res.response.data
        });
      });
  }
}
</script>
