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
                <div class="column is-12" v-for="(item, key) in collapse.species" :key="key">
                  <div class="columns">
                    <div class="column is-1">
                      <h6>Species</h6>
                    </div>
                    <div class="column is-1">
                      <select v-model="item.species">
                        <option value="" disabled>Select an Option</option>
                        <option :value="spec" v-for="(spec, k1) in constSpecies" :key="k1">{{spec}}</option>
                      </select>
                    </div>
                    <div class="column is-1">
                      <h6>Dimension:</h6>
                    </div>
                    <div class="column is-1">
                      <select v-model="item.dimension">
                        <option :value="-1" disabled>Select an Option</option>
                        <option :value="k1" v-for="(d, k1) in dimensions" :key="k1">{{d.thick}}x{{d.width}}</option>
                      </select>
                    </div>
                    <div class="column is-1">
                      <h6>Length:</h6>
                    </div>
                    <div class="column is-1">
                      <select v-model="item.length">
                        <option :value="-1" disabled>Select an Option</option>
                        <option :value="spec" v-for="(spec, k1) in lengths" :key="k1">{{spec}}’</option>
                      </select>
                    </div>
                    <div class="column is-1">
                      <h6>Quantity:</h6>
                    </div>
                    <div class="column is-2">
                      <b-field>
                        <b-numberinput v-model="item.quantity"></b-numberinput>
                      </b-field>
                    </div>
                    <div class="column 1">
                      <h6 v-if="item.dimension>=0 && item.length>=0 ">
                        ${{Math.round(dimensions[item.dimension].width * dimensions[item.dimension].thick * item.length * item.quantity / 12 * 100)/100}}
                      </h6>
                    </div>
                  </div>
                </div>
                <div class="column is-12">
                  <div class="columns">
                    <div class="column is-8">
                      <h4>*Please Allow 24-48 Hours for Mud Bay Lumber Co. to Verify Your Quote</h4>
                    </div>
                    <div class="column has-text-right">
                      <h4>Sub-Total: ${{getSubTotal(collapse.species)}}</h4>
                    </div>
                  </div>
                </div>
                <textarea class="column is-12" v-model="collapse.additionalNote" 
                  placeholder="Tell Us Any Additional Notes That May Pertain to Your Project:"
                  rows="8"></textarea>
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
      constSpecies: ['Species 1', 'Species 2'],
      dimensions: [
        {thick:1, width:2},
        {thick:1, width:4},
        {thick:1, width:6},
        {thick:1, width:8},
        {thick:1, width:10},
        {thick:1, width:12},
        {thick:2, width:2},
        {thick:2, width:4},
        {thick:2, width:6},
        {thick:2, width:8},
        {thick:2, width:10},
        {thick:2, width:12},
        {thick:4, width:4},
        {thick:4, width:6},
        {thick:4, width:8},
        {thick:4, width:10},
        {thick:4, width:12},
        {thick:6, width:6},
        {thick:6, width:8},
        {thick:6, width:10},
        {thick:6, width:12},
        {thick:8, width:8},
        {thick:8, width:10},
        {thick:8, width:12},
      ],
      lengths: [8, 10, 12, 14, 16, 18, 20, 22, 24],
      collapses: [{
          title: 'Rough Cut Full Dimensions',
          species: [
            {species: '', dimension: -1, length: -1, quantity: 0, price: 0},
            {species: '', dimension: -1, length: -1, quantity: 0, price: 0},
            {species: '', dimension: -1, length: -1, quantity: 0, price: 0},
            {species: '', dimension: -1, length: -1, quantity: 0, price: 0},
            {species: '', dimension: -1, length: -1, quantity: 0, price: 0},
            {species: '', dimension: -1, length: -1, quantity: 0, price: 0},
            {species: '', dimension: -1, length: -1, quantity: 0, price: 0},
            {species: '', dimension: -1, length: -1, quantity: 0, price: 0},
          ],
          additionalNote: ''
        },
        {
          title: 'Title 2',
          species: [
            {species: '', dimension: -1, length: -1, quantity: 0, price: 0},
            {species: '', dimension: -1, length: -1, quantity: 0, price: 0},
            {species: '', dimension: -1, length: -1, quantity: 0, price: 0},
            {species: '', dimension: -1, length: -1, quantity: 0, price: 0},
            {species: '', dimension: -1, length: -1, quantity: 0, price: 0},
            {species: '', dimension: -1, length: -1, quantity: 0, price: 0},
            {species: '', dimension: -1, length: -1, quantity: 0, price: 0},
            {species: '', dimension: -1, length: -1, quantity: 0, price: 0},
          ],
          additionalNote: '',
          text: 'Text 2'
        },
        {
          title: 'Title 3',
          species: [
            {species: '', dimension: -1, length: -1, quantity: 0, price: 0},
            {species: '', dimension: -1, length: -1, quantity: 0, price: 0},
            {species: '', dimension: -1, length: -1, quantity: 0, price: 0},
            {species: '', dimension: -1, length: -1, quantity: 0, price: 0},
            {species: '', dimension: -1, length: -1, quantity: 0, price: 0},
            {species: '', dimension: -1, length: -1, quantity: 0, price: 0},
            {species: '', dimension: -1, length: -1, quantity: 0, price: 0},
            {species: '', dimension: -1, length: -1, quantity: 0, price: 0},
          ],
          additionalNote: '',
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
  },
  methods: {
    getSubTotal(specs) {
      let val = 0;
      specs.forEach(item => {
        if(item.dimension>=0 && item.length>=0) {
          val += this.dimensions[item.dimension].width * this.dimensions[item.dimension].thick * item.length * item.quantity / 12
        }        
      });
      return Math.round(val*100)/100;
    }
  }

}
</script>
