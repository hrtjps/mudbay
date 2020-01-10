<template>
  <div class="index">
    <section style="margin-top: -179px;" class="index-hero-section" v-editable="story.content">
      <b-carousel
        v-model="carousel"
        :animated="animated"
        :autoplay="autoPlay"
        :arrow="arrow"
        :arrow-both="arrowBoth"
        :arrow-hover="arrowHover"
        :pause-hover="pauseHover"
        :pause-info="pauseInfo"
        :indicator="indicator"
        :interval="interval"
      >
        <b-carousel-item v-for="(carousel, i) in story.content.HeroSection" :key="i" v-editable="carousel">
          <section :class="`hero index-hero is-fullheight ${carousel.class}`">
            <div class="hero-body">
              <div class="container">
                <div class="hero-content has-text-white">
                  <h2 class="is-size-6">{{ carousel.subtitle }}</h2>
                  <h1>{{ carousel.title }}</h1>
                  <h5 class="is-size-5-tablet is-size-6-mobile">{{ carousel.description }}</h5>
                  <a href="#">EXPLORE ></a>
                </div>
              </div>
            </div>
          </section>
        </b-carousel-item>
      </b-carousel>
    </section>
    <!-- END INDEX HERO SECTION -->
    <!-- FEATURED PRODUCTS SECTION -->
    <section class="index--featured-products section">
      <div class="container">
        <div class="columns is-multiline">
          <div class="column is-12">
            <h3 class="is-size-4">
              OUR FEATURED PRODUCTS >
              <span class="is-class-6">SEE ALL</span>
            </h3>
          </div>
          <div class="column is-6-tablet is-3-fullhd" v-editable="product" 
            v-for="(product, key) in story.content.ProductSection" :key="key">
            <div class="card product-img" :id="product.id"
              :style="{'background-image': 'url(' + product.image + ')'}"
             >
              <div class="card-content">
                <a href="#">LEARN MORE ></a>
                <h1 class="is-size-4-tablet is-size-3-desktop">{{ product.title }}</h1>
                <p class="is-size-6">{{ product.content }}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
    <!-- END FEATURED PRODUCTS SECTION -->
    <!-- MISSION SECTION -->
    <section class="index--mission section">
      <div class="container">
        <div class="columns">
          <div class="column is-12">
            <h1>OUR MISSION</h1>
            <p class="is-size-5-tablet is-size-6-mobile"
              v-editable="item" v-for="(item, key) in story.content.OurMissionSection" :key="key"
            >
              {{item.mission}}
            </p>
          </div>
        </div>
      </div>
    </section>
    <!-- END MISSION SECTION -->
    <!-- ABOUT SECTION -->
    <section class="index--about">
      <div class="container is-fluid has-background-success">
        <div class="columns is-multiline" v-editable="story.content.AboutThePeopleSection[0]">
          <div class="column is-7">
            <h1>ABOUT THE PEOPLE</h1>
            <p class="is-size-5-tablet is-size-6-mobile"               >
              {{story.content.AboutThePeopleSection[0].aboutPeople}}
            </p>
            <a href="#" class="is-size-4">READ OUR FULL STORY ></a>
          </div>
          <div class="column is-5">
            <img :src="story.content.AboutThePeopleSection[0].image" alt />
          </div>
        </div>
      </div>
    </section>
    <div class="container is-fluid index-calculator">
      <div class="columns">
        <div class="column is-12 has-text-centered">
          <h1>
            <a href="#">TRY OUR ONLINE CALCULATOR ></a>
          </h1>
        </div>
      </div>
    </div>
    <!-- END ABOUT SECTION -->
    <!-- INSTAGRAM SECTION -->
    <section class="index--instagram">
      <div class="container">
        <div class="columns is-multiline">
          <div class="column is-12 has-text-centered">
            <h4 class="is-size-3">SEE WHAT WE’RE UP TO</h4>
          </div>
          <div class="column is-3">
            <!-- REPLACE WITH GRIDDED API -->
          </div>
          <div class="column is-3">
            <!-- REPLACE WITH GRIDDED API -->
          </div>
          <div class="column is-3">
            <!-- REPLACE WITH GRIDDED API -->
          </div>
          <div class="column is-3">
            <!-- REPLACE WITH GRIDDED API -->
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
    carousel: 0,
    animated: "fade",
    arrow: false,
    arrowBoth: false,
    arrowHover: false,
    autoPlay: true,
    pauseHover: false,
    pauseInfo: false,
    indicator: false,
    interval: 3000,
  }),
  mixins: [storyblockLivePreview],
  asyncData(context) {
    let version = context.query._storyblock || context.isDev ? "draft" : "published";
    return context.app.$storyapi.get(`cdn/stories/home`, {
        version: version
      })
      .then(res => {
        console.log(res.data.story.content.AboutThePeopleSection);
        return res.data;
      })
      .catch(res => {
        context.error({
          statusCode: res.response.status,
          message: res.response.data
        });
      });
  }
};
</script>
