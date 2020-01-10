<template>
  <div class="index">
    <section style="margin-top: -179px;" class="index-hero-section">
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
            :interval="interval">
            <b-carousel-item v-for="(carousel, i) in carousels" :key="i">
                <section :class="`hero index-hero is-fullheight ${carousel.class}`">
                  <div class="hero-body">
                    <div class="container">
                      <div class="hero-content has-text-white">
                        <h2 class="is-size-6"> {{carousel.subtitle}} </h2>
                        <h1>{{carousel.title}}</h1>
                        <h5 class="is-size-5-tablet is-size-6-mobile">{{carousel.description}}</h5>
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
            <h3 class="is-size-4">OUR FEATURED PRODUCTS > <span class="is-class-6">SEE ALL</span></h3>
          </div>
          <div class="column is-6-tablet is-3-fullhd" v-for="(product, key) in products" :key="key">
            <div class="card" :id="product.id">
              <div class="card-content">
                <a href="#">LEARN MORE ></a>
                <h1 class="is-size-4-tablet is-size-3-desktop">{{product.title}}</h1>
                <p class="is-size-6">{{product.content}}</p>
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
            <p class="is-size-5-tablet is-size-6-mobile">Our mission is to keep Chilkat Valley Trees accessible and affordable through QUALITY timber products.</p>
            <p class="is-size-5-tablet is-size-6-mobile">We bring our core values of Integrity, Community, and Hard Work to every aspect of Mud Bay Lumber Company including customer interactions, harvest techniques, and manufacturing process.</p>
            <p class="is-size-5-tablet is-size-6-mobile">The result? QUALITY process, QUALITY customer relationships, and QUALITY products.</p>
          </div>
        </div>
      </div>
    </section>
    <!-- END MISSION SECTION -->
    <!-- ABOUT SECTION -->
    <section class="index--about">
      <div class="container is-fluid has-background-success">
        <div class="columns is-multiline">
          <div class="column is-7">
            <h1>ABOUT THE PEOPLE</h1>
            <p class="is-size-5-tablet is-size-6-mobile">Chad Bieberich and Sylvia Heinz Bieberich <br>fell in love over firewood and the rest is history.</p>
            <p class="is-size-5-tablet is-size-6-mobile">Lorum ipsom placeholder text for just a little bit more text that can go right here. Family, life in Alaska, and lorum ipsom lorum ipsom.</p>
            <a href="#" class="is-size-4">READ OUR FULL STORY ></a>
          </div>
          <div class="column is-5">
            <img src="~/assets/img/about_hero.png" alt="">
          </div>
        </div>
      </div>
    </section>
    <div class="container is-fluid index-calculator">
      <div class="columns">
        <div class="column is-12 has-text-centered">
          <h1><a href="#">TRY OUR ONLINE CALCULATOR ></a></h1>
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
export default {
  data: () => ({
    carousel: 0,
    animated: 'fade',
    arrow: false,
    arrowBoth: false,
    arrowHover: false,
    autoPlay: true,
    pauseHover: false,
    pauseInfo: false,
    indicator: false,
    interval: 3000,
    carousels: [
        {
          subtitle: 'CHILKAT VALLEY TREES IN HAINES, ALASKA',
          title: 'QUALITY TIMBER PRODUCTS',
          description: 'Mud Bay Lumber Co is leading the industry in Southeast Alaska with high-quality and affordable timber products.',
          class: 'index-hero-one'
        },
        {
          subtitle: 'ALL FRAMED UP',
          title: 'BUILDING MATERIALS TO BUILD DREAMS',
          description: 'Because Alaskan’s are the biggest dreamers of them all, and we’ll help make it a reality.',
          class: 'index-hero-two'
        },
        {
          subtitle: 'FIND NO SHORTAGE OF SAWDUST',
          title: 'NOTHING GOES TO WASTE.',
          description: 'Mud Bay Lumber Co brave frigid temperatures, add economic value to the community and stay vigilant to protect wildlife and salmon habitats— all while ensuring that nothing goes to waste.',
          class: 'index-hero-three' }
    ],
      products: [
        {
          id: 'rough-timber',
          title: 'Rough Cut Lumber',
          content: 'Find in full-dimension or lumber yard dimensions, spruce or hemlock.'
        },
        {
          id: 'board-siding',
          title: 'Board & Batten Siding',
          content: 'Traditional and time-tested vertical siding in Spruce or Hemlock.'
        },
        {
          id: 'timber-frames',
          title: 'Timber-Frame Timbers',
          content: 'Sawn from our best trees for stability and aesthetic beauty.'
        },
        {
          id: 'firewood',
          title: 'Mill-Run Firewood',
          content: 'Split and delivered.'
        }
      ],
  })
}
</script>
