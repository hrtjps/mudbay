<template>
<div class="quote">
  <section class="hero is-fullheight quote-hero" v-editable="story.content.Hero[0]" :style="{'background-image': 'url(' + story.content.Hero[0].image + ')'}">
    <div class="hero-body">
      <div class="container">
        <div class="hero-content has-text-white has-text-centered">
          <h2 class="is-size-6">{{story.content.Hero[0].subtitle}}</h2>
          <h1>{{story.content.Hero[0].title}}</h1>
        </div>
      </div>
    </div>
  </section>

  <section class="quote--header" v-editable="story.content">
    <div class="container">
      <div class="columns">
        <div class="column is-12 has-text-white">
          <h3 class="is-size-4">
            WELCOME TO OUR ONLINE QUOTE CALCULATOR!
          </h3>
          <div v-html="story.content.quoteHeader.content"></div>
        </div>
      </div>
    </div>
  </section>

  <section class="quote--rough-cut-full">
    <div class="container">
      <div class="columns is-multiline">
        <div class="column is-12">
          <b-collapse class="card" v-for="(collapse, index) of collapses" :key="index" :open="isOpen == index" @open="isOpen = index">
            <div slot="trigger" slot-scope="props" class="card-header" role="button">
              <p class="card-header-title">
                {{ collapse.title }}
              </p>
              <a class="card-header-icon">
                <b-icon :icon="props.open ? 'menu-down' : 'menu-up'">
                </b-icon>
              </a>
            </div>
            <div class="card-content">
              <div class="content">
                <div class="column is-12">
                  <div class="columns">
                    <div class="column is-1">
                      <h6>Species</h6>
                    </div>
                    <div class="column is-1">
                      <select>
                        <option value="flint" selected>Flint</option>
                        <option value="silver">Silver</option>
                      </select>
                    </div>
                    <div class="column is-1">
                      <h6>Dimension:</h6>
                    </div>
                    <div class="column is-1">
                      <select>
                        <option value="flint" selected>Flint</option>
                        <option value="silver">Silver</option>
                      </select>
                    </div>
                    <div class="column is-1">
                      <h6>Length:</h6>
                    </div>
                    <div class="column is-1">
                      <select>
                        <option value="flint" selected>Flint</option>
                        <option value="silver">Silver</option>
                      </select>
                    </div>
                    <div class="column is-1">
                      <h6>Quantity:</h6>
                    </div>
                    <div class="column is-2">
                      <b-field>
                        <b-numberinput v-model="number"></b-numberinput>
                      </b-field>
                    </div>
                    <div class="column 1">
                      <h6>Price</h6>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </b-collapse>
        </div>
      </div>
    </div>
  </section>
</div>
</template>

<script>
import storyblokLivePreview from "@/mixins/storyblokLivePreview";

export default {
  data() {
    return {
      story: {
        content: {}
      },
      number: 1,
      isOpen: 0,
      collapses: [{
          title: 'Rough Cut Full Dimensions',
        },
        {
          title: 'Title 2',
          text: 'Text 2'
        },
        {
          title: 'Title 3',
          text: 'Text 3'
        }
      ]
    }
  },
  mixins: [storyblokLivePreview],
  asyncData(context) {
    let version = context.query._storyblock || context.isDev ? "draft" : "published";
    return context.app.$storyapi.get(`cdn/stories/quote`, {
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
