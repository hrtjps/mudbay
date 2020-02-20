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

              <a class="card-header-icon">
                <b-icon :icon="props.open ? 'menu-down' : 'menu-up'">
                </b-icon>
              </a>
              <div class="card-header-title">
                <div>{{ collapse.title }}</div>
                <div class="price">Price</div>
              </div>
            </div>
            <div class="card-content">
              <div class="content">
                <div class="cut-item" v-for="(item, key) in collapse.species" :key="key">
                  <div class="property">
                    <div class="property-group" v-if="collapse.title !== 'Board & Batten Siding'">
                      <label>Species: </label>
                      <select v-model="item.species" @change="changeQuantity(item)">
                        <option value="" disabled>Select an Option</option>
                        <option :value="spec" v-for="(spec, k1) in collapse.constSpecies" :key="k1">{{spec}}</option>
                      </select>
                    </div>
                    <div class="property-group" >
                      <label >{{collapse.title !== 'Board & Batten Siding'?"Dimension:":"Species:"}}</label>
                      <select v-model="item.dimension" @change="changeQuantity(item)" v-if="collapse.title !== 'Board & Batten Siding'">
                        <option :value="-1" disabled>Select an Option</option>
                        <option :value="k1" v-for="(d, k1) in collapse.dimensions" :key="k1">{{d.dimension}}</option>
                      </select>
                      <select v-model="item.dimension" @change="changeQuantity(item)" v-if="collapse.title === 'Board & Batten Siding'">
                        <option :value="-1" disabled>Select an Option</option>
                        <option :value="k1" v-for="(d, k1) in collapse.dimensions" :key="k1">{{d.species}}</option>
                      </select>
                    </div>
                    <div class="property-group">
                      <label>Length:</label>
                      <select v-model="item.length" @change="changeQuantity(item)">
                        <option :value="-1" disabled>Select an Option</option>
                        <option :value="k1" v-for="(spec, k1) in lengths" :key="k1">{{spec}}’</option>
                      </select>
                    </div>
                    <div class="property-group">
                      <label>Quantity:</label>
                      <!-- <b-field> -->
                        <b-numberinput v-model="item.quantity" ></b-numberinput>
                      <!-- </b-field> -->
                    </div>
                  </div>
                  <div class="price">
                    <h6 v-if="item.dimension>=0 && item.length>=0 ">${{Math.round(collapse.dimensions[item.dimension].prices[item.length]*item.quantity * 100)/100}}</h6>
                    <h6 v-else>$0</h6>
                  </div>
                </div>
                <div class="cut-item-summary">
                  <div class="result">
                    <div>*Please Allow 24-48 Hours for Mud Bay Lumber Co. to Verify Your Quote</div>
                    <div class="sub-total">Sub-Total: ${{getSubTotal(collapse.species, collapse.dimensions)}}</div>
                  </div>
                  <textarea class="additional-note" v-model="collapse.additionalNote"
                    placeholder="Tell Us Any Additional Notes That May Pertain to Your Project:"
                    rows="8"></textarea>
                </div>
              </div>
            </div>
          </b-collapse>
        </div>
      </div>
    </div>
  </section>

  <section class="quote--contact-form">
    <div class="container">
      <div class="columns is-multiline">
        <div class="column is-12">
          <h3 class="is-size-4">
            Customer Information
          </h3>
          <p>
            Please include your information below before submitting your cut-list to Mud Bay Lumber Co. so you can be contacted with any questions.
            <br>Or you can download your quote below.
          </p>
        </div>
        <div class="column is-4">
          <div class="label">Name</div>
          <div ><input v-model="form.name"></div>
        </div>
        <div class="column is-4">
          <div class="label">Email</div>
          <div ><input v-model="form.email"></div>
        </div>
        <div class="column is-4">
          <div class="label">Phone</div>
          <div ><input v-model="form.phone"></div>
        </div>

        <div class="column is-12">
          <div class="label">What are you building?</div>
          <div ><input v-model="form.building"></div>
        </div>

        <div class="column is-12">
          <div class="label">Does your project have a timeline?</div>
          <div ><input v-model="form.timeline"></div>
        </div>
        <div class="column is-12">
          <recaptcha
            @error="onError"
            @success="onSuccess"
            @expired="onExpired"
            class="recapture"
          />
        </div>
        <div class="column is-12 err-msg" v-if="errorMsg">
          {{errorMsg}}
        </div>
        <div class="form-buttons">
          <button @click="downloadPdf()">DOWNLOAD MY CUT-LIST</button>
          <button @click="submitCutList()">
            {{submitting?"SUBMITTING":"SUBMIT"}} MY CUT-LIST
          </button>
        </div>
        <div class="column is-12 please-note">
          *Please note: This is our best estimation only, please allow 24-48 hours for Mud Bay Lumber Co. to verify your quote should you decide to submit your cut-list.
          <br>
          Should you submit your cut-list, Mud Bay Lumber Co. will contact you with any questions, verifications, availability and deposit.
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
      form: {
        name: '',
        email: '',
        phone: '',
        building: '',
        timeline: ''
      },
      errorMsg:'',
      submitting: false,
      story: {
        content: {}
      },
      number: 1,
      isOpen: 0,
      lengths: [8, 10, 12, 14, 16, 18, 20, 22, 24],
      collapses: [
        {
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
          constSpecies: ['Spruce'],
          dimensions: [
            {dimension: "1 x 2", prices: [1.63, 2.04, 2.45, 2.86, 3.26, 3.98, 4.42, 5.24, 5.71] },
            {dimension: "1 x 4", prices: [3.20, 4.00, 4.80, 5.59, 6.39, 7.79, 8.66, 10.26, 11.19]},
            {dimension: "1 x 6", prices: [4.00, 5.00, 6.00, 7.00, 8.00, 9.90, 11.00, 13.20, 14.40]},
            {dimension: "1 x 8", prices: [5.33, 6.66, 7.99, 9.32, 10.66, 13.19, 14.65, 17.58, 19.18]},
            {dimension: "1 x 10", prices: [7.33, 9.16, 11.00, 12.83, 14.66, 17.99, 19.99, 23.82, 25.99]},
            {dimension: "1 x 12", prices: [8.80, 11.00, 13.20, 15.40, 17.60, 21.60, 24.00, 28.60, 31.20]},
            {dimension: "2 x 2", prices: [2.66, 3.33, 4.00, 4.66, 5.33, 6.59, 7.33, 8.79, 9.59]},
            {dimension: "2 x 4", prices: [4.26, 5.33, 6.39, 7.46, 8.52, 10.79, 11.99, 14.65, 15.98]},
            {dimension: "2 x 6", prices: [6.40, 8.00, 9.60, 11.20, 12.80, 16.20, 18.00, 22.00, 24.00]},
            {dimension: "2 x 8", prices: [8.53, 10.66, 12.80, 14.93, 17.06, 21.59, 23.99, 29.33, 31.99]},
            {dimension: "2 x 10", prices: [12.00, 14.99, 17.99, 20.99, 23.99, 29.99, 33.32, 40.32, 43.98]},
            {dimension: "2 x 12", prices: [14.40, 18.00, 21.60, 25.20, 28.80, 36.00, 40.00, 48.40, 52.80]},
            {dimension: "4 x 4", prices: [8.53, 10.66, 12.80, 14.93, 17.06, 21.59, 23.99, 29.33, 31.99]},
            {dimension: "4 x 6", prices: [12.80, 16.00, 19.20, 22.40, 25.60, 32.40, 36.00, 44.00, 48.00]},
            {dimension: "4 x 8", prices: [17.06, 21.33, 25.59, 29.86, 34.12, 43.19, 47.99, 58.65, 63.98]},
            {dimension: "4 x 10", prices: [29.33, 36.66, 44.00, 51.33, 58.66, 71.99, 79.99, 95.32, 103.99]},
            {dimension: "4 x 12", prices: [35.20, 44.00, 52.80, 61.60, 70.40, 86.40, 96.00, 114.40, 124.80]},
            {dimension: "5 x 5", prices: [13.31, 16.64, 19.97, 23.30, 26.62, 33.70, 37.44, 45.76, 49.92]},
            {dimension: "5 x 7", prices: [18.62, 23.28, 27.94, 32.59, 37.25, 47.14, 52.38, 64.02, 69.84]},
            {dimension: "5 x 9", prices: [30.00, 37.50, 45.00, 52.50, 60.00, 74.25, 82.50, 99.00, 108.00]},
            {dimension: "5 x 12", prices: [44.00, 55.00, 66.00, 77.00, 88.00, 108.00, 120.00, 143.00, 156.00]},
            {dimension: "6 x 6", prices: [19.20, 24.00, 28.80, 33.60, 38.40, 48.60, 54.00, 66.00, 72.00]},
            {dimension: "6 x 8", prices: [32.00, 40.00, 48.00, 56.00, 64.00, 79.20, 88.00, 105.60, 115.20]},
            {dimension: "6 x 10", prices: [44.00, 55.00, 66.00, 77.00, 88.00, 117.00, 130.00, 154.00, 168.00]},
            {dimension: "6 x 12", prices: [52.80, 66.00, 79.20, 92.40, 105.60, 129.60, 144.00, 171.60, 187.20]},
            {dimension: "8 x 8", prices: [42.66, 53.33, 64.00, 74.66, 85.33, 105.59, 117.33, 140.79, 153.59]},
            {dimension: "8 x 10", prices: [63.99, 79.99, 95.99, 111.99, 127.99, 167.98, 186.65, 219.98, 239.98]},
            {dimension: "8 x 12", prices: [76.80, 96.00, 115.20, 134.40, 153.60, 187.20, 208.00, 246.40, 268.80]},
            {dimension: "9 x 9", prices: [54.00, 67.50, 81.00, 94.50, 108.00, 133.65, 135.00, 148.50, 162.00]},
            {dimension: "9 x 12", prices: [86.40, 108.00, 129.60, 151.20, 172.80, 210.60, 216.00, 237.60, 259.20]}
          ],
          additionalNote: ''
        },
        {
          title: 'Rough Cut Yard Dimensions',
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
          constSpecies: ['Spruce'],
          dimensions: [
            {dimension: '1.5 x 3.5', prices: [2.82, 3.52, 4.22, 4.93, 5.63, 7.13, 7.92, 9.68, 10.56]},
            {dimension: '1.5 x 5.5', prices: [4.42, 5.52, 6.62, 7.73, 8.83, 11.18, 12.42, 15.18, 16.56]},
            {dimension: '1.5 x 7.25', prices: [5.82, 7.28, 8.74, 10.19, 11.65, 14.74, 16.38, 20.02, 21.84]},
            {dimension: '1.5 x 9.25', prices: [8.35, 10.44, 12.53, 14.62, 16.70, 20.88, 23.20, 28.07, 30.62]},
            {dimension: '1.5 x 11.25', prices: [10.15, 12.69, 15.23, 17.77, 20.30, 25.38, 28.20, 34.12, 37.22]},
            {dimension: '3.5 x 3.5', prices: [6.53, 8.16, 9.79, 11.42, 13.06, 16.52, 18.36, 22.44, 24.48]},
            {dimension: '3.5 x 5.5', prices: [10.24, 12.80, 15.36, 17.92, 20.48, 25.92, 28.80, 35.20, 38.40]},
            {dimension: '5.5 x 5.5', prices: [16.13, 20.16, 24.19, 28.22, 32.26, 40.82, 45.36, 55.44, 60.48]},

          ],
          additionalNote: ''
        },
        {
          title: 'Timber-Frame Timbers',
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
          constSpecies: ['Spruce'],
          dimensions: [
            {dimension: '3 x 5', prices: [1.25, 1.25, 1.38, 1.50, 10.00, 12.50, 15.00, 17.50, 20.00, 24.75, 27.50, 33.00, 36.00]},
            {dimension: '3 x 7', prices: [1.91, 1.91, 2.10, 2.29, 15.28, 19.10, 22.92, 26.74, 30.56, 37.82, 42.02, 50.42, 55.01]},
            {dimension: '3 x 10', prices: [2.50, 2.75, 3.00, 3.25, 22.00, 27.50, 33.00, 38.50, 44.00, 54.00, 60.00, 71.50, 78.00]},
            {dimension: '3 x 12', prices: [3.00, 3.30, 3.60, 3.90, 26.40, 33.00, 39.60, 46.20, 52.80, 64.80, 72.00, 85.80, 93.60]},
            {dimension: '2 x 4', prices: [0.67, 0.67, 0.73, 0.80, 5.33, 6.66, 7.99, 9.32, 10.66, 13.19, 14.65, 17.58, 19.18]},
            {dimension: '2 x 6', prices: [1.00, 1.00, 1.10, 1.20, 8.00, 10.00, 12.00, 14.00, 16.00, 19.80, 22.00, 26.40, 28.80]},
            {dimension: '2 x 8', prices: [1.33, 1.33, 1.47, 1.60, 10.66, 13.33, 16.00, 18.66, 21.33, 26.39, 29.33, 35.19, 38.39]},
            {dimension: '2 x 10', prices: [1.67, 1.83, 2.00, 2.17, 14.66, 18.33, 21.99, 25.66, 29.32, 35.99, 39.98, 47.65, 51.98]},
            {dimension: '2 x 12', prices: [2.00, 2.20, 2.40, 2.60, 17.60, 22.00, 26.40, 30.80, 35.20, 43.20, 48.00, 57.20, 62.40]},
            {dimension: '4 x 4', prices: [1.33, 1.33, 1.47, 1.60, 10.66, 13.33, 16.00, 18.66, 21.33, 26.39, 29.33, 35.19, 38.39]},
            {dimension: '4 x 6', prices: [2.00, 2.00, 2.20, 2.40, 16.00, 20.00, 24.00, 28.00, 32.00, 39.60, 44.00, 52.80, 57.60]},
            {dimension: '4 x 8', prices: [2.67, 2.67, 2.93, 3.20, 21.33, 26.66, 31.99, 37.32, 42.66, 52.79, 58.65, 70.38, 76.78]},
            {dimension: '4 x 10', prices: [3.33, 4.33, 4.67, 5.00, 34.66, 43.33, 51.99, 60.66, 69.33, 83.99, 93.32, 109.99, 119.99]},
            {dimension: '4 x 12', prices: [4.00, 5.20, 5.60, 6.00, 41.60, 52.00, 62.40, 72.80, 83.20, 100.80, 112.00, 132.00, 144.00]},
            {dimension: '5 x 5', prices: [2.08, 2.08, 2.29, 2.50, 16.64, 20.80, 24.96, 29.12, 33.28, 41.18, 45.76, 54.91, 59.90]},
            {dimension: '5 x 7', prices: [2.91, 2.91, 3.20, 3.49, 23.28, 29.10, 34.92, 40.74, 46.56, 57.62, 64.02, 76.82, 83.81]},
            {dimension: '5 x 9', prices: [3.75, 4.50, 4.88, 5.25, 36.00, 45.00, 54.00, 63.00, 72.00, 87.75, 97.50, 115.50, 126.00]},
            {dimension: '5 x 12', prices: [5.00, 6.50, 7.00, 7.50, 52.00, 65.00, 78.00, 91.00, 104.00, 126.00, 140.00, 165.00, 180.00]},
            {dimension: '6 x 6', prices: [3.00, 3.00, 3.30, 3.60, 24.00, 30.00, 36.00, 42.00, 48.00, 59.40, 66.00, 79.20, 86.40]},
            {dimension: '6 x 8', prices: [4.00, 4.80, 5.20, 5.60, 38.40, 48.00, 57.60, 67.20, 76.80, 93.60, 104.00, 123.20, 134.40]},
            {dimension: '6 x 10', prices: [5.00, 6.50, 7.00, 7.50, 52.00, 65.00, 78.00, 91.00, 104.00, 126.00, 140.00, 165.00, 180.00]},
            {dimension: '6 x 12', prices: [6.00, 7.80, 8.40, 9.00, 62.40, 78.00, 93.60, 109.20, 124.80, 151.20, 168.00, 198.00, 216.00]},
            {dimension: '8 x 8', prices: [5.33, 6.40, 6.93, 7.47, 51.20, 64.00, 76.80, 89.59, 102.39, 124.79, 138.66, 164.26, 179.19]},
            {dimension: '8 x 10', prices: [6.67, 9.33, 10.00, 10.67, 74.66, 93.32, 111.99, 130.65, 149.32, 179.98, 199.98, 234.64, 255.97]},
            {dimension: '8 x 12', prices: [8.00, 11.20, 12.00, 12.80, 89.60, 112.00, 134.40, 156.80, 179.20, 216.00, 240.00, 281.60, 307.20]},
            {dimension: '9 x 9', prices: [6.75, 8.10, 8.78, 9.45, 64.80, 81.00, 97.20, 113.40, 129.60, 157.95, 162.00, 178.20, 194.40, ]},
            {dimension: '9 x 12', prices: [9.00, 12.60, 13.50, 14.40, 100.80, 126.00, 151.20, 176.40, 201.60, 243.00, 252.00, 277.20, 302.40, ]},

          ],
          additionalNote: ''
        },
        {
          title: 'Board & Batten Siding',
          species: [
            {species: '', dimension: -1, length: -1, quantity: 0, price: 0},
            {species: '', dimension: -1, length: -1, quantity: 0, price: 0},
            {species: '', dimension: -1, length: -1, quantity: 0, price: 0},
            {species: '', dimension: -1, length: -1, quantity: 0, price: 0},
          ],
          constSpecies: ['Spruce'],
          dimensions: [
            {species: "Spruce",  prices: [1.40, 1.40, 1.40, 1.40, 1.40, 1.50, 1.50, 1.60, 1.60]},
            {species: "Hemlock",  prices: [1.60, 1.60, 1.60, 1.60, 1.60, 1.70, 1.70, 1.80, 1.80]},
            {species: "Cottonwood",  prices: [1.50, 1.50, 1.50, 1.50, 1.50, 1.60, 1.60, 1.70, 1.70]},
          ],
          additionalNote: ''
        },
        {
          title: 'Birch Boards',
          species: [
            {species: '', dimension: -1, length: -1, quantity: 0, price: 0},
            {species: '', dimension: -1, length: -1, quantity: 0, price: 0},
            {species: '', dimension: -1, length: -1, quantity: 0, price: 0},
            {species: '', dimension: -1, length: -1, quantity: 0, price: 0},
            {species: '', dimension: -1, length: -1, quantity: 0, price: 0},
            {species: '', dimension: -1, length: -1, quantity: 0, price: 0},
          ],
          constSpecies: ['Spruce'],
          dimensions: [
            {dimension: '3 x 5', prices: [1.25, 1.25, 1.38, 1.50, 10.00, 12.50, 15.00, 17.50, 20.00, 24.75, 27.50, 33.00, 36.00]},
            {dimension: '3 x 7', prices: [1.91, 1.91, 2.10, 2.29, 15.28, 19.10, 22.92, 26.74, 30.56, 37.82, 42.02, 50.42, 55.01]},
            {dimension: '3 x 10', prices: [2.50, 2.75, 3.00, 3.25, 22.00, 27.50, 33.00, 38.50, 44.00, 54.00, 60.00, 71.50, 78.00]},
            {dimension: '3 x 12', prices: [3.00, 3.30, 3.60, 3.90, 26.40, 33.00, 39.60, 46.20, 52.80, 64.80, 72.00, 85.80, 93.60]},
            {dimension: '2 x 4', prices: [0.67, 0.67, 0.73, 0.80, 5.33, 6.66, 7.99, 9.32, 10.66, 13.19, 14.65, 17.58, 19.18]},
            {dimension: '2 x 6', prices: [1.00, 1.00, 1.10, 1.20, 8.00, 10.00, 12.00, 14.00, 16.00, 19.80, 22.00, 26.40, 28.80]},
            {dimension: '2 x 8', prices: [1.33, 1.33, 1.47, 1.60, 10.66, 13.33, 16.00, 18.66, 21.33, 26.39, 29.33, 35.19, 38.39]},
            {dimension: '2 x 10', prices: [1.67, 1.83, 2.00, 2.17, 14.66, 18.33, 21.99, 25.66, 29.32, 35.99, 39.98, 47.65, 51.98]},
            {dimension: '2 x 12', prices: [2.00, 2.20, 2.40, 2.60, 17.60, 22.00, 26.40, 30.80, 35.20, 43.20, 48.00, 57.20, 62.40]},
            {dimension: '4 x 4', prices: [1.33, 1.33, 1.47, 1.60, 10.66, 13.33, 16.00, 18.66, 21.33, 26.39, 29.33, 35.19, 38.39]},
            {dimension: '4 x 6', prices: [2.00, 2.00, 2.20, 2.40, 16.00, 20.00, 24.00, 28.00, 32.00, 39.60, 44.00, 52.80, 57.60]},
            {dimension: '4 x 8', prices: [2.67, 2.67, 2.93, 3.20, 21.33, 26.66, 31.99, 37.32, 42.66, 52.79, 58.65, 70.38, 76.78]},
            {dimension: '4 x 10', prices: [3.33, 4.33, 4.67, 5.00, 34.66, 43.33, 51.99, 60.66, 69.33, 83.99, 93.32, 109.99, 119.99]},
            {dimension: '4 x 12', prices: [4.00, 5.20, 5.60, 6.00, 41.60, 52.00, 62.40, 72.80, 83.20, 100.80, 112.00, 132.00, 144.00]},
            {dimension: '5 x 5', prices: [2.08, 2.08, 2.29, 2.50, 16.64, 20.80, 24.96, 29.12, 33.28, 41.18, 45.76, 54.91, 59.90]},
            {dimension: '5 x 7', prices: [2.91, 2.91, 3.20, 3.49, 23.28, 29.10, 34.92, 40.74, 46.56, 57.62, 64.02, 76.82, 83.81]},
            {dimension: '5 x 9', prices: [3.75, 4.50, 4.88, 5.25, 36.00, 45.00, 54.00, 63.00, 72.00, 87.75, 97.50, 115.50, 126.00]},
            {dimension: '5 x 12', prices: [5.00, 6.50, 7.00, 7.50, 52.00, 65.00, 78.00, 91.00, 104.00, 126.00, 140.00, 165.00, 180.00]},
            {dimension: '6 x 6', prices: [3.00, 3.00, 3.30, 3.60, 24.00, 30.00, 36.00, 42.00, 48.00, 59.40, 66.00, 79.20, 86.40]},
            {dimension: '6 x 8', prices: [4.00, 4.80, 5.20, 5.60, 38.40, 48.00, 57.60, 67.20, 76.80, 93.60, 104.00, 123.20, 134.40]},
            {dimension: '6 x 10', prices: [5.00, 6.50, 7.00, 7.50, 52.00, 65.00, 78.00, 91.00, 104.00, 126.00, 140.00, 165.00, 180.00]},
            {dimension: '6 x 12', prices: [6.00, 7.80, 8.40, 9.00, 62.40, 78.00, 93.60, 109.20, 124.80, 151.20, 168.00, 198.00, 216.00]},
            {dimension: '8 x 8', prices: [5.33, 6.40, 6.93, 7.47, 51.20, 64.00, 76.80, 89.59, 102.39, 124.79, 138.66, 164.26, 179.19]},
            {dimension: '8 x 10', prices: [6.67, 9.33, 10.00, 10.67, 74.66, 93.32, 111.99, 130.65, 149.32, 179.98, 199.98, 234.64, 255.97]},
            {dimension: '8 x 12', prices: [8.00, 11.20, 12.00, 12.80, 89.60, 112.00, 134.40, 156.80, 179.20, 216.00, 240.00, 281.60, 307.20]},
            {dimension: '9 x 9', prices: [6.75, 8.10, 8.78, 9.45, 64.80, 81.00, 97.20, 113.40, 129.60, 157.95, 162.00, 178.20, 194.40, ]},
            {dimension: '9 x 12', prices: [9.00, 12.60, 13.50, 14.40, 100.80, 126.00, 151.20, 176.40, 201.60, 243.00, 252.00, 277.20, 302.40, ]},
          ],
          additionalNote: ''
        },
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
    getSubTotal(specs, dimensions) {
      let val = 0;
      specs.forEach(item => {
        if(item.dimension>=0 && item.length>=0) {
          val += dimensions[item.dimension].prices[item.length]*item.quantity
        }
      });
      return Math.round(val*100)/100;
    },
    changeQuantity(item) {
      if(item.dimension !== -1 && item.length !==-1) {
        item.quantity = 1;
      } else {
        item.quantity = 0;
      }

    },
    downloadPdf() {
      this.$axios.$post('api/download-pdf',
        {bodyData: this.collapses, user: this.form},
        {
          responseType: 'arraybuffer',
          headers: {
            'Accept': 'application/pdf'
          }
      })
      .then((res)=> {
        const blob = new Blob([res], {type: 'application/pdf'})
        const link = document.createElement('a')
        const url = window.URL.createObjectURL(blob)
        link.href = url;
        link.download = `cut-list.pdf`
        document.body.appendChild(link);
        link.click();
        link.remove();
        window.open(url)
      })
    },
    async submitCutList() {
      console.log('click submit');
      this.errorMsg="";
      try {
        const token = await this.$recaptcha.getResponse()
        await this.$recaptcha.reset()
      } catch (error) {
        this.errorMsg = "Please verify you are not a robot.";
        console.log('Login error:', error)
      }
    },
    onError (error) {
      console.log('Error happened:', error)
    },
    onSuccess (token) {
      console.log('start send message');
      this.submitting = true;
      this.errorMsg="";

      this.$axios.$post('api/mail', {bodyData: this.collapses, user: this.form})
        .then((res)=> {
          console.log(res);
          this.submitting = false;
        }).catch(err => {
          console.log(err)
          this.submitting = false;
          this.errorMsg = "Submitting failed.";
        })

    },
    onExpired () {
      console.log('Expired')
    }
  }
}
</script>
