<template>
  <div class="single-product">
    <section class="hero is-fullheight" :class="product.hero">
      <div class="hero-body">
        <div class="container">
          <div class="hero-content has-text-white has-text-centered">
            <h2 class="is-size-6">{{product.subheader}}</h2>
            <h1>{{product.header}}</h1>
          </div>
        </div>
      </div>
    </section>
    <section class="single-product--content section">
      <div class="container">
        <div class="columns is-multiline">
          <div class="column is-12">
            <h3 class="is-size-4">{{product.header}}</h3>
          </div>
          <div class="column is-12-tablet is-6-desktop single-product--content__leftside">
            <img :src="product.mainimg" alt="">
            <div class="columns is-mobile">
              <div class="column is-3">
                <img :src="product.lowerimgOne" alt="">
              </div>
              <div class="column is-3">
                <img :src="product.lowerimgTwo" alt="">
              </div>
            </div>
          </div>
          <div class="column is-12-tablet is-6-desktop single-product--content__rightside">
            <p>{{product.productDescriptionOne}}</p>
            <p>{{product.productDescritionTwo}}</p>
            <p>{{product.productDescritionThree}}</p>
            <p>{{product.tip}}</p>
            <p>Browse Our Product Variations Below</p>
            <p>Contact Mud Bay Lumber Co. for Availability</p>
            <h5>Rough Cut Full Dimensions</h5>
            <h6>Species: <span>{{product.species}}</span></h6>
            <h6>Dimension: <span>(Will List Data Here from Spreadsheet)</span></h6>
            <h6>Length: <span>(Will List Standard Lengths) <br>Contact us for Custom Cuts</span></h6>


            <h5>Rough Cut Yard Dimensions</h5>
            <h6>Species: <span>{{product.species}}</span></h6>
            <h6>Dimension: <span>(Will List Data Here from Spreadsheet)</span></h6>
            <h6>Length: <span>(Will List Standard Lengths) <br>Contact us for Custom Cuts</span></h6>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<script>
export default {
  data() {
    return {
      id: this.$route.params.id,
    }
  },
  computed: {
    product() {
      return this.$store.state.products.product.find(
        products => products.id === this.id
      );
    }
  }
}
</script>
