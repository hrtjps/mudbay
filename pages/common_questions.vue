<template>
  <div class="questions">
    <section class="hero is-fullheight questions-hero">
      <div class="hero-body">
        <div class="container">
          <div class="hero-content has-text-white has-text-centered">
            <h2 class="is-size-6">WHAT WOOD YOU WANT TO KNOW?</h2>
            <h1>COMMON CONVERSATIONS</h1>
          </div>
        </div>
      </div>
    </section>
    <section class="questions--dropdowns">
      <div class="container">
        <div class="columns is-multiline">
          <div class="column is-12">
            <h3 class="is-size-4">COMMON CONVERSATIONS</h3>
          </div>
          <div class="column is-12">
            <b-collapse
              class="card questions--dropdowns__card"
              v-for="(collapse, index) of collapses"
              :key="index"
              :open="isOpen == index"
              @open="isOpen = index">
              <div
                  slot="trigger"
                  slot-scope="props"
                  class="card-header"
                  role="button">
                  <p class="card-header-title">
                      {{ collapse.title }}
                  </p>
                  <a class="card-header-icon">
                      <b-icon
                          :icon="props.open ? 'menu-up' : 'menu-down'">
                      </b-icon>
                  </a>
              </div>
              <div class="card-content">
                  <div class="content">
                      <p>{{ collapse.textOne }}</p>
                      <p>{{ collapse.textTwo}}</p>
                      <p>{{ collapse.textThree}}</p>
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
export default {
  data() {
            return {
                isOpen: 0,
                collapses: [
                {
                    title: 'What are the minimum and maximum lengths and dimensions?',
                    textOne: 'We mill 8’-24’ lengths, 2” – 12” wide. The largest dimension we can easily produce is a 9x12.'
                },
                {
                    title: 'What is your lead time? How long in advance do I need to place an order?',
                    textOne: 'Lead time varies depending on where we are in our logging cycle and how many people have placed orders. Generally, we can complete small orders within a few hours to a few days, and large orders within one to three weeks. '
                },
                {
                    title: 'Will my boards shrink lengthwise or only widthwise?',
                    textOne: 'Lengthwise, shrinkage is negligible. Widthwise, you can expect shrinkage up to ¼”. Shrinkage will be larger for wider boards.',
                    textTwo: '“The spruce shrinks fairly uniformly. For every ten boards on would shrink 3/16” – ¼”, where as the rest stayed at a steady 1/8” (width and thickness).” – Jeremy Reed'
                },
                {
                    title: 'When can I use boards green and when do I need to use cured boards?',
                    textOne: 'In general, you can use boards green if they can get airflow. If boards are to be sandwiched between foam or in another area where water will not be able to escape, you will need to use cured boards. We recommend using cured boards when installing windows or doors.',
                    textTwo: 'There is no need to use cured boards for woodsheds or other outside applications.',
                    textThree: '“I was concerned about inconsistent shrinkage, so I let it dry for about two months before I pulled out the first stick. I highly recommend doing this if you’re building a stick frame… I used a lot of the fresh sawn material for my upstairs stud walls and haven’t noticed any problems. The boards did shrink but they did it uniformly and my walls look great.” – Jeremy Reed'
                },
                {
                    title: 'How long does it take for a board to dry?',
                    textOne: 'It takes approximately a year per inch of thickness for hemlock and birch, and slightly faster for spruce. Different applications require different drying times.'
                },
                {
                    title: 'Why go local instead of import?',
                    text: 'As of our last price check on imported lumber, we are cheaper. Check out our Quote Calculator to do your own cost comparison.',
                    textTwo: 'Superior quality! '
                }
                ]
            }
        }
}
</script>
