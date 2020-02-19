<template>
  <div :class="`single-product ${story.content.idOne}`" v-editable="story.content">
    <section class="hero is-fullheight product-hero-img"
      :style="{'background-image': 'url(' + story.content.hero + ')'}"
    >
      <div class="hero-body">
        <div class="container">
          <div class="hero-content has-text-white has-text-centered">
            <h2 class="is-size-6" data-aos="fade-in"  data-aos-easing="linear" data-aos-duration="1000">{{story.content.subheader}}</h2>
            <h1 data-aos="fade-in" data-aos-easing="linear" data-aos-duration="1500">{{story.content.header}}</h1>
          </div>
        </div>
      </div>
    </section>
    <section class="single-product--content section">
      <div class="container">
        <div class="columns is-multiline">
          <div class="column is-12">
            <h3 class="is-size-4">{{story.content.titleHeader}}</h3>
          </div>
          <div class="column is-12-tablet is-6-desktop single-product--content__leftside">
            <img :src="story.content.mainimg" data-aos="fade-up" data-aos-offset="400" data-aos-duration="800" alt="">
            <div class="columns is-mobile">
              <div class="column is-3" data-aos="fade-up" data-aos-offset="400" data-aos-duration="800">
                <img :src="story.content.lowerimgOne" alt="">
              </div>
              <div class="column is-3" data-aos="fade-up" data-aos-offset="400" data-aos-duration="800">
                <img :src="story.content.lowerimgTwo" alt="">
              </div>
            </div>
          </div>
          <div class="column is-12-tablet is-6-desktop single-product--content__rightside" data-aos="fade-right" data-aos-offset="400" data-aos-duration="800">
            <div class="product-description" v-html="story.content.productDescription.content"></div>
            <p><strong>{{story.content.tip}}</strong></p>
            <p class="product-variations">{{story.content.productDescriptionTwo}}</p>
            <p class="contact"><a href="/quote">{{story.content.contact}}</a></p>
            <h5>{{story.content.productDimensionsOne}}</h5>
            <h6>{{story.content.speciesOne}} <span>{{story.content.productDescriptionSpecies}}</span> </h6>
            <h6>{{story.content.grade}} <span>{{story.content.gradeDescription}}</span> </h6>
            <h6>{{story.content.dimensionOne}} <span>{{story.content.productDescriptionDimension}}</span> </h6>
            <h6>{{story.content.lengthOne}} <span>{{story.content.productDescriptionLength}}</span> </h6>


            <h5>{{story.content.productDimensionsTwo}}</h5>
            <h6>{{story.content.speciesTwo}} <span>{{story.content.productDescriptionSpeciesTwo}}</span></h6>
            <h6>{{story.content.dimensionTwo}} <span>{{story.content.productDescriptionDimensionTwo}}</span></h6>
            <h6>{{story.content.lengthTwo}} <span>{{story.content.productDescriptionLengthTwo}}</span></h6>
            <h6 class="custom-contact"><a href="/quote">{{story.content.contactCustom}}</a></h6>
          </div>
        </div>
        <div class="columns">
          <div class="column is-12">
          <div class="terms-policies" v-html="story.content.termsPolicies.content"></div>
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
