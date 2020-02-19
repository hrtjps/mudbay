<template>
  <div class="process" v-editable="story.content">
    <section class="hero is-fullheight calculator-hero"
      v-editable="story.content.Hero[0]"
      :style="{'background-image': 'url(' + story.content.Hero[0].image + ')'}"
    >
      <div class="hero-body">
        <div class="container">
          <div class="hero-content has-text-white has-text-centered">
            <h2 class="is-size-6">{{story.content.Hero[0].subtitle}}</h2>
            <h1>{{story.content.Hero[0].title}}</h1>
          </div>
        </div>
      </div>
    </section>
    <section class="the-forest">
      <div class="container">
        <div class="columns is-multiline is-gapless has-text-white">
          <div class="column is-12-tablet is-5-desktop the-forest--left" data-aos="fade-right" data-aos-offset="500" data-aos-duration="1000">
            <img :src="story.content.forest[0].forestimage" alt="">
          </div>
          <div class="column is-12-tablet is-7-desktop the-forest--right" :style="{'background-color': story.content.forest[0].bgcolor.color}">
            <h1 data-aos="fade-in" data-aos-offset="420" data-aos-duration="800" data-aos-easing="ease-in">{{story.content.forest[0].header}}</h1>
            <p data-aos="fade-in" data-aos-offset="440" data-aos-duration="820" data-aos-easing="ease-in">{{story.content.forest[0].forestdescriptionone}}</p>
            <p data-aos="fade-in" data-aos-offset="460" data-aos-duration="840" data-aos-easing="ease-in">{{story.content.forest[0].forestdescriptiontwo}}</p>
          </div>
        </div>
      </div>
    </section>
    <section class="logging">
      <div class="container">
        <div class="columns is-multiline has-text-white">
          <div class="column is-12 is-hidden-desktop">
            <img :src="story.content.logging[0].loggingimagetwo" alt="">
          </div>
          <div class="column is-12 logging-outter" :style="{'background-color': story.content.logging[0].bgcolor.color}">
            <div class="columns is-gapless is-multiline">
              <div class="column is-12-tablet is-6-desktop">
                <h1 data-aos="fade" data-aos-offset="420" data-aos-duration="600" data-aos-easing="ease-in">{{story.content.logging[0].header}}</h1>
                <h3 data-aos="fade" data-aos-offset="440" data-aos-duration="600" data-aos-easing="ease-in">{{story.content.logging[0].subheader}}</h3>
                <div class="logging--descriptionone" data-aos="fade" data-aos-offset="460" data-aos-duration="600" data-aos-easing="ease-in" v-html="story.content.logging[0].descriptionone.content">
                </div>
              </div>
              <div class="column is-12-tablet is-6-desktop logging--imageone" data-aos="flip-right" data-aos-offset="500" data-aos-duration="1000">
                <img :src="story.content.logging[0].loggingimageone" alt="">
              </div>
              <div class="column is-12-tablet is-6-desktop logging--imagetwo is-hidden-touch" data-aos="flip-left" data-aos-offset="300" data-aos-duration="1100">
                <img :src="story.content.logging[0].loggingimagetwo" alt="">
              </div>
              <div class="column is-12-tablet is-6-desktop" data-aos="fade" data-aos-offset="400" data-aos-duration="600" data-aos-easing="ease-in">
                <div class="logging--descriptiontwo" v-html="story.content.logging[0].descriptiontwo.content"></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
    <section class="transport">
      <div class="container">
        <div class="columns is-multiline has-text-white is-gapless">
          <div class="column is-5 transport--left" data-aos="fade-right" data-aos-offset="300" data-aos-duration="800">
            <img :src="story.content.transport[0].transportimageone" alt="">
          </div>
          <div class="column is-6 transport--right" :style="{'background-color': story.content.transport[0].bgcolor.color}">
            <h1 data-aos="fade" data-aos-offset="320" data-aos-duration="800">{{story.content.transport[0].header}}</h1>
            <p data-aos="fade" data-aos-offset="340" data-aos-duration="800">{{story.content.transport[0].descriptionone}}</p>
          </div>
          <div class="column is-12-tablet is-8-desktop transport--imagetwo" data-aos="fade-up" data-aos-offset="300" data-aos-duration="700">
            <img :src="story.content.transport[0].transportimagetwo" alt="">
          </div>
        </div>
      </div>
    </section>
    <section class="milling">
      <div class="container">
        <div class="columns is-multiline has-text-white is-gapless">
          <div class="column is-12-tablet is-6-desktop milling--left" data-aos="fade-down" data-aos-offset="300" data-aos-duration="800">
            <img :src="story.content.milling[0].millingimage" alt="">
          </div>
          <div class="column is-12-tablet is-6-desktop milling--right" :style="{'background-color': story.content.milling[0].bgcolor.color}">
            <h1 data-aos="fade" data-aos-offset="320" data-aos-duration="600">{{story.content.milling[0].header}}</h1>
            <h3 data-aos="fade" data-aos-offset="340" data-aos-duration="620">{{story.content.milling[0].subheader}}</h3>
            <p class="quote" data-aos="fade" data-aos-offset="360" data-aos-duration="640"><strong>{{story.content.milling[0].quote}}</strong></p>
            <div class="milling--description" v-html="story.content.milling[0].description.content" data-aos="fade" data-aos-offset="380" data-aos-duration="660"></div>
          </div>
        </div>
      </div>
    </section>
    <section class="distributing">
      <div class="container">
        <div class="columns is-multiline has-text-white distributing--right">
          <div class="column is-12 is-hidden-desktop">
            <img data-aos="zoom-out-up" :src="story.content.distributing[0].distributingimage" alt="">
          </div>
          <div class="column is-12" :style="{'background-color': story.content.distributing[0].bgcolor.color}">
            <h1 data-aos="fade" data-aos-offset="450" data-aos-duration="780">{{story.content.distributing[0].header}}</h1>
            <h3 data-aos="fade" data-aos-offset="470" data-aos-duration="780">{{story.content.distributing[0].subheader}}</h3>
            <div class="distributing--right__quote" v-html="story.content.distributing[0].quote.content" data-aos="fade" data-aos-offset="490" data-aos-duration="780"></div>
            <div class="distributing--right__description" v-html="story.content.distributing[0].description.content" data-aos="fade" data-aos-offset="510" data-aos-duration="780"></div>
          </div>
        </div>
        <img class="is-hidden-touch" data-aos="zoom-out-up" data-aos-offset="450" data-aos-duration="800" :src="story.content.distributing[0].distributingimage" alt="">
      </div>
    </section>
    <section class="community-footer">
      <div class="container">
        <div class="columns has-text-white">
          <div class="column is-12">
            <p>We are proud to be working to keep Chilkat Valley Trees accessible and affordable for the Haines Community and beyond!</p>
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
    return context.app.$storyapi.get(`cdn/stories/process`, {
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
  }
}
</script>
