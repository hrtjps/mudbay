<template>
  <div class="about">
    <section class="hero is-fullheight about-hero" v-editable="story.content.Hero[0]" >
      <div class="hero-body">
        <div class="container">
          <div class="hero-content has-text-white has-text-centered">
            <h2 class="is-size-6">THE PEOPLE BEHIND</h2>
            <h1>MUD BAY LUMBER CO</h1>
          </div>
        </div>
      </div>
    </section>
    <section class="about--main-content">
      <div class="container">
        <div class="columns is-multiline">
          <div class="columns is-multiline" v-for="(item, key) in story.content.items" :key="key"
            :style="key%2===1?{'flex-direction':'row-reverse', 'display': 'flex'}:null"
            v-editable="item"
          >
            <div class="column is-half about--main-content item-img"
              :style="{'background': 'url(' + item.image + ')'}"
            >
            </div>
            <div class="column is-half about--main-content"
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

<style lang="css" scoped>
</style>
