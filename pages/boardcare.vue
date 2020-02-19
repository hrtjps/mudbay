<template>
  <div class="boardcare">
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
    <section class="boardcare--header section">
      <div class="container">
        <div class="columns is-multiline">
          <div class="column is-12">
            <h3 class="is-size-4">{{story.content.sectiontitle}}</h3>
          </div>
          <div class="column is-12">
            <div v-html="story.content.boardcaredescription.content"></div>
          </div>
        </div>
      </div>
    </section>
    <section class="boardcare--lower">
      <div class="container">
        <div class="columns is-multiline is-mobile" v-editable="story.content.boardcarediagram[0]">
            <div class="column is-12">
              <img :src="story.content.boardcarediagram[0].image" alt="">
            </div>
            <div class="column is-3-desktop is-6-mobile">
              <p>{{story.content.boardcarediagram[0].descriptionone}}</p>
            </div>
            <div class="column is-5-desktop is-6-mobile">
              <p>{{story.content.boardcarediagram[0].descriptiontwo}}</p>
            </div>
            <div class="column is-8 is-offset-4">
              <p>{{story.content.boardcarediagram[0].descriptionthree}}</p>
            </div>
            <div class=" is-hidden-mobile boardcare--lower__arrow_one">
              <img src="~/assets/img/board_care_arrow_one.svg" alt="">
            </div>
            <div class="is-hidden-mobile boardcare--lower__arrow_two">
              <img src="~/assets/img/board_care_arrow_two.svg" alt="">
            </div>
            <div class="is-hidden-mobile boardcare--lower__arrow_three">
              <img src="~/assets/img/board_care_arrow_three.svg" alt="">
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
    return context.app.$storyapi.get(`cdn/stories/boardcare`, {
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
