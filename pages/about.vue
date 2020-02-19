<template>
  <div class="about">
    <section class="hero is-fullheight about-hero"
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
    <section class="about--main-content">
      <div class="container">
        <div class="columns is-multiline">
          <div class="columns is-multiline" v-for="(item, key) in story.content.items" :key="key"
            :style="key%2===1?{'flex-direction':'row-reverse'}:null"
            v-editable="item"
          >
            <div class="column is-12-tablet is-half-desktop about--main-content__item-img"
              :style="{'background': 'url(' + item.image + ')'}"
            >
            <img :src="item.triangle" alt="" :style="key%2===1?{'left':'0', 'right':'unset'}:null">
            </div>
            <div class="column is-12-tablet is-half-desktop about--main-content__description"
              :style="{'background-color': item.bgColor.color}"
            >
                <h2>{{item.title}}</h2>
                <div v-html="item.content.content"></div>
            </div>
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
    return context.app.$storyapi.get(`cdn/stories/about`, {
        version: version,
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
