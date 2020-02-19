<template>
  <div class="siding-install">
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
    <section class="siding-install--installation section">
      <div class="container">
        <div class="columns">
          <div class="column is-12">
            <h3 class="is-size-4">{{story.content.sectiontitle}}</h3>
          </div>
        </div>
        <div class="columns is-multiline siding-install--installation__stepone" v-editable="story.content.stepone[0]">
          <div class="column is-12-tablet is-5-fullhd is-6-desktop">
            <img :src="story.content.stepone[0].image" alt="">
          </div>
          <div class="column is-12-tablet is-7-fullhd is-6-desktop">
            <h1>{{story.content.stepone[0].header}}</h1>
            <h2>{{story.content.stepone[0].subheader}}</h2>
            <p>{{story.content.stepone[0].instructionsone}}</p>
            <p class="stepone-instructionone">{{story.content.stepone[0].instructionstwo}}</p>
            <p class="stepone-instructiontwo">{{story.content.stepone[0].instructionsthree}}</p>
          </div>
          <img  class="stepone-arrow is-hidden-touch" src="~/assets/img/stepone_arrow.svg" alt="">
        </div>
        <div class="columns is-multiline siding-install--installation__steptwo" v-editable="story.content.stepone[1]">
          <div class="column is-12-tablet is-6-desktop is-5-fullhd">
            <img :src="story.content.stepone[1].image" alt="">
          </div>
          <div class="column is-12-tablet is-6-desktop is-7-fullhd">
            <h1>{{story.content.stepone[1].header}}</h1>
            <h2>{{story.content.stepone[1].subheader}}</h2>
            <p>{{story.content.stepone[1].instructionsone}}</p>
            <p class="steptwo-instructionone">{{story.content.stepone[1].instructionstwo}}</p>
            <p class="steptwo-instructiontwo">{{story.content.stepone[1].instructionsthree}}</p>
          </div>
          <img class="steptwo-arrow is-hidden-touch" src="~/assets/img/steptwo_arrow.svg" alt="">
          <img class="steptwo-arrow-two is-hidden-touch" src="~/assets/img/steptwo_arrow_two.svg" alt="">
        </div>
        <div class="columns is-multiline siding-install--installation__stepthree" v-editable="story.content.stepone[2]">
          <div class="column is-12-tablet is-6-desktop is-5-fullhd">
            <img :src="story.content.stepone[2].image" alt="">
          </div>
          <div class="column is-12-tablet is-6-desktop is-7-fullhd stepthree">
            <h1>{{story.content.stepone[2].header}}</h1>
            <h2>{{story.content.stepone[2].subheader}}</h2>
            <p>{{story.content.stepone[2].instructionsone}}</p>
            <p>{{story.content.stepone[2].instructionstwo}}</p>
            <p>{{story.content.stepone[2].protip}}</p>
            <p>{{story.content.stepone[2].instructionsfour}}</p>
          </div>
        </div>
        <div class="columns is-multiline siding-install--installation__stepfour" v-editable="story.content.stepone[3]">
          <div class="column is-12-tablet is-6-desktop is-5-fullhd">
            <img :src="story.content.stepone[3].image" alt="">
          </div>
          <div class="column is-12-tablet is-6-desktop is-7-fullhd">
            <h1>{{story.content.stepone[3].header}}</h1>
            <h2>{{story.content.stepone[3].subheader}}</h2>
            <div class="step-four-description" v-html="story.content.stepone[3].stepfour.content"></div>
          </div>
        </div>
        <div class="columns is-multiline siding-install--installation__stepfive" v-editable="story.content.stepone[4]">
          <div class="column is-12-tablet is-6-desktop is-5-fullhd">
            <img :src="story.content.stepone[4].image" alt="">
          </div>
          <div class="column is-12-tablet is-6-desktop is-7-fullhd">
            <h1>{{story.content.stepone[4].header}}</h1>
            <h2>{{story.content.stepone[4].subheader}}</h2>
            <div class="step-five-description" v-html="story.content.stepone[4].stepfive.content"></div>
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
    return context.app.$storyapi.get(`cdn/stories/sidinginstall`, {
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
