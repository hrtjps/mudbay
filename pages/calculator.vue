<template>
  <div class="calculator">
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
    <section class="calculator--board-calculator">
      <div class="container">
        <div class="columns is-multiline">
          <div class="column is-12">
            <h3 class="is-size-4">BOARD FOOT CALCULATOR</h3>
            <p>
             Most of our lumber is sold based on the board foot, which is a measure of volume (a board foot is one square foot, one inch thick).
            </p>
            <p>
              To calculate board footage we use the following formula:
            </p>
          </div>
          <div class="column is-8 calculator--board-calulator__container">
            <div class="columns is-multiline">
              <div class="column is-12">
                <div class="columns">
                  <div class="column is-3">
                    <h6>Thickness of Wood:</h6>
                  </div>
                  <div class="column is-8">
                    <select>
                        <option value="flint" selected>Flint</option>
                        <option value="silver">Silver</option>
                    </select>
                  </div>
                </div>
              </div>
              <div class="column is-4">
                  <div class="columns">
                    <div class="column is-3">
                      <h6>Width:</h6>
                    </div>
                    <div class="column is-8">
                        <input>
                    </div>
                  </div>
              </div>
              <div class="column is-4">
                <div class="columns">
                  <div class="column is-3">
                    <h6>Length:</h6>
                  </div>
                  <div class="column is-8">
                    <input>
                  </div>
                </div>
              </div>
              <div class="column is-4">
                <div class="columns">
                  <div class="column is-3">
                    <h6>Length:</h6>
                  </div>
                  <div class="column is-8">
                    <input>
                  </div>
                </div>
              </div>
              <div class="column is-12">
                <h6>Total:</h6>
              </div>
              <div class="column is-4">
                <button class="btn calculate-btn">CALCULATE</button>
              </div>
              <div class="column is-4">
                <button class="btn clear-btn">CLEAR</button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
    <section class="calculator--handwritten">
      <div class="container">
        <div class="columns is-multiline">
          <div class="column is-12">
            <p>The handwritten form is:</p>
          </div>
          <div class="column is-2 board__footage">
            <h3 class="size-is-4">BOARD FOOTAGE = </h3>
          </div>
          <div class="column is-5">
            <div class="columns is-multiline">
              <div class="column is-12">
                <p>Width in inches x length in feet x thickness in inches</p>
              </div>
              <div class="column is-12">
                <p>Divided by 12</p>
              </div>
              <div class="column is-12">
                <h6>OR</h6>
              </div>
              <div class="column is-12">
                <p>Width in inches x length in inches x thickness in inches</p>
              </div>
              <div class="column is-12">
                <p>Divided by 144</p>
              </div>
            </div>
          </div>
        </div>
        <div class="columns is-multiline calculator_option_2">
          <div class="column is-12">
            <p>Example: A 2” thick board is 7” inches wide and 10 feet long, is 11.67 bd.ft.</p>
          </div>
          <div class="column is-2">
            <div class="columns is-multiline">
              <div class="column is-12">
                <h5>7” x 10” x 2”</h5>
              </div>
              <div class="column is-12">
                <h5>Divided by 12</h5>
              </div>
            </div>
          </div>
          <div class="column is-2 board_answer">
            <h5>= 11.67 bd.ft</h5>
          </div>
          <div class="column is-1">
            <h5>OR</h5>
          </div>
          <div class="column is-2">
            <div class="columns is-multiline">
              <div class="column is-12">
                <h5>7” x 120” x 2”</h5>
              </div>
              <div class="column is-12">
                <h5>Divided by 144</h5>
              </div>
            </div>
          </div>
          <div class="column is-2 board_answer">
            <h5>= 11.67 bd.ft</h5>
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
    return context.app.$storyapi.get(`cdn/stories/calculator`, {
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
