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
                        <option :value="k1" v-for="(spec, k1) in lengths" :key="k1">{{spec}}’</option>
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
                      <h6 v-if="item.dimension>=0 && item.length>=0 ">${{Math.round(dimensions[item.dimension].prices[item.length]*item.quantity * 100)/100}}</h6>
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
        {thick:1, width:2, prices: [1.11, 1.39, 1.67, 1.95, 2.23, 2.71, 3.02, 3.57, 3.90]},
        {thick:1, width:4, prices: [3.20, 4.00, 4.80, 5.59, 6.39, 7.79, 8.66, 10.26, 11.19]},
        {thick:1, width:6, prices: [4.00, 5.00, 6.00, 7.00, 8.00, 9.90, 11.00, 13.20, 14.40]},
        {thick:1, width:8, prices: [5.33, 6.66, 7.99, 9.32, 10.66, 13.19, 14.65, 17.58, 19.18]},
        {thick:1, width:10, prices: [7.33, 9.16, 11.00, 12.83, 14.66, 17.99, 19.99, 23.82, 25.99]},
        {thick:1, width:12, prices: [8.80, 11.00, 13.20, 15.40, 17.60, 21.60, 24.00, 28.60, 31.20]},
        {thick:2, width:2, prices: [2.66, 3.33, 4.00, 4.66, 5.33, 6.59, 7.33, 8.79, 9.59]},
        {thick:2, width:4, prices: [4.26, 5.33, 6.39, 7.46, 8.52, 10.79, 11.99, 14.65, 15.98]},
        {thick:2, width:6, prices: [6.40, 8.00, 9.60, 11.20, 12.80, 16.20, 18.00, 22.00, 24.00]},
        {thick:2, width:8, prices: [8.53, 10.66, 12.80, 14.93, 17.06, 21.59, 23.99, 29.33, 31.99]},
        {thick:2, width:10, prices: [12.00, 14.99, 17.99, 20.99, 23.99, 29.99, 33.32, 40.32, 43.98]},
        {thick:2, width:12, prices: [14.40, 18.00, 21.60, 25.20, 28.80, 36.00, 40.00, 48.40, 52.80]},
        {thick:4, width:4, prices: [8.53, 10.66, 12.80, 14.93, 17.06, 21.59, 23.99, 29.33, 31.99]},
        {thick:4, width:6, prices: [12.80, 16.00, 19.20, 22.40, 25.60, 32.40, 36.00, 44.00, 48.00]},
        {thick:4, width:8, prices: [17.06, 21.33, 25.59, 29.86, 34.12, 43.19, 47.99, 58.65, 63.98]},
        {thick:4, width:10, prices: [29.33, 36.66, 44.00, 51.33, 58.66, 71.99, 79.99, 95.32, 103.99]},
        {thick:4, width:12, prices: [35.20, 44.00, 52.80, 61.60, 70.40, 86.40, 96.00, 114.40, 124.80]},
        {thick:6, width:6, prices: [19.20, 24.00, 28.80, 33.60, 38.40, 48.60, 54.00, 66.00, 72.00]},
        {thick:6, width:8, prices: [32.00, 40.00, 48.00, 56.00, 64.00, 79.20, 88.00, 105.60, 115.20]},
        {thick:6, width:10, prices: [48.00, 60.00, 72.00, 84.00, 96.00, 117.00, 130.00, 154.00, 168.00]},
        {thick:6, width:12, prices: [52.80, 66.00, 79.20, 92.40, 105.60, 129.60, 144.00, 171.60, 187.20]},
        {thick:8, width:8, prices: [42.66, 53.33, 64.00, 74.66, 85.33, 105.59, 117.33, 140.79, 153.59]},
        {thick:8, width:10, prices: [69.33, 86.66, 103.99, 121.32, 138.65, 167.98, 186.65, 219.98, 239.98]},
        {thick:8, width:12, prices: [76.80, 96.00, 115.20, 134.40, 153.60, 187.20, 208.00, 246.40, 268.80]},
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
          val += this.dimensions[item.dimension].prices[item.length]*item.quantity
        }        
      });
      return Math.round(val*100)/100;
    }
  }

}
</script>
